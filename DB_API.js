
 var guest={
    type:"guest",
    last_name:'',
    first_name:'',
    mail:'', // => guest id
    phone_number:'',
    family_member:0,
    coming:false,
}

var current_guest=null;
var current_user=null;
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

function delete_guest(two_mails){   //mail_array[0]==mail of guest to delete mail_array[1]==mail of current user
    var mails_array = two_mails.split(" ");
    var list_guest = JSON.parse(localStorage.getItem(mails_array[1]));
    var index = list_guest.findIndex((obj)=>obj.mail == mails_array[0]);
    if (index>-1){
        list_guest.splice(index,1)
    }
    localStorage.removeItem(mails_array[1]); 
    if(list_guest.length!=0){
     
      localStorage.setItem(mails_array[1],JSON.stringify(list_guest));

    }
    
}

function update_guest(guest_to_update_json){
    var guest_to_update_obj=JSON.parse(guest_to_update_json);
    var list_guest_current_user=[];
    current_user=JSON.parse(localStorage.getItem("current_user"));
    list_guest_current_user=JSON.parse(localStorage.getItem(current_user.mail));
    var index = list_guest_current_user.findIndex((obj)=>obj.mail ==guest_to_update_obj.mail);
    if (index>-1){
        list_guest_current_user.splice(index,1)
    }
    list_guest_current_user.push(guest_to_update_obj);

    localStorage.removeItem(current_user.mail);
    localStorage.setItem(current_user.mail, JSON.stringify(list_guest_current_user));
   
}

function get_guest(two_mails){
    var mails_array = two_mails.split(" ");
    var list_guest = JSON.parse(localStorage.getItem(mails_array[1]));
    current_guest=list_guest.find(guest=>guest.mail==mails_array[0]);
    return current_guest;
}



var user={
    type:"user",
    name:'',
    mail:'', // => mail=id of user 
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

