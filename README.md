## Тестування.

### 1. Локально.

Мають бути встановлені локально:
 - `mongodb v3.2+`
 - `node v.10+`
 - `npm v.6+`

```shell
npm install
npm test
```

### 2. В `Docker`-контейнері

```shell
env COMPOSE_FILE=./test/docker-compose.yml \
docker-compose up --build --abort-on-container-exit --exit-code-from=integration-test
```

**Please consider**: `npm install` inside of Docker-container proceeds absolutely silently.


