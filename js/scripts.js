let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
          pokemonList.push(pokemon);
      } else {
          console.error("Invalid Pokemon object:", pokemon);
      }
  }

  function getAll() {
      return pokemonList;
  }

  function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('#pokemon-list');
      let listPokemonItem = document.createElement('li');
      listPokemonItem.classList.add('list-group-item');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#modal-container');
      listPokemonItem.appendChild(button);
      pokemonListElement.appendChild(listPokemonItem);
      button.addEventListener('click', function () {
          showDetails(pokemon);
      });
  }

  function loadList() {
      return fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              data.results.forEach(item => {
                  let pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                  };
                  add(pokemon);
              });
          })
          .catch(error => {
              console.error('Error loading Pokemon list:', error);
          });
  }

  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url)
          .then(response => response.json())
          .then(details => {
              item.imageUrl = details.sprites.front_default;
              item.height = details.height;
              item.weight = details.weight;
              item.types = details.types.map(type => type.type.name);
              item.abilities = details.abilities.map(ability => ability.ability.name);
          })
          .catch(error => {
              console.error('Error loading Pokemon details:', error);
          });
  }

  function showDetails(pokemon) {
      loadDetails(pokemon).then(() => {
          let modalName = document.getElementById('modal-name');
          let modalHeight = document.getElementById('modal-height');
          let modalWeight = document.getElementById('modal-weight');
          let modalTypes = document.getElementById('modal-types');
          let modalAbilities = document.getElementById('modal-abilities');
          let modalImage = document.getElementById('modal-image');

          modalName.innerText = pokemon.name;
          modalHeight.innerText = `Height: ${pokemon.height} m`;
          modalWeight.innerText = `Weight: ${pokemon.weight} kg`;
          modalTypes.innerText = `Types: ${pokemon.types.join(', ')}`;
          modalAbilities.innerText = `Abilities: ${pokemon.abilities.join(', ')}`;
          modalImage.src = pokemon.imageUrl;

          $('#modal-container').modal('show');
      });
  }

  $('#modal-container').on('hidden.bs.modal', function () {
      // Reset modal content when modal is closed
      let modalName = document.getElementById('modal-name');
      let modalHeight = document.getElementById('modal-height');
      let modalWeight = document.getElementById('modal-weight');
      let modalTypes = document.getElementById('modal-types');
      let modalAbilities = document.getElementById('modal-abilities');
      let modalImage = document.getElementById('modal-image');

      modalName.innerText = '';
      modalHeight.innerText = '';
      modalWeight.innerText = '';
      modalTypes.innerText = '';
      modalAbilities.innerText = '';
      modalImage.src = '';
  });

  $('#modal-container .close-button').on('click', function() {
      hideModal();
  });
  
  function hideModal() {
      $('#modal-container').modal('hide');
  }
  
  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(() => {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
  });
});