import React, { Component } from 'react';
import HomeComponent from "./HomeComponent";
import '../css/commom.css';
import Footer from "./Footer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeComponent/>
        <Footer/>
      </div>
    );
  }
}

export default App;
