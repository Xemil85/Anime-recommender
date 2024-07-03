import React from 'react';
import Header from './header';
import Recommender from './Recommender';

function App() {
  return (
    <div className="App">
      <Header title='Anime recommender' />
      <Recommender />
    </div>
  );
}

export default App;
