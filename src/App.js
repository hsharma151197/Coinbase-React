import React from 'react';
import Header from './components/header/Header';
import Table from './components/table/Table';
import './App.css';

class App extends React.Component{

  render(){  
    return(
      <div>
        <Header />
        <Table />
      </div>
    );
  }
}

export default App;
