var jwt = require('jsonwebtoken');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer');
var redis = require('redis');
var redisClient = redis.createClient("6379", "service-redis");

passport.use(new BearerStrategy(
    function (token, done) {
        redisClient.get(token, function (err, accountData) {
            if (err) return done(err);
            if (!accountData) return done(null, false, { message: "No account data" });
            return done(null, jwt.verify(token, process.env.JWT_SECRET || "molotov#777"));
        });
    }
));

passport.serializeUser(function (account, done) {
    done(null, account);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});