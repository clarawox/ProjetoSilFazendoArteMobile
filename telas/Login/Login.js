import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Botao from '../../src/componentes/Botao';
import Texto from '../../src/componentes/Texto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cabecalho from '../../src/componentes/Cabecalho';
import Carrossel from '../../src/mocks/Carrossel';
import { Alert } from 'react-native';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const Logar = async () => {
        try {
            const usersString = await AsyncStorage.getItem('usuario');
            const users = usersString ? JSON.parse(usersString):[];

            const userFind = users.find(
                (user)=>user.email === email && user.senha === senha
            );

            if (userFind){
                navigation.navigate('Produtos');
                setEmail('');
                setSenha('');
            } else {
                Alert.alert('Login Inválido', 'Email e/ou senha incorretos, favor verificar e tente novamente :)')
            }
        } catch (error) {
            console.error('Erro ao encontrar dados no AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Cabecalho />
            <Texto style={styles.titulo}>{Carrossel.login.login}</Texto>
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

            <Botao texto='Login' onPress={Logar} />
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Texto style={styles.link}>Ainda não tem uma conta? Cadastre-se!</Texto>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#F2F2F2",
    },
    titulo: {
        paddingTop: 30,
        paddingBottom: 10,
        fontSize: 26,
        fontWeight: "bold",
        color: '#660066',
        textAlign: 'center',
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
        color: 'purple',
        textAlign: 'center',
    },
});

export default Login;
