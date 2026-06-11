$(document).ready(function(){
    $.getJSON("/flight/fetch_all_city", function(response){
         console.log(response);
     response.data.map((item)=>{
      $("#sourcecity").append($("<option>").val(item.city_id).text(item.city_name))
    })
})
     $.getJSON("/flight/fetch_all_city", function(response){
        response.data.map((item)=>{
        $("#destinationcity").append($("<option>").val(item.city_id).text(item.city_name))
    })
})
      
})