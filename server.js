
//import * as DB_API from './DB_API.js';

//var methods_array=["GET","POST","DELETE","PUT"]
 class Server{
    static carry_request(body, obj){

        if(obj.method=="POST"){
            var obj=JSON.parse(body)
            if(obj.type=="user"){
                add_user(body)
                obj.status=200;
                obj.readyState=4;
                return obj;
            }

        }
        else{
            if(obj.method=="GET"){
                var obj=JSON.parse(body)
            if(obj.type=="user"){
                var user=null;
                user=get_user(body)
                if(user!=null){
                    obj.status=200;
                    obj.readyState=4;
                    obj.response=user;
                    obj.responseText=JSON.stringify(user);
                    return obj;

                }
                else{
                    obj.status=404;
                    obj.readyState=4;
                    obj.response=user;
                    obj.responseText="";
                    return obj;
                }
                
            }

            }
        }

    }
}