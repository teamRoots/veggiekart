//===================================
//All requirements

var express = require('express');
var router = express.Router();

//===================================
//All Models for data access

var Salads = require('../../Models/Salad');
var Request = require('../../Models/Request');

//+++++++++++++++++++++++++++++++++++++
////Do we need to bring in other database for this???????
//+++++++++++++++++++++++++++++++++++++

//===================================
//Model in database creation

router.post('/createRequest', function(request, response) {
    Request.create({

    });
});

router.post('/createSalad', function(request, response) {
    Salads.create({

    });
});
//===================================
//exporting the router

module.exports = router;