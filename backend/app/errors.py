"""Human-readable formatting of FastAPI validation errors."""

from __future__ import annotations

from typing import Any

from fastapi import Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

# Friendly labels for known fields.
_FIELD_LABELS: dict[str, str] = {
    "destination": "destination",
    "start_date": "start date",
    "end_date": "end date",
    "budget": "budget",
    "interests": "interests",
    "stop_id": "stop",
    "day": "day",
    "preferences": "preferences",
}

# Per-field overrides keyed by (field, error_type).
_FIELD_TYPE_MESSAGES: dict[tuple[str, str], str] = {
    ("destination", "missing"): "Please enter a destination",
    ("destination", "string_too_short"): "Destination must be at least 2 characters",
    ("start_date", "missing"): "Please enter a start date",
    ("start_date", "date_parsing"): "Start date is invalid",
    ("start_date", "date_from_datetime_parsing"): "Start date is invalid",
    ("end_date", "missing"): "Please enter an end date",
    ("end_date", "date_parsing"): "End date is invalid",
    ("end_date", "date_from_datetime_parsing"): "End date is invalid",
    ("budget", "missing"): "Please enter a budget",
    ("budget", "greater_than_equal"): "Minimum budget is $50",
    ("budget", "less_than_equal"): "Maximum budget is $50,000",
    ("budget", "float_parsing"): "Budget must be a number",
    ("interests", "missing"): "Please select at least one interest",
    ("interests", "too_short"): "Please select at least one interest",
}


def _humanize_field(field: str) -> str:
    return _FIELD_LABELS.get(field, field.replace("_", " "))


def _format_error(err: dict[str, Any]) -> str:
    loc = [str(p) for p in err.get("loc", []) if p != "body"]
    field = loc[-1] if loc else ""
    err_type = err.get("type", "")
    raw_msg = err.get("msg", "Invalid value")

    # 1) Most specific: (field, error_type) override.
    if (field, err_type) in _FIELD_TYPE_MESSAGES:
        return _FIELD_TYPE_MESSAGES[(field, err_type)]

    # 2) Messages raised from our own validators come through as
    #    `value_error, Value error, <msg>` — strip the prefix and use as-is.
    if err_type.startswith("value_error"):
        cleaned = raw_msg
        for prefix in ("Value error, ", "Assertion failed, "):
            if cleaned.startswith(prefix):
                cleaned = cleaned[len(prefix):]
                break
        return cleaned

    # 3) Generic fallback: "<Field>: <msg>".
    label = _humanize_field(field) if field else "Request"
    return f"{label.capitalize()}: {raw_msg}"


async def validation_exception_handler(
    _request: Request, exc: RequestValidationError
) -> JSONResponse:
    details = [_format_error(err) for err in exc.errors()]
    # De-duplicate while preserving order.
    seen: set[str] = set()
    unique_details: list[str] = []
    for msg in details:
        if msg not in seen:
            seen.add(msg)
            unique_details.append(msg)
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"error": "Invalid request", "details": unique_details},
    )
