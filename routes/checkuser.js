 
 function check_user(localStorage){
 try {
    var data= JSON.parse(localStorage.getItem("ADMIN_LOGIN"));
    if(data==null){
      return false
    }
    else{
    return data
    }
  }catch (e){

  return false
  }
}
module.exports={check_user};