//import { Server } from './server.js';

 class Network{
    static send(body, obj){
        //obj.status=2; // la request a ete recu 
        obj.readyState=2; 
        var fxhttp=null;
        fxhttp=Server.carry_request(body, obj);
        return fxhttp;
        
    }
}