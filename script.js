

const API_KEY = "api_key=78066e1ca13de802fc460ee0ef52aec3";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const search_URL = `${BASE_URL}/search/movie?${API_KEY}`;

getMovies(API_URL);  // Pass API_URL to the getMovie function

function getMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
      showMovies(data.results);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

function showMovies(data)
{
    main.innerHTML="";
    data.forEach(movie => {
        const{title , poster_path , vote_average ,  overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =`
        <img src="${IMG_URL+poster_path}" alt="${title}">

        <div id="movie-info">
            <h2>${title}</h2>
             <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            ${overview}
        </div>
        
        `
        main.appendChild(movieEl);
    });
}

function getColor(vote)
{
  if(vote>=8)
  {
    return "green";
  }
  else if(vote>=5)
  {
    return "orange";
  }
  else
  {
    return "red";
  }
}

form.addEventListener('submit', (e)=>
{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm)
    {
        getMovies(search_URL+'&query='+searchTerm);
    }
    else
    {
        getMovies(API_URL);
    }
});