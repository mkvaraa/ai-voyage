from datetime import date, datetime

from pydantic import BaseModel, Field, field_validator, model_validator


class TripRequest(BaseModel):
    destination: str = Field(min_length=2)
    start_date: date
    end_date: date
    budget: float = Field(ge=50, le=50000)
    interests: list[str] = Field(min_length=1)

    @field_validator("destination", mode="before")
    @classmethod
    def _destination_present(cls, v):
        if v is None or (isinstance(v, str) and not v.strip()):
            raise ValueError("Please enter a destination")
        return v

    @field_validator("interests", mode="before")
    @classmethod
    def _interests_present(cls, v):
        if v is None or (isinstance(v, list) and len(v) == 0):
            raise ValueError("Please select at least one interest")
        return v

    @model_validator(mode="after")
    def end_after_start(self):
        if self.end_date <= self.start_date:
            raise ValueError("End date must be after start date")
        return self


class Stop(BaseModel):
    id: str
    name: str
    type: str
    lat: float
    lng: float
    duration_minutes: int
    notes: str
    booking_url: str


class Day(BaseModel):
    day: int
    date: date
    stops: list[Stop]


class ReplaceStopRequest(BaseModel):
    stop_id: str = Field(min_length=1)
    day: int = Field(ge=1)
    preferences: str | None = None


class RouteResponse(BaseModel):
    title: str
    days: list[Day]
    total_budget_estimate: float
    currency: str = "USD"
    slug: str | None = None
    created_at: datetime | None = None
