FROM python:3.9-slim
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev
WORKDIR /app
COPY . /app/
CMD ["gunicorn", "-b", "0.0.0.0:8081", "main:app"]