// height in m
let pokemonList = [
    {name: 'Bulbasaur', type: ['grass','poison'], height: 0.7},
    {name: 'Ivysaur', type: ['grass','poison'], height: 1},
    {name: 'Venosaur', type: ['grass','poison'], height: 2}
];

for (let i=0; i < pokemonList.length; i++){
    let result = pokemonList[i].height >= 2 ? ' -Wow, that\'s big!' : '';
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');// have to figure out how to line break
}
// Data gathered from https://pokedex.org/