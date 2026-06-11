var express = require('express');
var pool = require('./pool');
var router =express.Router();

router.get('/flight_interface', function(req,res,next){
    res.render('flight_interface',{message:""});
});

router.get("/fetch_all_city", function(req,res){

    pool.query("select * from city", function(err,result){
        if(err)
        {
            res.json({status:false, message:err});
    }
    else{
        res.json({status:true, data:result});
    }
    })
})
router.post("/submit_flight_information",function(req,res){
    pool.query("insert into flight(flight_name, flight_type, flight_seat,  source_city, departure_time, destination_city, arrival_time, company) values(?,?,?,?,?,?,?,?)", 
    [req.body.flightname, req.body.flighttype, req.body.flightseats, req.body.sourcecity, req.body.departuretime, req.body.destinationcity, req.body.arrivaltime, req.body.company],
    function(err,result){
        if(err){
            res.json({status:false, message:"sql Error"});
        } else {
            res.json({status:true, message:"Flight added successfully"});
        }
    });
})
module.exports = router;
