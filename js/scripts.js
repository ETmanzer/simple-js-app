// height in m
let pokemonRepository = (function() {
  let  apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let pokemonListElement = document.getElementById('pokemon-list');
  let pokemonModal = document.getElementById('pokemonModal');
  let modalName = document.getElementById('modalName');
  let modalHeight = document.getElementById('pokemonModalHeight');
  let modalWeight = document.getElementById('pokemonModalWeight');
  let modalTypes = document.getElementById('pokemonModalTypes');
  let modalAbilities = document.getElementById('pokemonModalAbilities');

  function fetchPokemonList() {
      return fetch(apiUrl)
          .then(response => response.json())
          .then(data => data.results);
  }

  function fetchPokemonDetails(url) {
      return fetch(url)
          .then(response => response.json());
  }

  function displayPokemon(pokemon) {
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary', 'ml-2', 'mb-2');
      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);

      button.addEventListener('click', function() {
          showPokemonDetails(pokemon);
      });
  }

  function showPokemonDetails(pokemon) {
      modalName.innerText = pokemon.name;

      fetchPokemonDetails(pokemon.url)
          .then(data => {
              modalHeight.innerText = `Height: ${data.height}`;
              modalWeight.innerText = `Weight: ${data.weight}`;

              let types = data.types.map(type => type.type.name).join(', ');
              modalTypes.innerText = `Types: ${types}`;

              let abilities = data.abilities.map(ability => ability.ability.name).join(', ');
              modalAbilities.innerText = `Abilities: ${abilities}`;

              $('#pokemonModal').modal('show');
          });
  }

  return {
      fetchPokemonList: fetchPokemonList,
      displayPokemon: displayPokemon
  };
})();

// Load the Pokemon list and display it
pokemonRepository.fetchPokemonList()
  .then(pokemonList => {
      pokemonList.forEach(pokemon => {
          pokemonRepository.displayPokemon(pokemon);
      });
  })
  .catch(error => {
      console.error('Error fetching Pokemon:', error);
  });


return {
      //   add: add,
      //   getAll: getAll,
      //   addListItem: addListItem,
      //   loadList: loadList,
      //   loadDetails: loadDetails,
      //   showDetails: showDetails,
      // };

// Data gathered from https://pokedex.org/