# SpaceCom Service

Service of Rebel Alliance Command center.

## Contents:
 - [Contents](#contents)

 - [1. Dockerized Deployment and Testing](#1-dockerized-deployment-and-testing)
   - [1.1. Deployment](#11-deployment)
     - [Resolving `port is already in use` issue](#resolving-port-is-already-in-use-issue)
     - [Cleaning out after deployment](#cleaning-out-after-deployment)
   - [1.2. Testing](#12-testing)
     - [Cleaning out after tests](#cleaning-out-after-tests)

 - [2. API Specification](#2-api-specification)
   - [2.1. Get Routes for Vessel (starship) to Target sector](#21-get-routes-for-vessel-starship-to-target-sector)
   - [2.2. Get Vessels Requested for Routes](#22-get-vessels-requested-for-routes)
   - [2.3. Get Vessels Requested for Routes in `csv`-format](#23-get-vessels-requested-for-routes-in-csv-format)
   - [2.4. Save Vessels Requested for Routes in `csv`-format as file](#24-save-vessels-requested-for-routes-in-csv-format-as-file)
   - [2.5. Get Vessel's Requests for Routes](#25-get-vessels-requests-for-routes)
   - [2.6. Get Vessel's Requests for Routes in `csv`-format](#26-get-vessels-requests-for-routes-in-csv-format)
   - [2.7. Save Vessel's Requests for Routes in `csv`-format as file](#27-save-vessels-requests-for-routes-in-csv-format-as-file)

 - [3. Notes](#3-notes)
   - [3.1. Task Description](#31-task-description)
   - [3.2. CSV-Format for Route Requests](#32-csv-format-for-route-requests)
  - [4. Local deployment and testing (optional)](#4-Local-deployment-and-testing-optional)
    - [4.1. Requirements for local deployment](#41-requirements-for-local-deployment)
    - [4.2. Deployment](#42-deployment)
    - [4.3. Testing](#43-testing)


## 1. Dockerized Deployment and Testing

All commands SHOULD be executed from the project root.

According to your system settings `docker` and `docker-compose` commands COULD require
a `sudo` mode.

**Please consider**: `npm install` inside of Docker-container proceeds absolutely silently and can take a few minutes (est. less then 20 seconds, but actual time depends on host and network performance).


### 1.1. Deployment:

```shell
docker-compose up --build
```

Console output on successfull start:

```shell
spacecom-api_1  |
spacecom-api_1  | > nodejs@1.0.0 start /usr/src/app
spacecom-api_1  | > node lib/server.js
spacecom-api_1  |
spacecom-api_1  | May the Force be with you on port: 3000
```


#### Resolving `port is already in use` issue:

You can specify any other port to be used for SpaceCom API by assigning the `API_PORT` environment variable:

```shell
env API_PORT=8080 docker-compose up --build
```

#### Cleaning out after deployment:

```shell
docker-compose down --volumes
```

### 1.2. Testing:

To run unit and integration tests execute the following command:

```shell
docker-compose -f ./docker-compose.test.yml up --build \
  --abort-on-container-exit \
  --exit-code-from=integration-test
```

Console output:

```shell
integration-test_1  | 
integration-test_1  | > nodejs@1.0.0 test /usr/src/app
integration-test_1  | > jest --coverage
integration-test_1  | 
integration-test_1  | PASS lib/utils/__test__/parsers.test.js
integration-test_1  | PASS lib/utils/__test__/async-fn.test.js
integration-test_1  | PASS lib/routes-core/__test__/find-summ.sw.test.js
integration-test_1  | PASS lib/utils/__test__/express.test.js
integration-test_1  | PASS lib/vessels-service/__test__/middleware.test.js
integration-test_1  | PASS lib/vessels-service/__test__/controllers.test.js
integration-test_1  | PASS lib/utils/__test__/promisify.test.js
integration-test_1  | PASS lib/utils/__test__/transduce.test.js
integration-test_1  | PASS lib/utils/__test__/fn.test.js
integration-test_1  | PASS lib/vessels-service/__test__/mappers.test.js
integration-test_1  | PASS lib/models/__test__/index.test.js
integration-test_1  | PASS lib/routes-core/__test__/find-path.test.js
integration-test_1  | PASS lib/routes-service/__test__/controllers.test.js
integration-test_1  | PASS lib/utils/__test__/csv.test.js
integration-test_1  | PASS lib/routes-core/__test__/index.test.js
integration-test_1  | PASS lib/routes-service/__test__/index.test.js
integration-test_1  | PASS lib/routes-core/__test__/parser.test.js
integration-test_1  | PASS lib/vessels-service/__test__/format.test.js
integration-test_1  | PASS lib/routes-service/__test__/init.test.js
integration-test_1  | PASS lib/vessels-service/__test__/index.test.js
integration-test_1  | PASS test/server.test.js
integration-test_1  | PASS lib/redis-cache/__test__/index.test.js
integration-test_1  | --------------------------|----------|----------|----------|----------|-------------------|
integration-test_1  | File                      |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
integration-test_1  | --------------------------|----------|----------|----------|----------|-------------------|
integration-test_1  | All files                 |    96.81 |    95.12 |     95.5 |    97.08 |                   |
integration-test_1  |  lib                      |    79.17 |    83.33 |        0 |    82.61 |                   |
integration-test_1  |   config.js               |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   server.js               |    77.27 |       50 |        0 |    80.95 |       39,40,44,52 |
integration-test_1  |  lib/models               |    96.15 |      100 |    83.33 |      100 |                   |
integration-test_1  |   index.js                |       90 |      100 |    66.67 |      100 |                   |
integration-test_1  |   mongoose.js             |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   route-request-record.js |      100 |      100 |      100 |      100 |                   |
integration-test_1  |  lib/redis-cache          |    86.11 |       50 |    92.86 |    84.62 |                   |
integration-test_1  |   index.js                |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   redis.js                |    68.75 |       25 |       50 |    73.33 |       17,18,19,20 |
integration-test_1  |  lib/routes-core          |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   find-route.js           |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   find-summ.sw.js         |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   index.js                |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   parser.js               |      100 |      100 |      100 |      100 |                   |
integration-test_1  |  lib/routes-service       |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   controllers.js          |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   index.js                |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   init.js                 |      100 |      100 |      100 |      100 |                   |
integration-test_1  |  lib/utils                |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   async-fn.js             |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   csv.js                  |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   express.js              |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   fn.js                   |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   index.js                |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   parsers.js              |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   promisify.js            |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   transduce.js            |      100 |      100 |      100 |      100 |                   |
integration-test_1  |  lib/vessels-service      |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   controllers.js          |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   format.js               |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   index.js                |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   mappers.js              |      100 |      100 |      100 |      100 |                   |
integration-test_1  |   middlewares.js          |      100 |      100 |      100 |      100 |                   |
integration-test_1  | --------------------------|----------|----------|----------|----------|-------------------|
integration-test_1  | 
integration-test_1  | Test Suites: 22 passed, 22 total
integration-test_1  | Tests:       161 passed, 161 total
integration-test_1  | Snapshots:   30 passed, 30 total
integration-test_1  | Time:        4.285s
integration-test_1  | Ran all test suites.
nodejs_integration-test_1 exited with code 0
Aborting on container exit...
Stopping nodejs_mongodb_1 ... done
```


#### Cleaning out after tests

```shell
docker-compose -f ./docker-compose.test.yml down
```

## 2. API Specification

API is described with [bluprint](https://apiblueprint.org/) format and is accessible
locally by link [SpaceCom API Specification](./blueprint.md).

Additionally there are some `curl`-examples:

### 2.1. Get Routes for Vessel (starship) to Target sector

```shell
curl "http://localhost:3000/routes?vessel=5&target=56"
```

Response:

```json
[
  { "securityLevel": 1, "gates": [22, 34] },
  { "securityLevel": 2, "gates": [2, 5, 9, 12, 13, 15] }, 
  { "securityLevel": 3, "gates": [ 16, 19, 21 ] },
  { "securityLevel": 4, "gates": [ 2, 3, 7, 11, 16, 17 ] },
  { "securityLevel": 5, "gates": [ 17, 19, 20 ] }
]
```

### 2.2. Get Vessels Requested for Routes:

```shell
curl "http://localhost:3000/vessels"
```

Response:

```json
[
  { "vessel": 5, "target": 6 },
  { "vessel": 4, "target": 78 }
]
```

### 2.3. Get Vessels Requested for Routes in `csv`-format:

```shell
curl "http://localhost:3000/vessels?format=csv"
```

Response:

```csv
Vessel,Last Target
5,6
4,78
```

### 2.4. Save Vessels Requested for Routes in `csv`-format as file

Open following link in browser: http://localhost:3000/vessels?format=csv


### 2.5. Get Vessel's Requests for Routes:

```shell
curl "http://localhost:3000/vessels/5/route-requests"
```

Response:

```json
[
  {
    "_id":"5c991b2547e773001173735f",
    "vessel": 5,
    "target": 56,
    "result": [
      { "securityLevel": 1, "gates": [22, 34] },
      { "securityLevel": 2, "gates": [2, 5, 9, 12, 13, 15] }, 
      { "securityLevel": 3, "gates": [ 16, 19, 21 ] },
      { "securityLevel": 4, "gates": [ 2, 3, 7, 11, 16, 17 ] },
      { "securityLevel": 5, "gates": [ 17, 19, 20 ] }
    ]
  },
  {
    "_id": "5c991ca147e7730011737365",
    "vessel": 5,
    "target": 6,
    "result": [],
    "requestDate": "2019-03-25T18:23:29.428Z"
  }
]
```

### 2.6. Get Vessel's Requests for Routes in `csv`-format:

```shell
curl "http://localhost:3000/vessels/5/route-requests?format=csv"
```

<pre style="word-wrap:nowrap">
Request Id,Vessel,Target,Request Date,Security Level,Gate #1,Gate #2,Gate #3,Gate #4,Gate #5,Gate #6,Gate #7,Gate #8,Gate #9,Gate #10,Gate #11,Gate #12,Gate #13,Gate #14,Gate #15,Gate #16,Gate #17,Gate #18,Gate #19,Gate #20,Gate #21,Gate #22,Gate #23,Gate #24,Gate #25,Gate #26,Gate #27,Gate #28,Gate #29,Gate #30,Gate #31,Gate #32,Gate #33,Gate #34,Gate #35,Gate #36,Gate #37,Gate #38,Gate #39,Gate #40,Gate #41,Gate #42,Gate #43,Gate #44,Gate #45,Gate #46,Gate #47,Gate #48,Gate #49,Gate #50,Gate #51,Gate #52,Gate #53,Gate #54,Gate #55,Gate #56,Gate #57,Gate #58,Gate #59,Gate #60,Gate #61,Gate #62,Gate #63,Gate #64,Gate #65,Gate #66,Gate #67,Gate #68,Gate #69,Gate #70,Gate #71,Gate #72,Gate #73,Gate #74,Gate #75,Gate #76,Gate #77,Gate #78,Gate #79,Gate #80,Gate #81,Gate #82,Gate #83,Gate #84,Gate #85,Gate #86,Gate #87,Gate #88,Gate #89,Gate #90,Gate #91,Gate #92,Gate #93,Gate #94,Gate #95,Gate #96,Gate #97,Gate #98,Gate #99
"5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",1,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",2,,1,,,1,,,,1,,,1,1,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",3,,,,,,,,,,,,,,,,1,,,1,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",4,,1,1,,,,1,,,,1,,,,,1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",5,,,,,,,,,,,,,,,,,1,,1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c991ca147e7730011737365",5,6,"2019-03-25T18:23:29.428Z",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c99241847e773001173736d",5,56,"2019-03-25T18:55:20.766Z",1,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c99241847e773001173736d",5,56,"2019-03-25T18:55:20.766Z",2,,1,,,1,,,,1,,,1,1,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c99241847e773001173736d",5,56,"2019-03-25T18:55:20.766Z",3,,,,,,,,,,,,,,,,1,,,1,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c99241847e773001173736d",5,56,"2019-03-25T18:55:20.766Z",4,,1,1,,,,1,,,,1,,,,,1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"5c99241847e773001173736d",5,56,"2019-03-25T18:55:20.766Z",5,,,,,,,,,,,,,,,,,1,,1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
</pre>

### 2.7. Save Vessel's Requests for Routes in `csv`-format as file:

Open following link in browser:
http://localhost:3000/vessels/5/route-requests?format=csv

## 3. Notes

### 3.1. Task Description

The Task Description points to find the **First** eligible route for each Security Level, however it doesn't specify meaning of the **First**.

After refining example contains routes that have the lowest left indexes.
In case of accept such meaning of **First** route algorithm should ignore fact that incoming array (gates) is sorted or have to do unnecessary work (looking for sub-array to the beggining of the incoming array).

```js
  for (; start >= 0; start--) {
    rest -= items[start];
    if (rest < 0) rest += items[end--];
    if (rest === 0) result = { start, end }; // saving result instead of break the iterations
  }
```

In case of searching from the beggining of array we absolutelly can ignore the ordered state of incoming array:

```js
  for (start = end = 0; end <= n; end++) {
    rest -= items[end];
    while (rest < 0) rest += items[start++];
    if (rest === 0) break;
  }
```

This algorithm works for unsroted arrays too and is also `O(n)`. The worst case is `2 * n` iterations that means `O(n)` too: nested array never runs for the same value of `start`.

### 3.2. CSV-Format for Route Requests

The Task Description doesn't specify structures for `csv`-responses (or any other requirements).

So to format CSV-data the `rfc4180` standard has been choosen.

The structure for Route Requests:


| Request Id | Vessel | Target | Request Date | Security Level | Gate #1 | ... | Gate #99 |
|------------|--------|--------|--------------|----------------|---------|----|-------|
| `object-id` | `num` | `num` | `ISO Date` | `num` or `empty` | `1` or `empty` | ... | `1` or `empty` |

This structure is most suitable for further analysis with such tools as `MS Excel`.


## 4. Local deployment and testing (optional)

### 4.1. Requirements for local deployment

For testing and deployment:
 - `mongodb v3.2+`
 - `node v10+`
 - `npm v6+`

For deployment only:
 - `redis v5+`

### 4.2. Deployment

```shell
npm install
npm start < gates.txt
```

It is also possible to spicify following options with environment variables:

 - **SOURCE_FILE_PATH** - path to the gates.txt file (by default `/dev/stdin`)
 - **CACHE_EXPIRATION_TIME** -- time interval in seconds to expire route calculations (by default `300` seconds /5 minutes)
 - **REDIS_DB_URL** -- URL to connect to the redis.
 - **MONGO_DB_URI** -- URI to connect to mongodb (by default: `mongodb://localhost:27017/SpaceCom`)
 - **API_PORT** -- port to get access to the `SpaceCom` API (`3000` is default).

### 4.3. Testing


```shell
npm install
npm test
```
