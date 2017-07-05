

exports.module = function(req){
var userinfo = {}
    console.log("inside stuff")
    console.log(req)
    userinfo.FirstName= req.first_name;


return userinfo;
}
