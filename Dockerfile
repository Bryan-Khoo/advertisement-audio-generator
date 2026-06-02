FROM node:22-slim AS ts-builder

WORKDIR /build
COPY frontend/ ./frontend/
RUN npm install -g typescript
RUN tsc --project /build/frontend/typescript/tsconfig.json

FROM python:3.14-slim

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app/backend

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .
COPY frontend/ /app/frontend/
COPY --from=ts-builder /build/frontend/pages/main.js /app/frontend/pages/main.js

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
