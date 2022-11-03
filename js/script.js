const contenedor = document.querySelector('#app');
const servidor = 'https://pokeapi.co/api/v2/';

const endPoint = servidor + 'pokemon?limit=151&offset=0';

fetch( endPoint )
.then( respuesta => {
    return respuesta.json();
})
.then( respuestaJSON => {
    let datos = respuestaJSON.results;
    renderizar(datos);
})

function renderizar(lista){
  
  lista.forEach(pokemon => {

    let html = '';

    fetch( pokemon.url )
    .then( respuesta => {
        return respuesta.json();
    })
    .then( respuestaJSON => {
        let imagen = respuestaJSON.sprites.front_default;
        html = `<div class="card">
                  <h3><a href="detalles.html?id=${pokemon.name}">${NombreMayuscula(pokemon.name)}</a></h3>
                  <a href="detalles.html?id=${pokemon.name}"><img src="${imagen}" alt="Imagen de ${NombreMayuscula(pokemon.name)}"></a>
                </div>`;

        contenedor.innerHTML += html;
      })
  });
}

function NombreMayuscula(nombre) {
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    return nombre;
}

function Busqueda() {

    let campoBusqueda = document.getElementById('campoBusqueda');
    let inputBusqueda = campoBusqueda.value.toUpperCase();
    let cards = contenedor.getElementsByClassName('card');
    
    for (let card of cards) {
      let h3 = card.querySelector('h3');
      h3 = h3.textContent.toUpperCase();
      
      if (h3.includes(inputBusqueda)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    }
  }