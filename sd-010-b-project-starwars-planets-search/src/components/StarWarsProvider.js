import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [planetNames, setplanetNames] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [filterNumber, setFilterNumber] = useState({
    name: '',
    number: 0,
    column: 'population',
    comparison: 'maior que',
  });

  const fetchAPI = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/?format=json')
      .then((response) => response.json())
      .then((resp) => setplanetNames(resp.results));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleInputSearch = (event) => {
    setNameSearch(event.target.value);
    // const aux = planetNames;
    // console.log(aux);
    // console.log(planetNames);
    // planetNames.filter((planet) => {
    // const name = planet.name.toLowerCase();
    // const input = event.target.value.toLowerCase();
    // return
    // console.log(event.target.value.name.includes(nameSearch));
    // };
    // return planetNames.filter((filter) => filter.name.includes(nameSearch));
    // setplanetNames(planetsSearch);
    // if (nameSearch === '' || planetsSearch === []) {
    //   setplanetNames(aux);
    // }
    // const filterByName = {
    //   name: event.target.value,
    // };

    // setFilter({ ...filter, filterByName });
    // setplanetNames(planetsSearch);
    // setPlanetsFiltered(planetsSearch);
  };

  const handleButtonFilter = () => {
    const { number, column, comparison } = filterNumber;

    const filteredNumbers = planetNames.filter((planet) => {
      // retorna os planetas de acordo com o filtro selecionado

      switch (comparison) {
      case 'maior que':
        return parseInt(planet[column], 10) > parseInt(number, 10);
      case 'menor que':
        return parseInt(planet[column], 10) < parseInt(number, 10);
      case 'igual a':
        return parseInt(planet[column], 10) === parseInt(number, 10);
      default:
        return 0;
      }
    });
    setplanetNames(filteredNumbers);
  };

  const changeColumnFilter = ({ target: { name, value } }) => {
    setFilterNumber({
      ...filterNumber,
      [name]: value,
    });
  };

  const filterNameSearch = () => (
    planetNames.filter((filter) => filter.name.includes(nameSearch)));

  const values = {
    planetNames,
    handleInputSearch,
    handleButtonFilter,
    changeColumnFilter,
    filterNameSearch,
    filters: {
      filterByName: {
        name: nameSearch,
      },
    },
    filterByNumericValues: [
      {
        column: 'population',
        comparison: 'maior que',
        value: '100000',
      },
      {
        column: 'diameter',
        comparison: 'menor que',
        value: '8000',
      },
    ],
  };

  return (
    <div>
      <StarWarsContext.Provider value={ values }>
        {children}
      </StarWarsContext.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
