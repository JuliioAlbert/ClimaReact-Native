import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert} from 'react-native'
import { Picker } from '@react-native-community/picker'
const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {

    const { pais, ciudad } = busqueda;

    const [animacionboton] = useState(new Animated.Value(1));

    const consultarClima = ()=>{
        if(pais.trim()===''|| ciudad.trim()===''){
            mostrarAlerta();
            return;
        }

        //consultar la API 
        guardarConsultar(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Agrega una ciudad y una pais para la busqueda',
            [{text: 'Entendido'}]
        )
    }

    const animacionEntrada = () => {
        Animated.spring(animacionboton, {
            toValue: .80
        }).start();
    }
    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            toValue: 1,
            friction: 2,
            tension: 30
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionboton }]
    }


    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        onChangeText={ciudad => guardarBusqueda({ ...busqueda, ciudad })}
                        style={styles.input}
                        placeholder="ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker
                        onValueChange={pais => guardarBusqueda({
                            ...busqueda, pais
                        })}
                        selectedValue={pais}
                        itemStyle={{ height: 120, backgroundColor: "#ffff" }}
                    >
                        <Picker.Item label="---Seleccione un Pais---" value='' />
                        <Picker.Item label="Estados Unidos" value='US' />
                        <Picker.Item label="Mexico" value='MX' />
                        <Picker.Item label="Argentina" value='AR' />
                        <Picker.Item label="Colombia" value='CO' />
                        <Picker.Item label="Costa Rica" value='CR' />
                        <Picker.Item label="España" value='ES' />
                        <Picker.Item label="Peru" value='PE' />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() =>  consultarClima()}
                >
                    <Animated.View 
                    style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center"
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: "center"
    },
    textoBuscar: {
        color: '#fff',
        textAlign: "center",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 18
    }
})
export default Formulario;