const redis = require('./redis');


const connect = url => redis.createClient({ url });

module.exports = { redis, connect };
