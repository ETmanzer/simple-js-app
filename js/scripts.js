// height in m
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modal = document.getElementById("pokemonModal");
    let modalName = document.getElementById("modalName");
    let modalTypes = document.getElementById("modalTypes");
    let modalHeight = document.getElementById("modalHeight");   

    function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon &&
          "types" in pokemon &&
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

    // function showDetails(pokemon){
    //   console.log("Name: " + pokemon.name);
    //   console.log("Types: " + pokemon.types);
    //   console.log("Height: " + pokemon.height);
    // }

    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
        button.addEventListener('click', function () {
          showDetails(pokemon);
        });
    }
    
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            addListItem(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }

    function loadDetails(pokemon) {
      return fetch(pokemon.detailsUrl).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the pokemon object
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types.map(function(type) {
            return type.type.name;
        });
      }).catch(function (e) {
        console.error(e);
      });
  }

    
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});





// Data gathered from https://pokedex.org/