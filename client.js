//import {FXMLHttpRequest} from './FXMLHttpRequest.js';

//const FXMLHttpRequest = require('./FXMLHttpRequest.js');

// function showContent() {
//     var temp = document.getElementsByTagName("template")[0];
//     var clon = temp.content.cloneNode(true);
//     document.body.appendChild(clon);
//     // var temp1=document.getElementsByTagName("template")[1];
//     // var clon1 = temp1.content.cloneNode(true);
//     // document.body.appendChild(clon1);
//   }
current_user=null;


var button_add_guest=document.getElementById("button_add_guest")
// button_add_guest.addEventListener("click",add_guest);
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
        // temps=document.querySelectorAll('template');
        // t=temps[0].content.querySelector('#nav_sign')
        // temps[0].content.querySelector('#nav_sign').addEventListener('click', app.nav);
        // document.querySelectorAll('template').forEach((temp)=>{
        //     temp_array=temp.content.querySelectorAll('.nav-link');
           

        //     temp.content.querySelectorAll('.nav-link').forEach((item)=>{
        //          item.addEventListener('click', app.nav );
        //          console.log(item.Event)
        //          item.onClick=app.nav;
        //          item2=item;
        //     })
        // })
      
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
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
            var fxhttp=new FXMLHttpRequest();
            fxhttp.open("GET","./DB_API.js",true);
            user_search_list={
                type:"user",
                name:"",
                mail:current_user.mail,
                password:""
            }
            var list_to_search_json=JSON.stringify(user_search_list);

            
            fxhttp.send(list_to_search_json);
            var list_guest=fxhttp.onload();
          
            if(list_guest!=null){
                for(i=0;i<list_guest.length;i++){
                    var li = document.createElement("li");
                   // var a=document.createElement("a");
                    var item_value = list_guest[i].last_name+" "+list_guest[i].first_name+": "+list_guest[i].family_member;
                    
                    // var t = document.createTextNode(item_value);
                    // a.appendChild(t);
                    // a.title=item_value;
                    // a.href="#";
                    // a.setAttribute('data-target', "details_guest");
                    // a.classList.add("nav-link");
                    // a.setAttribute('id',list_guest[i].mail)
                    // a.setAttribute('onclick',get_current_guest())
                    // li.appendChild(a);
                    var t = document.createTextNode(item_value);
                    li.setAttribute('id',list_guest[i].mail)
                    li.setAttribute('data-target', "details_guest");
                    li.classList.add("nav-link");
                    li.appendChild(t);
                    li.onclick=get_current_guest;
                    document.getElementById("guest_event_list").appendChild(li);
                
                  
                    var span = document.createElement("SPAN");
                    var txt = document.createTextNode("\u00D7");
                    span.className = "close";
                    span.appendChild(txt);
                    li.appendChild(span);
                  
    
                 }
                 document.querySelectorAll(".nav-link").forEach((item)=>{
                    item.addEventListener('click', app.nav);
                 })

            }
           
            }
        // let h1 = ev.target.querySelector('h1');
        // h1.classList.add('big')
        // setTimeout((h)=>{
        //     h.classList.remove('big');
        // }, 1200, h1);
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        temp1=document.querySelector(current_page_div)
        document.body.removeChild(temp1);
        //document.querySelector('.active').classList.remove('active');
        current_page=hash;
        current_page_div="#"+current_page+"_div"
        temp2=document.getElementById(current_page)
        var clon2 = temp2.content.cloneNode(true);
         document.body.appendChild(clon2);
        //document.getElementById(hash).classList.add('active');
        console.log(hash)
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.querySelectorAll(".nav-link").forEach((item)=>{
            item.addEventListener('click', app.nav);
         })
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);
function get_current_guest() //fonction pour montrer infos sur guest 
{
    var x=this.id; // aller chcercher info sur ce guest
    console.log(x);

}
// java de sign_up 
function store(){

    var name = document.getElementById('name');
    var email=document.getElementById('email');
    var pw = document.getElementById('pw');
    var repeatpw=document.getElementById('repeat_pw');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
   
    // for(let key in localStorage){
    //     if(key.includes('@')){
    //         let user=JSON.parse(window.localStorage.getItem(key)).name;
    //         console.log(user);
    //         if(user==name.value){
    //             alert('This name is already in use');
    //             return false;
    //         }
    //     }
    // }

    // for(let key in localStorage){
    //     if(key.includes('@')){
    //         console.log(key);
    //         if(key==email.value){
    //             alert('This email is already registered');
    //             return false;
    //         }
    //     }
    // }

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
        // var newDate = new Date();
        // var datetime =newDate.getDate()+'/'+newDate.getMonth()+'-'+newDate.getHours()+':'+newDate.getMinutes();
        // console.log(datetime);
        // var User = {
        //     name:name.value,
        //     pw: pw.value,
        //     datetime: datetime,
        //     score_2048:0,
        //     score_Platformer:0,
        //     number_of_times_played_Platformer:0,
        //     number_of_times_played_2048:0,
        //     tries_left:3

        // };

        // localStorage.setItem(email.value, JSON.stringify(User));
        
        //localStorage.setItem(name.value, pw.value);

        var new_user ={
            type:"user",
            name:name.value,
            mail:email.value,
            password:pw.value
        }
        var new_user_json=JSON.stringify(new_user);

        var fxhttp=new FXMLHttpRequest();
        fxhttp.open("POST","./DB_API.js",true);
        fxhttp.send(new_user_json);
        

        alert('Your account has been created');

    }
}

//checking
function check(){
    //var storedName = localStorage.getItem('name');
    //var storedPw = localStorage.getItem('pw');

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
    fxhttp.open("GET","./DB_API.js",true);
    fxhttp.send(user_to_search_json);
    var rep=fxhttp.onload();
    current_user=rep;
    if(rep!=null){
        // aller page guest
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
        //rester meme page
    }
    
 

}
// java de contact us
const form = document.getElementById("form");
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

//java de guest list page 
//faire les verifiaction des field pas vides
function Add_Guest(){
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
    
    var new_guest ={
        type:"guest",
        last_name:lastname_guest.value,
        first_name:firstname_guest.value,
        mail:mail_guest.value, // id de la personne
        phone_number:phonenumber_guest.value,
        family_member:parseInt(person_number_guest),
        coming:coming_guest,
    }
    var new_guest_json=JSON.stringify(new_guest);

    var fxhttp=new FXMLHttpRequest();
    fxhttp.open("POST","./DB_API.js",true);
    fxhttp.send(new_guest_json);
    var rep=fxhttp.onload();

    var list_guest=document.getElementById("guest_event_list");
    var li = document.createElement("li");
    var item_value = lastname_guest.value+" "+firstname_guest.value+": "+person_number_guest;
    var t = document.createTextNode(item_value);
    li.setAttribute("id",mail_guest.value);
    li.setAttribute('data-target', "details_guest");
    li.classList.add("nav-link");
    li.appendChild(t);
    li.onclick=get_current_guest;
    li.addEventListener('click', app.nav);
    list_guest.appendChild(li);
  
  //document.getElementById("myInput").value = "";
  firstname_guest.value="";
  lastname_guest.value="";
  mail_guest.value="";
  phonenumber_guest.value="";
  person_number_list.value="1";
  com[0].checked=true;

   var span = document.createElement("SPAN");
   var txt = document.createTextNode("\u00D7");
   span.className = "close";
   span.appendChild(txt);
   li.appendChild(span);

   //A arranger rajouter l'event close et event update (a faire rajouter afficher la liste aund la page se charge)

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//     //   var div = this.parentElement;
//     //   div.style.display = "none";
//     var parent = this.parentElement;
//     parent.removeChild(this);

//     }
//   }


    







}


//////

//ds la fonction check de sign_in
  // console.log(userEmail.value)
    //console.log(userPw.value)


    //var storedPw = localStorage.getItem(userName.value);
    //var storedPw = window.localStorage.getItem(userName.value);
    //var obj=JSON.parse(window.localStorage.getItem(userEmail.value));
    //console.log(obj);

    // var userRemember = document.getElementById("rememberMe");

    // console.log(userEmail.value);
    // console.log(userPw.value);
    // console.log(obj);
    
    //     if(userEmail.value != 'undefined' && obj!=null){
        
        
    //             if( userPw.value == obj.pw ){
    //                 localStorage.setItem('current user', userEmail.value);
    //                 var newDate = new Date();
    //                 var datetime = newDate.getDate()+'/'+newDate.getMonth()+'-'+newDate.getHours()+':'+newDate.getMinutes();
    //                 console.log(datetime);
    //                 console.log(obj.name);
    //                 console.log(obj.name.value);
            

    //                 obj.datetime=datetime;
    //                 obj.tries_left = 3;
    //                 console.log(obj.name);
    //                 console.log(obj.datetime);

    //                 localStorage.setItem(userEmail.value, JSON.stringify(obj));
    //                 doc=window.open("home_screen.html");
    //                 doc.write(checkCookie());
                    
    //             }
    //             else{
    //                 if(obj.tries_left>0)
    //                 {
    //                 obj.tries_left = obj.tries_left -1;
    //                 localStorage.setItem(userEmail.value, JSON.stringify(obj));
    //                 alert("Login Failed Now Only "+obj.tries_left+" Login Attempts Available");
    //                 }
    //                 else
    //                 {
    //                 obj.tries_left=0;
    //                 localStorage.setItem(userEmail.value, JSON.stringify(obj));
    //                 alert("Your account is blocked for 30 seconds!")
    //                 setTimeout(check, 10000);
    //                 obj.tries_left = 3;
    //                 localStorage.setItem(userEmail.value, JSON.stringify(obj));
    //                 }
                    
    //                 }
            
        
        
        
    // }
        
    //     else{
    //         alert('Error on login');
            
    //     }