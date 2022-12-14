
const API_KEY = 'api_key=2d4cb4615be1b6d3c9183d0b22f9002f';
const BASE_URL = 'https://api.themoviedb.org/3'
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('main')
const form = document.getElementById('menu-derecha')
const search = document.getElementById('search')
const searchURL = BASE_URL + '/search/movie?' + API_KEY
getMovies(API_URL)

const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" },
{ "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" },
{ "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" },
{ "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" },
{ "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }]

let selectGenre = []
const tagsEl = document.getElementById('tags')



function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMovies(data.results)
    })
}
function setGenere() {
    tagsEl.innerHTML = ''
    console.log(genres)

    genres.forEach(genre => {
        const t = document.createElement('div')
        t.classList.toggle('highlight')
        t.classList.add('tag')
        t.id = genre.id
        t.innerText = genre.name
        t.addEventListener('click', () => {
            t.classList.toggle('highlight')
            if (selectGenre.length == 0) {
                selectGenre.push(genre.id)
            } else {
                if (selectGenre.includes(genre.id)) {
                    selectGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectGenre.splice(idx, 1)
                        }
                    })
                } else {
                    selectGenre.push(genre.id)
                }
            }
            console.log(selectGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectGenre.join(',')));
            selected()
        })
        tagsEl.appendChild(t)

    })
}
setGenere()
function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { id, title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src="${IMG_URL + poster_path}"onclick='openMovie(${id})' alt="${title}">
            <div class="movie-info">
                <h1>${title}</h1>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`
        main.appendChild(movieEl);
    });

}

function openMovie(movieId){
    window.location.href=`movieInfo.html?id=${movieId}`
}

function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 5) {
        return 'yellow'
    }
    else if (vote >= 3) {
        return 'red'
    }
}

form.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = search.value
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm)
    }
    else {
        getMovies(API_URL)
    }
})


function closeSession() {
    window.location.href="../index.html"
    
  }
