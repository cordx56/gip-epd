FROM python:3.9
WORKDIR /app
COPY Pipfile .
COPY Pipfile.lock .
RUN pip install pipenv
RUN pipenv install --system
RUN pip install RPi.GPIO
COPY . .

CMD ["gunicorn", "-c", "./gunicorn.py", "server:app"]
