
import './App.css';
import {Button} from 'reactstrap';

import Navigation from './components/Navigation';
import { Component } from 'react';
import Login from './components/Login';
import Registro from './components/Registro';
import Home from './pages/Home';
import FormularioCrear from './pages/FormularioCrear';
import Libros from './pages/Libros';
import Autor from './pages/Autor';
import Genero from './pages/Genero';
import Editorial from './pages/Editorial';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



class App extends Component {
  constructor() {
    //Heredar toda la funcionalidad que trae el componente de react
    super();
   
  }
  


  render(){

    return (
  
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home}/>  
            <Route path="/autor" component={Autor}/>
            <Route path="/genero" component={Genero}/>
            <Route path="/editorial" component={Editorial}/>
            <Route path="/libros" component={Libros}/>
          </Switch>
        </Router>
          
        <Login/>
        <Registro/>
      </>
          
   
    );
  }
}

export default App;
