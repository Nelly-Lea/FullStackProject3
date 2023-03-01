
class FXMLHttpRequest{
    response=null;
    responseText="";
    readyState=0;//connection state 
    status=0; // response status  
    onload=null;// verify response status and return the response
    async=true;
    method='';
    url='';

     open(method, url, async){ // initialize fields
        this.readyState=1;
        this.async=async;
        this.method=method;
        this.url=url;
       
        if(this.async==true){
            this.onload=(e) => {
                if (this.readyState === 4) {
                     if (this.status === 200) {
                       return this.response;
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
                return this.response;}
            else{
                console.log(this.status)
            }
        };
        }

    }

    send(body){ //send request to network
    var fxmlhttp=null;
    fxmlhttp=Network.send(body, this); 
    this.readyState=fxmlhttp.readyState;
    this.status=fxmlhttp.status;
    this.response=fxmlhttp.response;

    
     
        
    }
    
}
