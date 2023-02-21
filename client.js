function showContent() {
    var temp = document.getElementsByTagName("template")[0];
    var clon = temp.content.cloneNode(true);
    document.body.appendChild(clon);
    // var temp1=document.getElementsByTagName("template")[1];
    // var clon1 = temp1.content.cloneNode(true);
    // document.body.appendChild(clon1);
  }
  var current_page=null;
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
          temp1=document.querySelector(current_page)
          document.body.removeChild(temp1);
          current_page='#'+currentPage;
         temp2=document.getElementById(currentPage)
         var clon2 = temp2.content.cloneNode(true);
         document.body.appendChild(clon2);
         console.log(currentPage)
         history.pushState({}, currentPage, `#${currentPage}`);
         document.getElementById(currentPage).dispatchEvent(app.show);
       
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
        // let h1 = ev.target.querySelector('h1');
        // h1.classList.add('big')
        // setTimeout((h)=>{
        //     h.classList.remove('big');
        // }, 1200, h1);
    },
    // poppin: function(ev){
    //     console.log(location.hash, 'popstate event');
    //     let hash = location.hash.replace('#' ,'');
    //     document.querySelector('.active').classList.remove('active');
    //     document.getElementById(hash).classList.add('active');
    //     console.log(hash)
    //     //history.pushState({}, currentPage, `#${currentPage}`);
    //     document.getElementById(hash).dispatchEvent(app.show);
    // }
}

document.addEventListener('DOMContentLoaded', app.init);

// java de sign 
function store(){

    var name = document.getElementById('name');
    var email=document.getElementById('email');
    var pw = document.getElementById('pw');
    var repeatpw=document.getElementById('repeat_pw');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
   
    for(let key in localStorage){
        if(key.includes('@')){
            let user=JSON.parse(window.localStorage.getItem(key)).name;
            console.log(user);
            if(user==name.value){
                alert('This name is already in use');
                return false;
            }
        }
    }

    for(let key in localStorage){
        if(key.includes('@')){
            console.log(key);
            if(key==email.value){
                alert('This email is already registered');
                return false;
            }
        }
    }

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
        var newDate = new Date();
        var datetime =newDate.getDate()+'/'+newDate.getMonth()+'-'+newDate.getHours()+':'+newDate.getMinutes();
        console.log(datetime);
        var User = {
            name:name.value,
            pw: pw.value,
            datetime: datetime,
            score_2048:0,
            score_Platformer:0,
            number_of_times_played_Platformer:0,
            number_of_times_played_2048:0,
            tries_left:3

        };

        localStorage.setItem(email.value, JSON.stringify(User));
        
        //localStorage.setItem(name.value, pw.value);
        alert('Your account has been created');
    }
}

//checking
function check(){
    //var storedName = localStorage.getItem('name');
    //var storedPw = localStorage.getItem('pw');

    var userEmail = document.getElementById('userMail');
    var userPw = document.getElementById('userPw');

    //var storedPw = localStorage.getItem(userName.value);
    //var storedPw = window.localStorage.getItem(userName.value);
    var obj=JSON.parse(window.localStorage.getItem(userEmail.value));
    console.log(obj);

    // var userRemember = document.getElementById("rememberMe");

    // console.log(userEmail.value);
    // console.log(userPw.value);
    // console.log(obj);
    
        if(userEmail.value != 'undefined' && obj!=null){
        
        
                if( userPw.value == obj.pw ){
                    localStorage.setItem('current user', userEmail.value);
                    var newDate = new Date();
                    var datetime = newDate.getDate()+'/'+newDate.getMonth()+'-'+newDate.getHours()+':'+newDate.getMinutes();
                    console.log(datetime);
                    console.log(obj.name);
                    console.log(obj.name.value);
            

                    obj.datetime=datetime;
                    obj.tries_left = 3;
                    console.log(obj.name);
                    console.log(obj.datetime);

                    localStorage.setItem(userEmail.value, JSON.stringify(obj));
                    doc=window.open("home_screen.html");
                    doc.write(checkCookie());
                    
                }
                else{
                    if(obj.tries_left>0)
                    {
                    obj.tries_left = obj.tries_left -1;
                    localStorage.setItem(userEmail.value, JSON.stringify(obj));
                    alert("Login Failed Now Only "+obj.tries_left+" Login Attempts Available");
                    }
                    else
                    {
                    obj.tries_left=0;
                    localStorage.setItem(userEmail.value, JSON.stringify(obj));
                    alert("Your account is blocked for 30 seconds!")
                    setTimeout(check, 10000);
                    obj.tries_left = 3;
                    localStorage.setItem(userEmail.value, JSON.stringify(obj));
                    }
                    
                    }
            
        
        
        
    }
        
        else{
            alert('Error on login');
            
        }

}
// java de sign up