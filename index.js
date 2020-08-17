new Vue({
  el: '#app',
  data: {
    pokedex: [],
    title: 'Vue Pokedex',
    kantoUrl: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=151',
    johtoUrl: 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100',
    hoennUrl: 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135',
    lastRegionClicked: '',
  },

  methods: {
    getPokedex(url) {
      if (this.lastRegionClicked === url) {
        return;
      } else {
        this.pokedex = [];
      }
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          data.results.forEach((pokemon) => {
            this.getPokemonUrl(pokemon.url);
          });
        });
      this.lastRegionClicked = url;
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
