import { TmdbRequester } from "./requester.js";
const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);

let requ = new TmdbRequester(); 
requ.getPeopleDetails(urlParams.get('id')).then(
     mc=>
     {  
        console.log(mc)
        document.getElementById('fullName').innerHTML=mc.also_known_as[0];

        document.getElementById('placeofbirth').innerHTML=mc.place_of_birth;
        
        document.getElementById('Profile').src=`https://image.tmdb.org/t/p/w500/${mc.profile_path}`;
        document.getElementById('biography').innerHTML=mc.biography;
        document.getElementById('birthday').innerHTML=new Date(mc.birthday).toLocaleDateString();
        document.getElementById('deathday').innerHTML=mc.deathday==undefined?'-':new Date(mc.deathday).toLocaleDateString();
        requ.getPeopleMovieCredit(urlParams.get('id')).then
        (
            pmc =>
            { 
                
                console.log(pmc)
                for(let i=0; i<pmc.cast.length;i++)
                {
                    document.getElementById("Filmographie").innerHTML+=htmldiv(pmc.cast[i]);
                }
            }

        );
     }
);

let htmldiv=function(cast)
{console.log(cast);
    let html=`
    <div class="col-lg-4  p-5 bg-secondary ">  
               <h4 class="bg-dark text-primary p-2 m-0">${cast.original_title}</h4>
           
            <div class="d-flex flex-column justify-content-center    px-4">
                <h5 class="text-uppercase">${cast.character} </h5>
                 <a href="Moviedetails.html?id=${cast.id}">
                 <img  class="img-fluid" src="https://image.tmdb.org/t/p/w500/${cast.poster_path}" alt="" style="width: 250px; height: 250px;">
                 </a>
                
            </div>
        </div>  
    </div>`;
    return html;
}