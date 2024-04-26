// height in m
window.onload = function() {
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

      function addListItem(pokemon) {
          let pokemonListElement = document.querySelector('#pokemon-list');
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

    function showDetails(pokemon) {
      // Call loadDetails to fetch additional details for the pokemon
      loadDetails(pokemon)
          .then(function () {
              modalName.innerText = "Name: " + pokemon.name;

              // Check if the 'types' property exists and is an array
              if (Array.isArray(pokemon.types) && pokemon.types.length > 0) {
                  modalTypes.innerText = "Types: " + pokemon.types.join(", ");
              } else {
                  modalTypes.innerText = "Types: Unknown";
              }

              modalHeight.innerText = "Height: " + pokemon.height;

              // Clear previous content
              let modalContent = document.querySelector('.modal-content');
              modalContent.innerHTML = ''; // Remove all child elements

              // Create an img element
              let img = document.createElement('img');
              img.src = pokemon.imageUrl; // Set the src attribute to the URL of the pokemon's image
              img.classList.add('pokemon-image'); // Optional: Add a CSS class to style the image if needed

              // Append the img element to the modal content
              modalContent.appendChild(img);
              
              modal.style.display = "block";
          })
          .catch(function (error) {
              console.error(error);
          });

      // Close modal when clicking on the close button
      var closeBtn = document.getElementsByClassName("close")[0];
      closeBtn.onclick = function () {
          modal.style.display = "none";
      }

      // Close modal when clicking outside of it
      window.onclick = function (event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
    }

      function initModal() {
        $('#pokemonModal').modal();
    }

    // Initialize the Bootstrap modal
    initModal();

      return {
          add: add,
          getAll: getAll,
          loadList: loadList,
          loadDetails: loadDetails
      };
  })();

    // Initialize the Bootstrap modal
    $(document).ready(function(){
      $('#pokemonModal').modal();
  });

// Load the list and add list items
  pokemonRepository.loadList().then(function() {
      // Now the data is loaded!
      pokemonRepository.getAll().forEach(function(pokemon){
          pokemonRepository.addListItem(pokemon);
    });
  });
};




// Data gathered from https://pokedex.org/