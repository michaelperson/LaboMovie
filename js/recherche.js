import { TmdbRequester } from "./requester.js";
const queryString = window.location.search; 

const urlParams = new URLSearchParams(queryString);
const requ = new TmdbRequester(); 
let moviename = urlParams.get('moviename');
let page = urlParams.get('page')==undefined?1:urlParams.get('page');
 

let search= function()
{
   if(moviename!="")
   {
      displayResult.removeAttribute("hidden");
      requ.searchMovie(moviename,page)
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
}
let generatePagination= function(totalPage)
{
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

if(moviename!=undefined) search();