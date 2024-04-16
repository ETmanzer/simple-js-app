// height in m
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', type: ['grass','poison'], height: 0.7},
        {name: 'Ivysaur', type: ['grass','poison'], height: 1},
        {name: 'Venosaur', type: ['grass','poison'], height: 2}
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
      }
    
    function getAll() {
        return pokemonList;
    }
    
    return {
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.add({name: 'Charmander', type: ['fire'], height: 0.6});

let pokemons = pokemonRepository.getAll();

pokemons.forEach(function(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText='Bulbasaur';
    button.classList.add('button-class');
    pokemonList.appendChild(button);
});





// Data gathered from https://pokedex.org/