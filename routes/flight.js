var express = require('express');
var pool = require('./pool');
var router =express.Router();
var upload=require('./multer');

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
router.post("/submit_flight_information", upload.single('picture'), function(req,res){
        var days = req.body.days ? req.body.days.join(',') : '';
        var logo = req.file ? req.file.filename : '';

    pool.query("insert into flight(flight_name, flight_type, flight_seat,days, source_city, departure_time, destination_city, arrival_time, company,logo) values(?,?,?,?,?,?,?,?,?,?)", 
    [req.body.flightname, req.body.flighttype, req.body.flightseats, days, req.body.sourcecity, req.body.departuretime, req.body.destinationcity, req.body.arrivaltime, req.body.company, logo],
    function(err,result){
        if(err){
            console.log("Days:", req.body.days);
            console.log("Joined Days:", days);
            console.log("File:", req.file);
            res.json({status:false, message:"sql Error"});
        } else {
            res.json({status:true, message:"Flight added successfully"});
        }
    });
})

module.exports = router;
