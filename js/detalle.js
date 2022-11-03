const contenedor = document.querySelector('#app');
const servidor = 'https://pokeapi.co/api/v2/pokemon/';
const idPokemon = location.search.slice(4);
let tipos = '';
let stat = '';
let botonera = '';

let historial = [];

if (localStorage.historial) {
    historial = JSON.parse(localStorage.historial);
} 

if (idPokemon) {
const endPoint = servidor+ idPokemon ;
fetch( endPoint )
    .then( respuesta => {
        return respuesta.json();
    })
    .then( respuestaJSON => {
        let datos = respuestaJSON;
        renderizar(datos);
    })
} else {
    
    const muestraHistorial = document.getElementById('mustra-historial');
    let listaHistorial = '';
    historial.forEach(entrada => {
        listaHistorial+= `<li>${entrada}</li>`;
    })
    muestraHistorial.innerHTML = `<ul>${listaHistorial}</ul>`;

}

function renderizar(pokemon){

    pokemon.types.forEach(tipo => {
        tipos += `${Traducir(tipo.type.name)} `
    })

    pokemon.stats.forEach(statPokemon => {
        stat += `<li>${Traducir(statPokemon.stat.name)}: ${statPokemon.base_stat}</li>`
    })

    if (parseInt(pokemon.id)-1) {
        botonera += `<a href="detalles.html?id=${parseInt(pokemon.id)-1}">Anterior</a>`
    } else {
        botonera += `Primer Pokemon`
    }

    if (parseInt(pokemon.id)+1 < 152) {
        botonera += `<a href="detalles.html?id=${parseInt(pokemon.id)+1}">Siguiente</a>`
    } else {
        botonera += `Último Pokemon`
    }
    

    let html = `<h2>${NombreMayuscula(pokemon.name)}</h2>`

    html += `<div class="btn-siguiente-anterior">${botonera}</div>
            <div class="card-pokemon ${pokemon.types[0].type.name}-type">
                <img src="${pokemon.sprites.other.home.front_default}" alt="Imagen de ${NombreMayuscula(pokemon.species.name)}">
                <h3>${NombreMayuscula(pokemon.name)}</h3>
                <div class="datos-pokemon">
                    <div class="datos-generales">
                        <div class="tipo">
                            <p>Tipo: ${tipos}</p> 
                        </div>  
                        <p>Altura: ${Fraccion(pokemon.height)} m</p>      
                        <p>Peso: ${Fraccion(pokemon.weight)} kg</p>
                    </div>
                    <div class="estadisticas-combate">
                        <p>Estadísticas de Combate:</p>
                        <ul>${stat}</ul>
                    </div>
                </div>
            </div>`;
    
    document.title = 'Detalles de ' + NombreMayuscula(pokemon.name);
    contenedor.innerHTML = html;

    historial.push(NombreMayuscula(pokemon.name));
    localStorage.historial = JSON.stringify(historial);
};

function NombreMayuscula(nombre) {
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    return nombre;
}

function Fraccion(numero) {
    const fraccionar = numero / 10;
    return fraccionar;
}

function Traducir(palabraIngles) {
    switch (palabraIngles) {
        case 'bug':
            return 'Bicho';
            break
        case 'normal':
            return 'Normal';
            break;
        case 'dragon':
            return 'Dragón';
            break;
        case 'electric':
            return 'Eléctrico';
            break;
        case 'fairy':
            return 'Hada';
            break;
        case 'fighting':
            return 'Lucha';
            break;
        case 'fire':
            return 'Fuego';
            break;
        case 'flying':
            return 'Volador';
            break;
        case 'ghost':
            return 'Fantasma';
            break;
        case 'grass':
            return 'Planta';
            break;
        case 'ground':
            return 'Tierra';
            break;
        case 'ice':
            return 'Hielo';
            break;
        case 'poison':
            return 'Veneno';
            break;
        case 'psychic':
            return 'Psíquico';
            break;
        case 'rock':
            return 'Roca';
            break;
        case 'steel':
            return 'Acero';
            break;
        case 'water':
            return 'Agua';
            break;
        case 'dark':
            return 'Siniestro';
            break;
        case 'hp':
            return 'Puntos de Salud';
            break;
        case 'attack':
            return 'Ataque';
            break;
        case 'defense':
            return 'Defensa';
            break;
        case 'special-attack':
            return 'Ataque Especial';
            break;
        case 'special-defense':
            return 'Defensa Especial';
            break;
        case 'speed':
            return 'Velocidad';
            break;
    }
}