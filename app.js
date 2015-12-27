var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}));
var nohm = require('nohm').Nohm;
console.log(process.env.REDIS_URL)
if (process.env.REDIS_URL) {
    // inside if statement
    var rtg   = require("url").parse(process.env.REDIS_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    console.log("rtg:"+JSON.stringify(rtg));
    redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

redis.on("connect", function() {
    nohm.setClient(redis);
    console.log("Nohm Connected to Redis Client");
});
var port = process.env.PORT || 3000;

var User = nohm.model('User', {
    properties: {
        uid:{type:"string"},
        age:{type:"number"},
        gender:{type:"string"},
        name:{type:"string"},
        country:{type:"string"},
        city:{type:"string"}
    }
});

var listUsers = function (req, res) {
    User.find(function (err, ids) {
        var Users = [];
        var len = ids.length;
        var count = 0;
        if(ids.length === 0) {
            res.send([]);

        } else {
            ids.forEach(function (id) {
                var User = new User();
                User.load(id, function (err, props) {
                    Users.push({uid: props.uid,
                                age: props.age,
                                gender: props.gender,
                                name :props.name,
                                country:props.country,
                                city:props.city
                               });
                    if (++count === len) {
                        res.send(Users);
                    }
                });
            });
        }
    });
};

var userDetails = function (req, res) {
    User.load(req.params.id, function (err, properties) {
        if(err) {
            res.send(404);
        } else {
            res.send(properties);
        }
    });
};

var deleteUser = function (req, res) {
    var user = new User();
    user.id = req.params.id;
    user.remove(function (err) {
        res.send(204);
    });
};

var createUser= function (req, res) {
    var user = new User();
    user.p(req.body);
    user.save(function (err) {
        res.send(user.allProperties(true));
    });
};

var updateUser = function (req, res) {
    var user = new User();
    user.id = req.params.id;
    user.p(req.body);
    user.save(function (err) {
        res.send(user.allProperties(true));
    });
};
app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Content-Type", "application/json");
    next();
});
nohm.factory('UserModel').subscribe('update', function (event) {
    console.log('server'+process.env.SERVER+':someModel with id'+event.target.id+' was updated and now looks like this:', event.target.properties);
});
app.get('/users', listUsers);
app.get('/users/:id', userDetails);
app.delete('/users/:id', deleteUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);

app.listen(port);
