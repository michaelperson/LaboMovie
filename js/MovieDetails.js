import { TmdbRequester } from "./requester.js";
const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);

let requ = new TmdbRequester(); 
requ.getDetails(urlParams.get('id')).then(md=>
    {
          console.log(md);
          document.getElementById('fullName').innerHTML=md.title;
          document.getElementById('placeofbirth').innerHTML=md.original_title;
          document.getElementById('biography').innerHTML=md.overview;
          document.getElementById('Profile').src=`https://image.tmdb.org/t/p/w500/${md.poster_path}`;
          document.getElementById('birthday').innerHTML=new Date(md.release_date).toLocaleDateString();
          document.getElementById('genre').innerHTML=md.genres.map(g=> g.name).join(", ");
          document.getElementById('vote').innerHTML=md.vote_average+'/10';

          requ.getTrailer(urlParams.get('id')).then(mt=>  document.getElementById('trailer').href=`https://www.youtube.com/embed/${mt}`);

 
          requ.getMovieCredit(urlParams.get('id')).then
        (
            pmc =>
            { 
                
                console.log(pmc)
                for(let i=0; i<pmc.cast.length;i++)
                {
                    document.getElementById("Cast").innerHTML+=htmldiv(pmc.cast[i]);
                }
            }

        );
        
    });
    let htmldiv=function(cast)
    {console.log(cast);
        let html=`
        <div class="col-lg-4  p-5 bg-secondary ">  
                   <h4 class="bg-dark text-primary p-2 m-0">${cast.original_name}</h4>
               
                <div class="d-flex flex-column justify-content-center    px-4">
                    <h5 class="text-uppercase">${cast.character} </h5>
                     <a href="Peopledetails.html?id=${cast.id}">
                     <img  class="img-fluid" src="https://image.tmdb.org/t/p/w500/${cast.profile_path}" alt="" style="width: 250px;">
                     </a>
                    
                </div>
            </div>  
        </div>`;
        return html;
    }