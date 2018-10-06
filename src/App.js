import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
//npm i -D react-country-region-selector
import {CountryDropdown} from 'react-country-region-selector';
//$ npm install --save react-credit-card-input
import CreditCardInput from 'react-credit-card-input';
//npm install --save react-credit-cards
import Cards from 'react-credit-cards';

class App extends Component {

    container = null;
    state = {
      nombre: '',
      email: '',
      pais: '',
      tipo: '',
      cardNum: '',
      cardExp: '',
      cardCvv: '',
      error: false,
      completo: false,
    };
    
  cambiarTipo = (tipo) => {this.setState({tipo})}

  validarDatos = () => {
    const {tipo, nombre, email, pais} = this.state;
    this.ocultarError();

    if (nombre.length < 4 || nombre.indexOf(' ') === -1) {
      this.mostrarError();
      return;
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1){
      this.mostrarError();
      return;
    }
    if (pais === ''){
      this.mostrarError();
      return;
    }
    this.crearUsuario();
  }
  ocultarError = () => {
    this.setState({ error: false })
  }
  mostrarError = () => {
    this.setState({ error: true })
  }

  crearUsuario = () => {
  fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(this.state), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => this.setState({completo: true}));
  }
  
  render() {
    const {error, tipo, nombre, email, pais, cardNum, cardExp, cardCvv, completo } = this.state;
        
    if (completo){
      return(<div className="CartelFinal">Cuenta creada con éxito</div>)
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Elegí tu opción:</h1>
        </header>
        {(error) && <div class='error'>Verificar los datos ingresados</div>}
        <p className="App-intro">

        <Button variant="contained" onClick={() => this.cambiarTipo('free')}>
        Free
        </Button>
        <Button variant="contained" color="secondary" onClick={() => this.cambiarTipo('premium')}>
        Premium for only $10
        </Button>
  
    {(tipo!="") &&
    <div>
           <form class='letra'>
                <h2>Datos personales</h2>
                Nombre y Apellido:
                <input nombre onChange={(event) => this.setState({ nombre: event.target.value })}></input>
                Email:
                <input email onChange={(event) => this.setState({ email: event.target.value })}></input>
                País: <CountryDropdown onChange={(pais) => this.setState({ pais })} value={pais}></CountryDropdown>
                </form>
                <br></br>
    </div>
    }

  {(tipo==="premium") &&
    <div class='tarjeta'>
  <h2>Datos de tarjeta de crédito</h2>
  <CreditCardInput cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
      <input {...props} onChange={handleCardCVCChange(e => this.setState({ cardCvv: e.target.value }))}/>)}
    cardExpiryInputRenderer={({handleCardExpiryChange,props}) => (
      <input {...props} onChange={handleCardExpiryChange(e => this.setState({ cardExp: e.target.value }))}/>)}
    cardNumberInputRenderer={({handleCardNumberChange,props}) => (
      <input {...props} onChange={handleCardNumberChange(e => this.setState({ cardNum: e.target.value }))}/>)}/></div>
   }

  {(tipo==="premium" || tipo==="free") &&
    <Button variant="contained" size= "large" color="primary" onClick={() => this.validarDatos()}>
      Crear Cuenta
      </Button>
  }
        </p>
      </div>
    );
  }
}
export default App;
