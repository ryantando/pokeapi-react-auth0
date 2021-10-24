import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const Card = ({
  id = '', order = '', name = '', image = '', tags = [],
}) => {
  const history = useHistory();
  return (
    <div className="card" role="presentation" onClick={() => history.push(`/${id}`)}>
      <p>{`#${order}`}</p>
      <img
        data-testid="card-image"
        src={image}
        alt="Pokemon"
      />
      <h1 data-testid="card-title">{name}</h1>
      <div className="types">
        {tags.map((a) => (
          <p key={a}>{a}</p>
        ))}
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Card;
