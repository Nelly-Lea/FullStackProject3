//var xhttp = new XMLHttpRequest();
//import { Network } from './network.js';
class FXMLHttpRequest{
    response=null;
    readyState=0;//etat de la connection
    status=0; // status de la reponse 
    onload=null;// fonction qui verifie les statuts et met la reponse
    async=true;
    method='';
    url='';

    // constructor(){
    //     return new FXMLHttpRequest();
    // }
     open(method, url, async){
        this.readyState=1;
        this.async=async;
        this.method=method;
        this.url=url;
        // pas sur que ca soit la  =>peut etre mettre ds client.js a voir
        if(this.async==true){
            this.onload=(e) => {
                if (this.readyState === 4) {
                     if (this.status === 200) {
                       return 
                } 
                else {
                  console.log(this.status);
                }
              }
            };
         }
        else{
            this.onload =()=>{
    
            if (this.status === 200) {
                return }
            else{
                console.log(this.status)
            }
        };
        }

    }
    send(body){  //body ce qu'on envoit au server
        //envoyer this au server
    var fxmlhttp=null;
    fxmlhttp=Network.send(body, this);
    this.readyState=fxmlhttp.readyState;
    this.status=fxmlhttp.status;
    this.response=fxmlhttp.response;

    
     
        
    }

}
