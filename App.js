
import React, { useState , useEffect} from 'react';
import { Text, View, Keyboard, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import Formulario from './components/Formulario';
import axios from 'axios';
import Clima from './components/Clima';


const App = () => {
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  }

  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  });

  const [resultado, guardarResultado]= useState({});
  const [consultar ,guardarConsultar] = useState(false);
  const [bgcolor, guardarBgcolor]=useState('rgb(71,149,212)')
  const {ciudad, pais} = busqueda;

  useEffect( () => {
    
    const ConsultarAPI = async ()=> {
      if(consultar){
        const API='b66d0f0d924e5018102b218aa1e4d80f';
        const url=`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API}`;

        try{
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado); 
          guardarConsultar(false);

          //modifica los colores de fondo baso en la temperatura 

          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp-kelvin;
          if(actual <10){
            guardarBgcolor('rgb(105,108,149)');
          }else if (actual>=10 && actual <=25){
            guardarBgcolor('rgb(71,149,212)');
          }else{
            guardarBgcolor('rgb(178,28,6)');
          }

        }catch(e){
          mostrarAlerta();
        }
      }
    } 
  
    ConsultarAPI();

  },[consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No se encontro cuidad',
        [{text: 'OK'}]
    )
}

const bgColorApp ={
    backgroundColor: bgcolor
}
  return (

    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado}/>
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
