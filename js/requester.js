export class TmdbRequester
{
       
      constructor()
      {
        this.baseUrl="https://api.themoviedb.org/3/";
        this.MovieEndPoint=`${this.baseUrl}movie/`;
        this.DiscoverEndPoint=`${this.baseUrl}discover/`;
        this.TVEndPoint=`${this.baseUrl}tv/`;
        this.ProviderEndpoint=`${this.baseUrl}watch/providers/`;
        this.PersonEndPoint=`${this.baseUrl}person/`; 
        this.SearchMovieEndPoint=`${this.baseUrl}search/movie/`; 
        this.APIKEY="1a85f5aeaf961ae4ee8a30df575d2baa";
      }
      

      request(url)
      {
        let uri = "";
        if(url.includes("?")) uri= `${url}&api_key=${this.APIKEY}`;
        else uri=`${url}?api_key=${this.APIKEY}`
        return fetch(uri)
        .then( response => response.json().then(rep=> { return rep;}) )
        .catch( error => console.log(error.message) )
      }

      getTopRated(page)
      {
        return this.request(`${this.MovieEndPoint}top_rated?page=${page}`)
      }

      getLastMovie(page)
      {
        return this.request(`${this.MovieEndPoint}latest?page=${page}`)
      }

      getUpcoming(page)
      {return this.request(`${this.MovieEndPoint}upcoming?page=${page}`)
        
      }
      getDetails(IdMovie)
      {
        return this.request(`${this.MovieEndPoint}${IdMovie}`)        
      }      

      getTrailer(MovieId)
      {
       return this.request(`${this.MovieEndPoint}${MovieId}/videos`)
        .then( m=>{ return m.results[0].key; }
        )
      }

      getMoviesCount()
      {
        return this.request(`${this.DiscoverEndPoint}movie`)
        .then( m=>{ return m.total_results }
        )
      }
      getTvCount()
      {
        return this.request(`${this.DiscoverEndPoint}tv`)
        .then( m=>{ return m.total_results }
        )
      }

      getProviders()
      {
        return this.request(`${this.ProviderEndpoint}tv`)
        .then( m=>{ return m }
        )
      }

      getPopularPeople()
      {
        return this.request(`${this.PersonEndPoint}popular`)
        .then( m=>{ return m }
        )
      }
      getPeopleDetails(id)
      {
        return this.request(`${this.PersonEndPoint}${id}`)
        .then( m=>{ return m }
        )
      }

      getPeopleMovieCredit(id)
      {
        return this.request(`${this.PersonEndPoint}${id}/movie_credits`)
        .then( m=>{ return m }
        )
      }

      getMovieCredit(id)
      {
        return this.request(`${this.MovieEndPoint}${id}/credits`)
        .then( m=>{ return m }
        )
      }


      searchMovie(moviename,page)
      {
        return this.request(`${this.SearchMovieEndPoint}?query=${moviename}&page=${page}`)
        .then( s=> {return s});
      }
}