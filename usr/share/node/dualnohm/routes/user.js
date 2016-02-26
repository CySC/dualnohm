//ok lets practice our es6 here xD
const express = require('express');
const User= require('../models/User');
const router = express.Router();

router.get('/:id', (req, res, next) => {
    User.load(req.params.id, (err, properties) => {
        if(err) {
            res.status(404).send("{}");
        } else {
            res.send(properties);
        }
    });

})

router.get('/', (req, res, next) => {
   User.find((err, ids) => {
        var Users = [];
        var len = ids.length;
        var count = 0;
        if(ids.length === 0) {
            res.send([]);
        } else {
            ids.forEach((id) => {
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

})

router.post('/', (req, res, next) => {
    var user = new User();
    user.p(req.body);
    user.save((err)=> {
      if(err) {
        return res.status(500).send("{}");
      }
      res.send(user.allProperties(true));
    });

})
router.put('/:id', (req, res, next) => {
    var user = new User();
    user.id = req.params.id;
    user.p(req.body);
    user.save(function (err) {
        if(err) {
          return res.status(400).send("{}");
        }

        res.send(user.allProperties(true));
    });

})
router.delete('/:id', (req, res, next) => {
 var user = new User();
    user.id = req.params.id;
    user.remove( (err) => {
        if(err) {
          return res.status(400).send("{}");
        }

        res.status(204).send("{}");
    });

})



module.exports=router;
