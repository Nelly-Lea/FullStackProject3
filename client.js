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

// java de sign up