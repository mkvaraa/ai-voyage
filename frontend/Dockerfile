FROM node:20-alpine AS build

ARG VITE_API_URL
ARG VITE_USE_MOCK
ARG VITE_MAPBOX_TOKEN
ARG VITE_OPENWEATHER_KEY
ENV VITE_API_URL=$VITE_API_URL \
    VITE_USE_MOCK=$VITE_USE_MOCK \
    VITE_MAPBOX_TOKEN=$VITE_MAPBOX_TOKEN \
    VITE_OPENWEATHER_KEY=$VITE_OPENWEATHER_KEY

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
