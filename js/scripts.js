// height in m
let pokemonList = [
    {name: 'Bulbasaur', type: ['grass','poison'], height: 0.7},
    {name: 'Ivysaur', type: ['grass','poison'], height: 1},
    {name: 'Venosaur', type: ['grass','poison'], height: 2}
];

for (let i=0; i < pokemonList.length; i++){
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')</p>');// have to figure out how to line break
    if (pokemonList[i].height > 1) {
        document.write(pokemonList[i].height + ' Wow, that\'s big!')
    }
}
// Data gathered from https://pokedex.org/