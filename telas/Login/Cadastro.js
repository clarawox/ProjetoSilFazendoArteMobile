import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Botao from '../../src/componentes/Botao';
import Texto from '../../src/componentes/Texto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cabecalho from '../../src/componentes/Cabecalho';
import Carrossel from '../../src/mocks/Carrossel';
import axios from 'axios';

const CadastroScreen = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [CEP, setCEP] = useState('');
    const [end, setEnd] = useState('');

    const pegarEnd = () => {
    
        axios.get(`https://viacep.com.br/ws/${CEP}/json/`).then(response => {
            const data = response.data;
            setEnd(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        }).catch(error => {
            console.error('Erro na requisição:', error);
            setEnd('CEP não encontrado');
        });
    };

    async function Cadastrar(nome, email, senha, CEP, end){
        // await AsyncStorage.clear();
        try {
            const userData =[{
                nome:nome,
                email:email,
                senha:senha,
                CEP:CEP,
                end:end
            }]
            const listaUsers = await AsyncStorage.getItem('usuario');
            //console.log(listaUsers)
            
            if (listaUsers !== null) {
                const usersSave = JSON.parse(listaUsers);
                
                usersSave.push({nome:nome, email:email, senha:senha, CEP:CEP, end:end})
                
                const listaUsersAtt = JSON.stringify(usersSave);
                console.log(listaUsersAtt);

                await AsyncStorage.setItem('usuario', listaUsersAtt);
                setNome('');
                setEmail('');
                setSenha('');
                setCEP('');
                setEnd('')
                navigation.navigate('Login');
                console.log(listaUsersAtt)
            } else {
                console.log(userData);
                const listaUsers = JSON.stringify(userData);
                await AsyncStorage.setItem('usuario', listaUsers);
            };
        } catch (error) {
            console.error('Erro ao salvar dados no AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Cabecalho />
            <Texto style={styles.titulo}>{Carrossel.login.cadastro}</Texto>
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
                placeholder="Digite o CEP"
                value={CEP}
                onChangeText={text => setCEP(text)}
                keyboardType="numeric"
            />

            <Botao texto="Buscar Endereço" onPress={pegarEnd} />
            <Text>{end}</Text>

            <Botao texto='Cadastrar' onPress={()=>Cadastrar(nome, email, senha, CEP, end)} />

        </View>
    )
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
});

export default CadastroScreen;
