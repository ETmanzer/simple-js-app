// height in m
let pokemonList = [
    {name: 'Bulbasaur', type: ['grass','poison'], height: 0.7},
    {name: 'Ivysaur', type: ['grass','poison'], height: 1},
    {name: 'Venosaur', type: ['grass','poison'], height: 2}
];

for (let i=0; i < pokemonList.length; i++){
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
}
// Data gathered from https://pokedex.org/