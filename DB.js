var guest={
    last_name:'',
    first_name:'',
    mail:'',
    phone_number:'',
    family_member:0,
    coming:false
}
var current_guest=null;

function Guest(last_name, first_name, mail, phone_number, family_number, coming){
    this.last_name=last_name;
    this.first_name=first_name;
    this.mail=mail;
    this.phone_number=phone_number;
    this.family_number=family_number;
    this.coming=coming;
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
