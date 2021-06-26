import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './components/StarWarsProvider';

function App() {
  return (
    <Provider>
      <section>
        <h1>Star Wars Planets Search</h1>

        <Table />
      </section>
    </Provider>
  );
}

export default App;
