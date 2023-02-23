 class DB_API{
    // constructor(){
    //     return new DB_API();
    // }
}
 var guest={
    type:"guest",
    last_name:'',
    first_name:'',
    mail:'',
    phone_number:'',
    family_member:0,
    coming:false,
    list_manager:''
}

//rajouter object user 
var current_guest=null;

function Guest(last_name, first_name, mail, phone_number, family_number, coming, list_manager){
    this.last_name=last_name;
    this.first_name=first_name;
    this.mail=mail;
    this.phone_number=phone_number;
    this.family_number=family_number;
    this.coming=coming;
    this.list_manager=list_manager;
}

function add_guest(last_name,first_name,mail, phone_number, family_member, coming){
    var guest=new Task(last_name, first_name,mail,phone_number, family_member, coming)
    localStorage.setItem(mail, JSON.stringify (guest))
}

function delete_guest(mail){
    localStorage.removeItem(mail); // mail cest une string si cest obj rajouter .value
}

function update(str,field, mail){
    var guest_to_update=JSON.parse(localStorage.getItem( mail));
    guest_to_update[field]=str; // a verifier
}

function get(mail){
    current_guest=JSON.parse(localStorage.getItem( mail));
}

var user={
    type:"user",
    name:'',
    mail:'',
    password:''

}



 function add_user(user_json){
    var list_users_array=[];
    var new_user=JSON.parse(user_json);
    list_users=JSON.parse(localStorage.getItem("list_users"));
    if(list_users!=null){
        list_users.push(new_user);
        localStorage.removeItem("list_users")
        localStorage.setItem("list_users",JSON.stringify(list_users))
    }else{
        list_users_array.push(new_user);
        localStorage.setItem("list_users",JSON.stringify(list_users_array))
    }
    
    

}