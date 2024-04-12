// height in m
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', type: ['grass','poison'], height: 0.7},
        {name: 'Ivysaur', type: ['grass','poison'], height: 1},
        {name: 'Venosaur', type: ['grass','poison'], height: 2}
    ];

    pokemonList.forEach(function(pokemon) {
        document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')</p>');
    });
})();
// Data gathered from https://pokedex.org/