
 class Server{
    static carry_request(body, obj){

        if(obj.method=="POST"){ // add user or guest 
            var obj=JSON.parse(body)
            if(obj.type=="user"){
                add_user(body)
                obj.status=200;
                obj.readyState=4;
                return obj;
               
            }
            if(obj.type=="guest"){
                add_guest(body)
                obj.status=200;
                obj.readyState=4;
                return obj;
               
            }

        }
        else{
            if((obj.method=="GET")&&(obj.url=="./GET_user")){// get list guest of current user 
                var obj=JSON.parse(body)
            if((obj.type=="user")&&(obj.password=="")){
                var list_guest=null;
                list_guest=get_list_guest_of_user(body);
                if(list_guest!=null){
                    obj.status=200;
                    obj.readyState=4;
                    obj.response=list_guest;
                    obj.responseText=JSON.stringify(list_guest);
                   return obj;
                    
                }else{
                    obj.status=404;
                    obj.readyState=4;
                    obj.response=list_guest;
                    obj.responseText="";
                    return obj;

                }
                

            }
            if(obj.type=="user"){ // get current user 
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
            if((obj.method=="GET")&&(obj.url=="./GET_guest"))
            {
                var guest=null;
                guest=get_guest(body); //get specific guest of current user 
                if(guest!=null)
                {
                    obj.status=200;
                    obj.readyState=4;
                    obj.response=guest;
                    obj.responseText=JSON.stringify(guest);
                    return obj;
                }else{
                    obj.status=404;
                    obj.readyState=4;
                    obj.response=guest;
                    obj.responseText="";
                    return obj;

                }

            }
            if (obj.method == "DELETE" ){ // delete guest 
                delete_guest(body);
                obj.status=200;
                obj.readyState=4;
                obj.response=null;
                obj.responseText="";
                return obj;
            }
            if(obj.method=="PUT"){ //update guest details 
                update_guest(body);
                obj.status=200;
                obj.readyState=4;
                obj.response=null;
                obj.responseText="";
                return obj;
            }
        }

    }
}