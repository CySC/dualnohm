const   app = require('express')(),
	bodyParser = require('body-parser')
	User=require(__dirname+"/models/User")
	userRoute=require(__dirname+"/routes/user"),
	nohm = require('nohm').Nohm,
	redis=require("redis"),
	rtg   = require("url").parse(process.env.REDIS_URL);
	redisConf={ host:rtg.hostname,port:rtg.port,password:rtg.auth.split(":")[1]},
	redisClient = redis.createClient(redisConf),
	pubSubRedisClient=redis.createClient(redisConf);
//use body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
queue=[];
redisClient.on("connect", () => {
	nohm.setClient(redisClient);
	console.log("Nohm Connected to Redis Client");
  	pubSubRedisClient.on("connect",() => {
    		nohm.setPubSubClient(secondClient, (err) => {
      			if (err) {
        			console.log('Error while initializing the second redis client');
      			} else {
				nohm.factory('User').subscribe('create', (event) => {
					console.log('server ${process.env.SERVER} :someModel with id',
					'${event.target.id} was created with the',
					'followig data: ${event.target.properties}');
				});
				nohm.factory('User').subscribe('update', (event) => {
					console.log('server ${process.env.SERVER}:someModel with id',
						'${event.target.id} was updated and now looks',
						'like this: ${event.target.properties}');
				});
			}
		});
	});
});



app.all('*', function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Content-Type", "application/json");
    next();
});
app.use("/users",userRoute)
app.listen(process.env.PORT || 3000);
