FROM arm32v6/python:3.9-alpine
WORKDIR /app

RUN apk update && \
    apk add --virtual .build-deps gcc musl-dev linux-headers && \
    apk add jpeg-dev zlib-dev libjpeg

COPY Pipfile .
COPY Pipfile.lock .
RUN pip install pipenv
RUN pipenv install --system

RUN apk del .build-deps

COPY . .

CMD ["gunicorn", "-c", "./gunicorn.py", "server:app"]
