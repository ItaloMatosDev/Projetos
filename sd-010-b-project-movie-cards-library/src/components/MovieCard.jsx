import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const { title, subtitle, storyline, imagePath, rating } = movie;
    return (
      <section>
        <img src={ imagePath } alt="" />
        <section>
          <h4>{ title }</h4>
          <h5>{ subtitle }</h5>
          <p>{ storyline }</p>
        </section>
        <Rating rating={ rating } />
      </section>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    imagePath: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};

export default MovieCard;
