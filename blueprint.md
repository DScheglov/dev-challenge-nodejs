FORMAT: 1A
HOST: http://localhost:3000

# SpaceCom API

An API of Rebel Alliance Command center.

# Group Routes

## Find route [GET /routes?vessel={vessel}&target={target}]

+ Parameters
    + vessel: 5 (required, number) - the number of starship (vessel) that requires a route. should be greater then 0.
    + target: 56 (required, number) - the number of target sector

+ Response 200 (application/json)
    
        [
            { "securityLevel": 1, "gates": [22, 34] },
            { "securityLevel": 2, "gates": [2, 5, 9, 12, 13, 15] }, 
            { "securityLevel": 3, "gates": [ 16, 19, 21 ] },
            { "securityLevel": 4, "gates": [ 2, 3, 7, 11, 16, 17 ] },
            { "securityLevel": 5, "gates": [ 17, 19, 20 ] }
        ]

+ Response 400 (application/json)

        { "error": "error": "Query parameter \"<parameter>\" is not specified or specified incorrectly: \"<value>\" is not a positive integer." }

# Group Vessels

## All Vessels [GET /vessles?format={format}]

+ Parameters
    + format: csv (optional, enum[string]) - the format of output
        + Default: json
        + Members
            + json
            + csv

+ Response 200 (application/json)

        [
            { "vessel": 5, "target": 6 },
            { "vessel": 4, "target": 78 }
        ]

+ Response 200 (text/csv)

        Vessel,Last Target
        5,6
        4,78

## Vessel's Route Requests [GET /vessles/{vessel}/route-requests?format={format}]

+ Parameters
    + vessel: 5 (required, number) - the number of vessel
    + format: csv (optional, enum[string]) - the format of output
        + Default: json
        + Members
            + json
            + csv

+ Response 200 (application/json)

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

+ Response 200 (text/csv)

        Request Id,Vessel,Target,Request Date,Security Level,Gate #1,Gate #2,Gate #3,Gate #4,Gate #5,Gate #6,Gate #7,Gate #8,Gate #9,Gate #10,Gate #11,Gate #12,Gate #13,Gate #14,Gate #15,Gate #16,Gate #17,Gate #18,Gate #19,Gate #20,Gate #21,Gate #22,Gate #23,Gate #24,Gate #25,Gate #26,Gate #27,Gate #28,Gate #29,Gate #30,Gate #31,Gate #32,Gate #33,Gate #34,Gate #35,Gate #36,Gate #37,Gate #38,Gate #39,Gate #40,Gate #41,Gate #42,Gate #43,Gate #44,Gate #45,Gate #46,Gate #47,Gate #48,Gate #49,Gate #50,Gate #51,Gate #52,Gate #53,Gate #54,Gate #55,Gate #56,Gate #57,Gate #58,Gate #59,Gate #60,Gate #61,Gate #62,Gate #63,Gate #64,Gate #65,Gate #66,Gate #67,Gate #68,Gate #69,Gate #70,Gate #71,Gate #72,Gate #73,Gate #74,Gate #75,Gate #76,Gate #77,Gate #78,Gate #79,Gate #80,Gate #81,Gate #82,Gate #83,Gate #84,Gate #85,Gate #86,Gate #87,Gate #88,Gate #89,Gate #90,Gate #91,Gate #92,Gate #93,Gate #94,Gate #95,Gate #96,Gate #97,Gate #98,Gate #99
        "5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",1,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        "5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",2,,1,,,1,,,,1,,,1,1,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        "5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",3,,,,,,,,,,,,,,,,1,,,1,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        "5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",4,,1,1,,,,1,,,,1,,,,,1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        "5c991b2547e773001173735f",5,56,"2019-03-25T18:17:09.341Z",5,,,,,,,,,,,,,,,,,1,,1,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        "5c991ca147e7730011737365",5,6,"2019-03-25T18:23:29.428Z",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

+ Response 400 (application/json)

        { "error": "Route parameter \"vessel\" is not specified or specified incorrectly: \"<value>\" is not a positive integer."}

+ Response 404 (application/json)

        { "error": "Vessel \"55\" is not found." }
