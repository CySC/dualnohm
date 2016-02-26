"use strict"
var nohm=require("nohm").Nohm
module.exports=nohm.model('User', {
      publish: true,
      properties: {
        uid:{type:"string"},
        age:{type:"number"},
        gender:{type:"string"},
        name:{type:"string"},
        country:{type:"string"},
        city:{type:"string"}
     }
    });

