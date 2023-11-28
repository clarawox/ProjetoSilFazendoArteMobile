// import React from "react";

// import { View } from "react-native";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StyleSheet } from "react-native";

// import Cabecalho from "../../src/componentes/Cabecalho";

// export default function Cadastro() {
//     return (
//         <View style={styles.container}>
//             <Cabecalho/>
//         </View>
//     )
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: "100%",
//         backgroundColor: "#F2F2F2",
//     },
//     titulo: {
//         paddingTop: 30,
//         paddingBottom: 10,
//         fontSize: 26,
//         fontWeight: "bold",
//         color: '#660066',
//         textAlign: 'center',
//     }
// });

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Botao from '../../src/componentes/Botao';
import Texto from '../../src/componentes/Texto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cabecalho from '../../src/componentes/Cabecalho';

const CadastroScreen = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async () => {
        try {
            // Crie um objeto com os dados a serem salvos
            const userData = { nome, email, senha };

            // Converta o objeto para uma string JSON
            const userDataString = JSON.stringify(userData);

            // Salve os dados no AsyncStorage
            await AsyncStorage.setItem('usuario', userDataString);

            // Limpe os campos após o cadastro
            setNome('');
            setEmail('');
            setSenha('');

            // Navegue para a próxima tela, se desejar
            // navigation.navigate('OutraTela');
        } catch (error) {
            console.error('Erro ao salvar dados no AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Cabecalho/>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="CEP"
                value={cep}
                onChangeText={setCEP}
                secureTextEntry
            />

            <Botao texto='Cadastrar' onPress={handleCadastro} />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Já tem uma conta? Faça login!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    link: {
        marginTop: 16,
        color: 'blue',
        textAlign: 'center',
    },
});

export default CadastroScreen;
