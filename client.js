
var current_user;
var delete_guest_bool=false;
var current_guest=null;
var error_sign_in=false;
var max_essai_sign_in=0;


var button_add_guest=document.getElementById("button_add_guest")

  var current_page=null;
  var current_page_div=null;
  const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })

         var temp = document.getElementsByTagName("template")[0];
         var clon = temp.content.cloneNode(true);
         document.body.appendChild(clon);
        
         document.querySelectorAll(".nav-link").forEach((item)=>{
            item.addEventListener('click', app.nav);
         })
 
        current_page="#home"
        current_page_div="#home_div"
      
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        if(delete_guest_bool){
            delete_guest_bool=false; 
            return; // stay in guest_list page
        }
         ev.preventDefault();
         let currentPage= ev.target.getAttribute('data-target');
          temp1=document.querySelector(current_page_div)
          document.body.removeChild(temp1);
          current_page='#'+currentPage;
          current_page_div=current_page+"_div"
         temp2=document.getElementById(currentPage)
         var clon2 = temp2.content.cloneNode(true);
         document.body.appendChild(clon2);
         console.log(currentPage)
         history.pushState({}, currentPage, `#${currentPage}`);
         document.querySelectorAll(".nav-link").forEach((item)=>{
            item.addEventListener('click', app.nav);
         })
         document.getElementById(currentPage).dispatchEvent(app.show);
       
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');

        if(ev.target.id=="guest_list"){

            Display_Guest_List_Page(); 
           
        }
        if(ev.target.id=="details_guest"){
            get_current_guest();
            return;
         }
     
    },
    poppin: function(ev){
        if(current_page=="#sign_in"){  // error in sign
            if(error_sign_in==true){
                error_sign_in=false;
                var userEmail = document.getElementById('userMail');
                var userPw = document.getElementById('userPw');
                userEmail.value="";
                userPw.value="";
                max_essai_sign_in++;
                if(max_essai_sign_in==3){
                    
                    setTimeout(blocking,  15000);
                    alert("you are blocked for 15 seconds");
                    document.getElementById("userMail").disabled = true;
                    document.getElementById("userPw").disabled = true;
                    max_essai_sign_in=0;
                    
            
                }
                return;
            }
        }
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        temp1=document.querySelector(current_page_div)
        document.body.removeChild(temp1);
        current_page=hash;
        current_page_div="#"+current_page+"_div"
        temp2=document.getElementById(current_page)
        var clon2 = temp2.content.cloneNode(true);
         document.body.appendChild(clon2);
        console.log(hash)
      
        document.querySelectorAll(".nav-link").forEach((item)=>{
            item.addEventListener('click', app.nav);
         })
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);
var current_guest_id=null;
function get_current_guest_id(){ // function to find id of current
  current_guest_id=this.id;
}
function get_current_guest() //function to show informations about current guest 
{
    var mail_current_guest=current_guest_id; //  we want to search info about current user thank his id=> his mail
    var two_mails = mail_current_guest + " " + current_user.mail
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("GET","./GET_guest",true);
    fxhttp.send(two_mails);
    var rep=fxhttp.onload();
    current_guest=rep;

    var firstname_guest_details = document.getElementById('firstName_guest_details');
    var lastname_guest_details = document.getElementById('lastName_guest_details');
    var mail_guest_details = document.getElementById('mail_guest_details');
    var phonenumber_guest_details = document.getElementById('phoneNumber_guest_details');
    var person_number_list_details= document.getElementById('person_number_guest_details');
 
   var com_details=document.getElementsByName("coming_details");

lastname_guest_details.setAttribute("value", current_guest.last_name);
firstname_guest_details.setAttribute("value",current_guest.first_name);
mail_guest_details.setAttribute("value", current_guest.mail);
phonenumber_guest_details.setAttribute("value", current_guest.phone_number);
var n=parseInt(current_guest.family_member,10)-1;
person_number_list_details.querySelectorAll('option')[n].selected='selected'; 
if(current_guest.coming){
    com_details[0].checked=true;
}else{
    com_details[1].checked=true;
}

   

}
// java de sign_up 
function store(){ // sign up function

    var name = document.getElementById('name');
    var email=document.getElementById('email');
    var pw = document.getElementById('pw');
    var repeatpw=document.getElementById('repeat_pw');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;


    if(name.value.length == 0){
        alert('Please fill in name');

    }else if(pw.value.length == 0){
        alert('Please fill in password');

    }else if(name.value.length == 0 && pw.value.length == 0){
        alert('Please fill in name and password');

    }else if(!pw.value.match(numbers)){
        alert('please add 1 number');

    }else if(!pw.value.match(upperCaseLetters)){
        alert('please add 1 uppercase letter');

    }else if(!pw.value.match(lowerCaseLetters)){
        alert('please add 1 lovercase letter');

    }else if(pw.value!=repeatpw.value){
        alert('passwords do not match');
    }else{
       

        var new_user ={
            type:"user",
            name:name.value,
            mail:email.value,
            password:pw.value
        }
        var new_user_json=JSON.stringify(new_user);

        var fxhttp=new FXMLHttpRequest();
        fxhttp.open("POST","./Add_new_user",true);  
        fxhttp.send(new_user_json);
        

        alert('Your account has been created');

    }
}


function check(){ //sign in function
    
    var userEmail = document.getElementById('userMail');
    var userPw = document.getElementById('userPw');
    
   
    var user_to_search ={
        type:"user",
        name:"",
        mail:userEmail.value,
        password:userPw.value
    }
    var user_to_search_json=JSON.stringify(user_to_search);


    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("GET","./GET_user",true);
    fxhttp.send(user_to_search_json);
    var rep=fxhttp.onload();
    current_user=rep;

    if(rep!=null){
       // go to guest list page
        let currentPage= "guest_list";
          temp1=document.querySelector(current_page_div)
          document.body.removeChild(temp1);
          current_page='#'+currentPage;
          current_page_div=current_page+"_div"
         temp2=document.getElementById(currentPage)
         var clon2 = temp2.content.cloneNode(true);
         document.body.appendChild(clon2);
         console.log(currentPage)
         history.pushState({}, currentPage, `#${currentPage}`);
         document.querySelectorAll(".nav-link").forEach((item)=>{
            item.addEventListener('click', app.nav);
         })
         document.getElementById(currentPage).dispatchEvent(app.show);
    }
    else{
        alert("error in username or password, please retry")
        error_sign_in=true;
        let currentPage= "sign_in";
        temp1=document.querySelector(current_page_div)
        document.body.removeChild(temp1);
        current_page='#'+currentPage;
        current_page_div=current_page+"_div"
       temp2=document.getElementById(currentPage)
       var clon2 = temp2.content.cloneNode(true);
       document.body.appendChild(clon2);
       if(error_sign_in==true){
        error_sign_in=false;
        var userEmail = document.getElementById('userMail');
        var userPw = document.getElementById('userPw');
        userEmail.value="";
        userPw.value="";
        max_essai_sign_in++;
        if(max_essai_sign_in==3){
            
            setTimeout(blocking,  15000);
            alert("you are blocked for 15 seconds");
            document.getElementById("userMail").disabled = true;
            document.getElementById("userPw").disabled = true;
            max_essai_sign_in=0;
            
    
        }
    }
       
    }
    
 

}
// java de contact us  // je sais pas si on garde

function contact_func(){


const form = document.getElementById("form_contact");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
}
//java de guest list page 
//faire les verifiaction des field pas vides
function Add_Guest(){ //add new guest
    var firstname_guest = document.getElementById('firstName_guest');
    var lastname_guest = document.getElementById('lastName_guest');
    var mail_guest = document.getElementById('mail_guest');
    var phonenumber_guest = document.getElementById('phoneNumber_guest');
    var person_number_list = document.getElementById('person_number_guest');
    var person_number_guest=person_number_list.options[person_number_list.selectedIndex].text;
   var com=document.getElementsByName("coming");
   var coming_guest;
   for(i = 0; i < com.length; i++) {
    if(com[i].checked){
        if(com[i].id=="yes"){
            coming_guest=true;
        }else{
            coming_guest=false;
        }
    }
}
var pattern="[0-9]{3}[0-9]{3}[0-9]{4}";


   


if(firstname_guest.value.length == 0){
    alert('Please fill in first name');
    
    //return;

}else if(lastname_guest.value.length== 0){
    alert('Please fill in last name');
   
   // return;

}else if(firstname_guest.value.length == 0 && lastname_guest.value.length == 0){
    alert('Please fill in first name and last name');
    //return;

}else if(mail_guest.value.length==0){
    alert('please fill in mail');
    //return;

}else if(!phonenumber_guest.value.match(pattern)){
    alert('error in phone number field');
    //return;


}else{

    
    var new_guest ={
        type:"guest",
        last_name:lastname_guest.value,
        first_name:firstname_guest.value,
        mail:mail_guest.value, // =>id of guest
        phone_number:phonenumber_guest.value,
        family_member:parseInt(person_number_guest),
        coming:coming_guest,
    }
    var new_guest_json=JSON.stringify(new_guest);

    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("POST","./Add_new_guest",true);
    fxhttp.send(new_guest_json);
    var rep=fxhttp.onload();

    var list_guest=document.getElementById("guest_event_list");
    var li = document.createElement("li");
    var item_value = lastname_guest.value+" "+firstname_guest.value+": "+person_number_guest;
    var t = document.createTextNode(item_value);
    li.setAttribute("id",mail_guest.value);
    li.setAttribute('data-target', "details_guest");
    li.setAttribute('class',"list_guest")
    li.classList.add("nav-link");
    li.appendChild(t);
    li.onclick=get_current_guest_id;
    li.addEventListener('click', app.nav);
    list_guest.appendChild(li);
  
  firstname_guest.value="";
  lastname_guest.value="";
  mail_guest.value="";
  phonenumber_guest.value="";
  person_number_list.value="1";
  com[0].checked=true;


   Disappear_Add_Guest();

   var span = document.createElement("SPAN");
   var txt = document.createTextNode("🗑");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);

   var close = document.getElementsByClassName("close");
   for (i = 0; i < close.length; i++) {
      close[i].onclick = Delete_Guest;
      
    }
    Print_Sum_Guest(); 
}
   
}
function Delete_Guest(){
    var parent = this.parentElement;
    var mail = parent.id;
    var two_mails = mail + " " + current_user.mail  //guest mail + current user mail
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("DELETE","./DB_API.js",true);
    fxhttp.send(two_mails);
    var rep=fxhttp.onload(); 
    var item_delete=document.getElementById(mail);
    var list_guest=document.getElementById("guest_event_list");
    list_guest.removeChild(item_delete); 
    delete_guest_bool=true;
    Print_Sum_Guest();
   }

function Update_Guest(){
    var firstname_guest_details = document.getElementById('firstName_guest_details');
    var lastname_guest_details = document.getElementById('lastName_guest_details');
    var mail_guest_details = document.getElementById('mail_guest_details');
    var phonenumber_guest_details = document.getElementById('phoneNumber_guest_details');
    var person_number_list_details= document.getElementById('person_number_guest_details');
    var person_number_guest_details=person_number_list_details.options[person_number_list_details.selectedIndex].text;
   var com_details=document.getElementsByName("coming_details");
   var coming_guest_details;
   for(i = 0; i < com_details.length; i++) {
    if(com_details[i].checked){
        if(com_details[i].id=="yes"){
            coming_guest_details=true;
        }else{
            coming_guest_details=false;
        }
    }
}
var pattern="[0-9]{3}[0-9]{3}[0-9]{4}";
if(!phonenumber_guest_details.value.match(pattern))
{
   alert('error in phone number field');

   return;
}

var update_guest={
 type:"guest",
 first_name:firstname_guest_details.value,
 last_name:lastname_guest_details.value,
 mail:mail_guest_details.value,
 family_member:person_number_guest_details,
 phone_number:phonenumber_guest_details.value,
 coming:coming_guest_details
}

var update_guest_json=JSON.stringify(update_guest);

var fxhttp=new FXMLHttpRequest();
fxhttp.open("PUT","./Update_Guest",true);
fxhttp.send(update_guest_json);
var rep=fxhttp.onload();
alert("Your details had been successfully updated!")



}

function Display_Add_Guest(){ 
    var add_guest_form=document.getElementById("add_guest_div");
    add_guest_form.classList.remove("remove");
    add_guest_form.classList.add("appear");
}
function Disappear_Add_Guest(){
    var add_guest_form=document.getElementById("add_guest_div");
    add_guest_form.classList.remove("appear");
    add_guest_form.classList.add("remove");
}
function Print_Sum_Guest(){
   var totalGuestsElement = document.getElementById("total-guests");
   var fxhttp=new FXMLHttpRequest();
   fxhttp.open("GET","./GET_user",true); // get guest list of current user 
   user_search_list={
       type:"user",
       name:"",
       mail:current_user.mail,
       password:""
   }
   var list_to_search_json=JSON.stringify(user_search_list);

   
   fxhttp.send(list_to_search_json);
   var list_guest=fxhttp.onload();
   var sum_guest=0;
   if(list_guest!=null)
   {
    list_guest.forEach((guest)=>{
        if(guest.coming==true){
            var num_guest=parseInt(guest.family_member,10);
            sum_guest+=num_guest;
        }

    })

   }
   totalGuestsElement.innerHTML = "Total guests: " + sum_guest;
    
}

function Display_Guest_List_Page(){

    var p_hello=document.getElementById("hello_user");
    p_hello.innerHTML="Hello "+current_user.name;
    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("GET","./GET_user",true);
    user_search_list={
        type:"user",
        name:"",
        mail:current_user.mail,
        password:""
    }
    var list_to_search_json=JSON.stringify(user_search_list);

    
    fxhttp.send(list_to_search_json);
    var list_guest=fxhttp.onload();
    // if(list_guest!=null)
    // {
    //     list_guest.sort(function(a,b){
    //         return a.last_name.localeCompare(b.last_name);
    //     })

    // }
    
  
    if(list_guest!=null){
        for(i=0;i<list_guest.length;i++){
            var li = document.createElement("li");
            var item_value = list_guest[i].last_name+" "+list_guest[i].first_name+": "+list_guest[i].family_member;
            var t = document.createTextNode(item_value);
            li.setAttribute('id',list_guest[i].mail)
            li.setAttribute('class',"list_guest")
            li.setAttribute('data-target', "details_guest");
            li.classList.add("nav-link");
            li.appendChild(t);
            li.onclick=get_current_guest_id;
            document.getElementById("guest_event_list").appendChild(li);
        
            li.addEventListener('click', app.nav);
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("🗑");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);
            
          

         }
         var close = document.getElementsByClassName("close");
         for (i = 0; i < close.length; i++) {
            close[i].onclick = Delete_Guest;
            
          }

    }
    Print_Sum_Guest();

}

function blocking(){
    alert("you can try to login");
    document.getElementById("userMail").disabled = false;
    document.getElementById("userPw").disabled = false;
    
   
}

function Log_Out(){
    max_essai_sign_in=0;
    current_user=null;
}