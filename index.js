new Vue({
  el: '#app',
  data: {
    pokedex: [],
  },

  methods: {
    getPokedex() {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((res) => res.json())
        .then((data) => {
          data.results.forEach((pokemon) => {
            this.getPokemonUrl(pokemon.url);
          });
        });
    },

    getPokemonUrl(pokemonUrl) {
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then((data) => {
          this.pokedex.push({ name: data.name, id: data.id });
          this.pokedex.sort((a, b) => (a.id > b.id ? 1 : -1));
        });
    },

    // sortPokemon(pokedex) {
    //   this.sortedPokemon = pokedex.sort((a, b) => (a.id < b.id ? 1 : -1));
    // },
  },
});
