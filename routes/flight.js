var express = require('express');
var pool=require('./pool');
var router =express.Router();

router.get('/flight_interface', function(req,res,next){
    res.render('flight_interface');
});

module.exports = router;
