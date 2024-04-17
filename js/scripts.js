// height in m
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
       

    function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon &&
          "type" in pokemon &&
          "height" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
    }
    
    function getAll() {
        return pokemonList;
    }

    function showDetails(_pokemon){
        console.log();
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', showDetails);
    }
    
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

pokemonRepository.add({name: 'Charmander', type: ['fire'], height: 0.6});

console.log(pokemonRepository.getAll());
  
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});





// Data gathered from https://pokedex.org/