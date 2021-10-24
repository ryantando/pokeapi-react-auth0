import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { fetchPokemon } from '../utils/api';
import pokeballLoading from '../assets/pokeball.gif';

const PokemonDetail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const { getAccessTokenSilently } = useAuth0();

  const getPokemonDetail = async (pokeid) => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const res = await fetchPokemon(token, pokeid);
      setLoading(false);
      setData(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemonDetail(id);
  }, [id]);

  return (
    <>
      <main className="detail">
        <div className="detail-left">
          <Card
            id={Number(data.id)}
            order={data.order || 0}
            image={data?.sprites?.front_default || pokeballLoading}
            name={!loading && data.name ? data.name : 'Loading...'}
            tags={data.types ? data.types.map((a) => (a.type ? a.type.name : '')) : []}
          />
        </div>
        <div className="detail-right">
          <div className="detail-right-images">
            <h2>Images</h2>
            <PokemonImages sprites={data.sprites || []} />
          </div>
          <div>
            <h2>Stats</h2>
            <div className="detail-right-stats">
              {data.stats
                && data.stats.map((stat) => (
                  <div key={stat.stat.name} className="detail-right-stats-item">
                    <p>
                      {stat.stat.name}
                      {' '}
                      {stat.base_stat}
                    </p>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-inner"
                        style={{ width: `${stat.base_stat / 2}%` }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const PokemonImages = React.memo(({ sprites }) => {
  const [spritesList, setSpritesList] = useState([]);

  useEffect(() => {
    const list = sprites
      // eslint-disable-next-line max-len
      ? Object.keys(sprites).filter((a) => sprites[a] && typeof sprites[a] === 'string').map((a) => ({ img: sprites[a], text: a })) : [];
    setSpritesList(list);
  }, [sprites]);

  return (
    <div>
      {spritesList.map((data, i) => (
        <img
          className="img-sprites"
          src={data.img}
          alt={data}
          key={i}
        />
      ))}
    </div>
  );
});

PokemonImages.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  sprites: PropTypes.any.isRequired,
};

export default PokemonDetail;
