import { TmdbRequester } from "./requester.js";
var GetPopular= function()
{
    let requ = new TmdbRequester(); 
    requ.getPopularPeople().then(
         mc=>
         {  
    
            for(let i=0; i<mc.results.length;i++)
            {
                let profile_path= mc.results[i].profile_path;
                let id= mc.results[i].id;
                let fullName= mc.results[i].name;
                let department= mc.results[i].known_for_department;
                let html = `<div class="col-lg-4 col-md-6">
                <div class="team-item">
                    <div class="position-relative overflow-hidden">
                        <img class="img-fluid w-100" src="https://image.tmdb.org/t/p/w500/${profile_path}" alt="">
                        <div class="team-overlay w-100 h-100 position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center">
                            <div class="d-flex align-items-center justify-content-start">
                                <a class="btn btn-lg btn-primary btn-lg-square border-inner rounded-0 mx-1" href="Peopledetails.html?id=${id}"><i class="fa fa-info"></i></a> 
                            </div>
                        </div>
                    </div>
                    <div class="bg-dark border-inner text-center p-4">
                        <h4 class="text-uppercase text-primary">${fullName}</h4>
                        <p class="text-white m-0">${department}</p>
                    </div>
                </div>
            </div>`;
                document.getElementById("Galpopular").innerHTML+=html;
            }
   
         }

    );
     
}

GetPopular();