const axios = require('axios');

const fetchPokemon = async (pokemon) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  return response.data;
};

const getPokemonDetail = async (req, res) => {
  try {
    const { id = '' } = req.params;
    if (!id) throw new Error('Please pass id')``;
    const data = await fetchPokemon(id);
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = {
  getPokemonDetail,
};
