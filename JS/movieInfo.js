const API_KEY = 'api_key=2d4cb4615be1b6d3c9183d0b22f9002f';
const BASE_URL = 'https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
let buscador = window.location.search
let parametros = new URLSearchParams(buscador)
let obtenerId = parametros.get('id')
const main = document.getElementById('main')
const API_URL = BASE_URL + "/movie/" + obtenerId + "?" + API_KEY
let nameGenres = [];
let nameActors = [];


function detailsMovie() {
   
        axios.get(BASE_URL + "/movie/" + obtenerId + "?" + API_KEY)
        .then((response) => {
            let details = response.data;
            let arrayData = [details];

            arrayData.forEach(object => {
                const { title, genres, overview, vote_average } = object;
                genres.forEach(e => {
                    nameGenres.push(` ${e.name}`)
                })

                let imagen = object.poster_path;
                let imagenPeli = IMG_URL + imagen
                const movieEl = document.createElement('div');
                movieEl.innerHTML = `
               
            
    <div class="contenedor">
    
             <div class="container-movie"> 
                <img id=img src="${imagenPeli}" alt=""> 
             </div>
            <div class="contenedor-info">
          <h1>${title}</h1>
          <div class="contenedor-description">
          <h3 class="average">Vote average</h3> 
          <div class="contenedor-circulo">
         <span id="circulo">${vote_average.toFixed(1)}</span>
         </div>
         
            <h3>Overview</h3>
            ${overview}
      
   
        <h3>Genres</h3> 
        ${nameGenres}
        <h3>Actors</h3>
        <p id="nameActors"></p
            </div
            </div>
        </div
    </div>
          `
                main.appendChild(movieEl);
            });
        })
        .catch((error) => {
            console.log("Tu error: ", error);
        })
        .finally(() => {
        });
}

detailsMovie()

function getCast(url) {
    
       axios.get(url)
        .then((response) => {
            let actors = response.data.cast
            actors.forEach(e => {
                nameActors.push(` ${e.name}`)
                document.getElementById("nameActors").innerHTML = nameActors
            })
        })
        .catch((error) => {
            console.log("Tu error: ", error);
        })
        .finally(() => {
            console.log(123);
        });
}
getCast(BASE_URL + "/movie/" + obtenerId + "/" + "credits" + "?" + API_KEY)

function volver() {
    window.location.href = 'pagina-principal.html'
}


function closeSession() {
    window.location.href="../index.html"
    
  }
