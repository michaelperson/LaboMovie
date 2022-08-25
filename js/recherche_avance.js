import { TmdbRequester } from "./requester.js";
const queryString = window.location.search; 

const urlParams = new URLSearchParams(queryString);
const requ = new TmdbRequester(); 
let moviename = urlParams.get('moviename');
let safesearch = urlParams.get('SafeSearch')==undefined?false:true;
let genre = urlParams.get('SelGenre');
let page = urlParams.get('page')==undefined?1:urlParams.get('page');
document.getElementById("btnSearch").setAttribute("disabled","disabled");
/*Fill genre*/
requ.getListGenres().then(
    g=>{  
      let mesgenres= g.genres;
       let sel =document.getElementById("SelGenre");

       for(let i=0; i<mesgenres.length;i++)
       {
            let opt = document.createElement("option");
            opt.setAttribute("value", mesgenres[i].id);
            opt.innerHTML=mesgenres[i].name;
            sel.appendChild(opt);
       }
   
       document.getElementById("btnSearch").removeAttribute("disabled");
   });

   let search= function()
   {
       
         displayResult.removeAttribute("hidden");
         if(moviename==undefined || moviename=="")
         {
            requ.searchAdvance(genre,safesearch,page)
            .then(
               s=>{  
                  console.log(s);
                  generatePagination(s.total_pages);
                  nbresult.innerHTML=s.total_results;
                  pagecurrent.innerHTML=`Page ${page} sur ${s.total_pages}`;
                  
                  for(let i=0; i<s.results.length;i++)
                  {
                      document.getElementById("Resultats").innerHTML+=htmldiv(s.results[i]);
                  }
              
              
              });
         }
         else
         {
            requ.searchMovie(moviename,page)
      .then(
         s=>{  
            console.log(s);
            let resultat;
            if(genre!="")
            {
                resultat= s.results.filter(r => {
                    return r.genre_ids.includes(genre);
                  });
                  generatePagination(resultat.length/20);
                  nbresult.innerHTML=resultat.length;
                pagecurrent.innerHTML=`Page ${page} sur ${resultat.length/20}`;
            }
            else
            {
                resultat=s.results;
                generatePagination(s.total_pages);
            nbresult.innerHTML=s.total_results;
            pagecurrent.innerHTML=`Page ${page} sur ${s.total_pages}`;
            }
             
             
            for(let i=0; i<resultat.length;i++)
            {
                 
                document.getElementById("Resultats").innerHTML+=htmldiv(resultat[i]);
            }
        
            if(resultat.length==0)
            {
                document.getElementById("Resultats").innerHTML="<h1>NO RESULT</h1>"
            }
        });
         }
        
      
   }
   let generatePagination= function(totalPage)
   {
    if(totalPage==0)return;
       let prevpage = page-1>0?page-1:0;
       let nextpage = page+1>totalPage?totalPage:totalPage+1;
       let prev= `?moviename=${moviename}&page=${prevpage}`;
       let next= `?moviename=${moviename}&page=${nextpage}`;
    
   
       let html =`<div class="container">
       <ul >
                     <li ><a href="${prev}">«</a></li>
                     <li ><a href="#">1 <span class="sr-only">(current)</span></a></li>
                     <li><a href="?moviename=${moviename}&page=2">2</a></li>
                     <li><a href="?moviename=${moviename}&page=3">3</a></li>
                     <li>...</li> `;
   
   for(let i =totalPage-3;i<=totalPage;i++)
   {
       html+=`<li><a href="?moviename=${moviename}&page=${i}">${i}</a></li> `;
   }
   
      html+=`<li><a href="${next}">»</a></li>
    </ul>
   </div>`;
   document.getElementById('pagination1').innerHTML=html;
   document.getElementById('pagination2').innerHTML=html;
   
   }
   let htmldiv=function(film)
   { 
       let html=`
       <div class="col-lg-4  p-5 bg-secondary ">  
               <h4 class="bg-dark text-primary p-2 m-0">${film.title}</h4>
               <div class="flex-column justify-content-center">
                   <h5 class="text-uppercase">${new Date(film.release_date).toLocaleDateString()} </h5>
                   <a href="Moviedetails.html?id=${film.id}">
                       <img  class="img-fluid" src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="" style="width: 250px; height: 250px;">
                   </a>
                   <div class="flex-column">${film.overview}</div>
                   <br>
                   <a href="Moviedetails.html?id=${film.id}"class="btn btn-primary">
                   Détails
                   </a>  
                  
                    
               </div>
           </div>  
       </div>`;
       return html;
   }
   
   if(genre!="" || moviename!="" ) search();

   /*remettre les infos dans le formulaire après recherhe*/
   if(moviename!=undefined) 
   {
    let textbox= document.getElementById("moviename");
    textbox.value=moviename
   }
   if(safesearch==1)
   {
   document.getElementById("SafeSearch").setAttribute("Checked","checked");
   }