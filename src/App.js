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
//npm i card-validator
//import 'card-validator/src/card-number.js'; calculo q no va
//import cardNumber from 'card-validator/src';
//import cvv from 'card-validator/src';
//import expirationDate from 'card-validator/src';
//import expiracionMonth from 'card-validator/src';
//import expiracionYear from 'card-validator/src';

//https://www.npmjs.com/package/card-validator  

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
    };
    /*
    <CreditCardInput
  cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
  cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
  cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
  fieldClassName="input"
/>*/

  cambiarTipo = (tipo) => {this.setState({tipo})}

  validarDatos = () => {
    const {tipo, nombre, email, pais, numeroTarjeta, fechaVencimiento, cvv } = this.state;

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

   /* var valid = require('card-validator');
 
var numberValidation = valid.number('4111');
 
if (!numberValidation.isPotentiallyValid) {
  renderInvalidCardNumber();
}
 
if (numberValidation.card) {
  console.log(numberValidation.card.type); // 'visa'
}
*/

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
.then(response => console.log('Success:', response));
  }
  
  render() {
    const {error, tipo, nombre, email, pais, cardNum, cardExp, cardCvv } = this.state;
        
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
      <input {...props} onChange={handleCardNumberChange(e => this.setState({ cardNum: e.target.value }))}/>)}/>
  <Cards number={this.state.cardNum} name={this.state.nombre} expiry={this.state.cardExp} cvc={this.state.cvc} focused={0} /></div>
        
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
/*
function validate(values) {
  const errors = {};

  if (!values.username) errors.username = 'Ingresa un nombre de usuario';

  if (!values.email) errors.email = 'Ingresa tu correo';

  if (!values.password) errors.password = 'Ingresa una contraseña';

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Ingresa una contraseña';
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = 'Las contraseñas no coinciden';
  }

  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes form is invalid
  return errors;
}*/
