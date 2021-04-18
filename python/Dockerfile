FROM --platform=linux/arm/v6 python:3.9
WORKDIR /app
COPY Pipfile .
COPY Pipfile.lock .
RUN pip install pipenv
RUN pipenv install --system
COPY . .

CMD ["gunicorn", "-c", "./gunicorn.py", "server:app"]
