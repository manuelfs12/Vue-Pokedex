new Vue({
  el: '#app',
  data: {
    pokedex: [],
    title: 'Vue Pokedex',
    kantoUrl: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
  },

  methods: {
    getPokedex(url) {
      if (this.pokedex.length > 0) {
        this.pokedex = [];
      }
      fetch(url)
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
          this.pokedex.push({
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
          });
          this.pokedex.sort((a, b) => (a.id > b.id ? 1 : -1));
        });
    },
  },
});
