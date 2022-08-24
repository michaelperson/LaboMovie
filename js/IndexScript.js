import { TmdbRequester } from "./requester.js";

var FirstTopRated= function()
{
    let requ = new TmdbRequester(); 
    requ.getTopRated(1)
    .then( top =>
               { 
                document.getElementById("Hero-title").innerHTML=top.results[0].original_title;
                document.getElementById("Hero-Release").innerHTML=new Date(top.results[0].release_date).toLocaleDateString("fr-be");
                document.getElementById("Hero-Rating").innerHTML=top.results[0].vote_average+'/10';
                document.getElementsByClassName("hero-header")[0].style.backgroundImage=`url(https://image.tmdb.org/t/p/w500${top.results[0].poster_path})`;
                requ.getTrailer(top.results[0].id).then
                      (
                        video =>
                        { 
                            document.getElementById("Hero-trailer").setAttribute("data-src",`https://www.youtube.com/embed/${video}`);
                        }
                      )
               } ); 
    

}

var Upcomings = function()
{
    let requ = new TmdbRequester(); 
    requ.getUpcoming(1).then(up=>
    {
        let upMovies = up.results;
        for (let i = 0; i < 4; i++)
        {
            requ.getDetails(upMovies[i].id).then(upMovie=>
                {
                     
  let htmlToAdd= `<div class="row gx-5 m-5">
            <div class="col-lg-5 mb-5 mb-lg-0" style="min-height: 400px;">
                <div class="position-relative h-100">
                    <img class="position-absolute w-100 h-100" src="https://image.tmdb.org/t/p/w500${upMovie.poster_path}" style="object-fit: cover;">
                </div>
            </div>
            <div class="col-lg-6 pb-5">
                <h4 class="mb-4">${upMovie.title}</h4>
                <p class="mb-5">${upMovie.overview}</p>
                <div class="row g-5">
                    <div class="col-sm-6">
                        <div class="d-flex align-items-center justify-content-center bg-primary border-inner mb-4" style="width: 90px; height: 90px;">
                            <i class="fa fa-tags fa-2x text-white"></i>
                        </div>
                        <h4 class="text-uppercase">${upMovie.genres.map(g=> g.name).join(", ")}</h4>
                    </div>
                    <div class="col-sm-6">
                        <div class="d-flex align-items-center justify-content-center bg-primary border-inner mb-4" style="width: 90px; height: 90px;">
                            <i class="fa fa-vote-yea fa-2x text-white"></i>
                        </div>
                        <h4 class="text-uppercase">${upMovie.vote_average}/10</h4>
                        </div>
                </div>
            </div>
        </div>`;
        document.getElementById("upcomingResults").innerHTML=document.getElementById("upcomingResults").innerHTML+htmlToAdd;
            
                });
          
        }
    });
    

}

var GetStats= function()
{
    let requ = new TmdbRequester(); 
    requ.getMoviesCount().then( mc=> document.getElementById("nbfilms").innerHTML=mc);
     
    requ.getTvCount().then( mc=> document.getElementById("nbTv").innerHTML=mc);

    requ.getProviders().then(mc=>document.getElementById("nbProviders").innerHTML=mc.results.length);
}


//Bannière
FirstTopRated();
//Upcoming
Upcomings();

//Stats
GetStats();