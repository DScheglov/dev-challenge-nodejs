## Тестування.

### 1. Локально.

Мають бути встановлені локально:
 - `node v.10+`
 - `npm v.6+`

```shell
npm install
npm test
```

### 2. В `Docker`-контейнері

```shell
 docker run \
    -v $PWD:/app \
    node:10-slim \
    /bin/sh -c \
    "cd /app; npm install && npm test"
```

**Please consider**: `npm install` inside of Docker-container proceeds absolutely silently.


