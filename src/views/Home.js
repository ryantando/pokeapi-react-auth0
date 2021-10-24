import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { fetchPokemon } from '../utils/api';
import pokeballLoading from '../assets/pokeball.gif';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { getAccessTokenSilently, isAuthenticated, loginWithPopup } = useAuth0();

  const getRandomPokemon = async () => {
    try {
      setLoading(true);
      const random = Math.floor(Math.random() * 200) + 1;
      const token = await getAccessTokenSilently();
      const res = await fetchPokemon(token, random);
      setData(res.data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  return (
    <>
      <main className="content">
        {isAuthenticated ? (
          <>
            <button onClick={getRandomPokemon} data-testid="random-btn" type="button" className="random-btn">Get Random</button>
            <Card
              id={Number(data.id)}
              order={data?.order || 0}
              image={data?.sprites?.front_default || pokeballLoading}
              name={!loading && data?.name ? data.name : 'Loading...'}
              tags={data.types ? data.types.map((a) => (a.type ? a.type.name : '')) : []}
            />
          </>
        ) : (
          <>
            <button onClick={() => loginWithPopup({})} type="button" className="random-btn">Log in to get an access</button>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
