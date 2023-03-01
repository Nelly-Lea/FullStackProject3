

 class Network{
    static send(body, obj){
        obj.readyState=2;  //request received 
        var fxhttp=null;
        fxhttp=Server.carry_request(body, obj);
        return fxhttp;
        
    }
}