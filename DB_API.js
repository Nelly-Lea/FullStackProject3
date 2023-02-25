 class DB_API{
    // constructor(){
    //     return new DB_API();
    // }
}
 var guest={
    type:"guest",
    last_name:'',
    first_name:'',
    mail:'', // id de la personne
    phone_number:'',
    family_member:0,
    coming:false,
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

function add_guest(guest_json){
    list_guest_array=[]
    var new_guest=JSON.parse(guest_json);
    list_guest=JSON.parse((localStorage.getItem(current_user.mail)));
    if(list_guest!=null){
        list_guest.push(new_guest);
        localStorage.removeItem(current_user.mail)
        localStorage.setItem(current_user.mail,JSON.stringify(list_guest))
    }else{
        list_guest_array.push(new_guest);
        localStorage.setItem(current_user.mail,JSON.stringify(list_guest_array))
    }
   
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
 
var current_user=null;


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
    user_current=JSON.parse(localStorage.getItem("current_user"));
    current_user=new_user;
    if(user_current!=null){
        localStorage.removeItem("current_user");
        localStorage.setItem("current_user", JSON.stringify(current_user))
    }
    else{
        localStorage.setItem("current_user", JSON.stringify(current_user));
    }
    
    
}

function get_user(user_json){
    var list_users=[]
    list_users=JSON.parse(localStorage.getItem("list_users"));
    var user_obj=JSON.parse(user_json)
         
    for(var i = 0; i < list_users.length; i++) {
        if((user_obj.mail==list_users[i].mail)&&(user_obj.password==list_users[i].password)){
            current_user=list_users[i];
            localStorage.removeItem("current_user");
            localStorage.setItem("current_user", JSON.stringify(current_user));
            return list_users[i];
        }  
    }
    return null;
    
}

function get_list_guest_of_user(user_json){
    var user=JSON.parse(user_json);
    mail=user.mail;
    list_guest=JSON.parse(localStorage.getItem(mail))
    return list_guest;
}

