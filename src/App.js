import React from 'react';
import Header from './components/header/Header';
import Table from './components/table/Table';


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
