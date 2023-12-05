import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Botao from '../../src/componentes/Botao';
import Texto from '../../src/componentes/Texto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cabecalho from '../../src/componentes/Cabecalho';
import Carrossel from '../../src/mocks/Carrossel';
import { Camera, CameraType } from 'expo-camera';
import axios from 'axios';

const CadastroScreen = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [camera, setCamera] = useState(false);
    const [image, setImage] = useState(null);
    const [CEP, setCEP] = useState('');
    const [end, setEnd] = useState('');
    const [reg, setReg] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = React.useRef(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Texto style={{ textAlign: 'center', fontSize: 24, marginVertical: 25 }}>Por favor, autorize a utilização da sua câmera.</Texto>
                <TouchableOpacity style={{ backgroundColor: 'black', width: 150, borderRadius: 15, padding: 10 }} onPress={requestPermission} />
            </View >
        );
    }

    const tirarFoto = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            console.log("tirou foto");
            setCapturedImage(uri);
            console.log(uri);
            //Guarda a imagem no AsyncStorage
            await AsyncStorage.setItem('Foto', uri);

            setCamera(false);
        }
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const inverteExpandir = () => {
        setCamera(!camera);
    };

    const pegarEnd = () => {

        axios.get(`https://viacep.com.br/ws/${CEP}/json/`).then(response => {
            const data = response.data;
            setEnd(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        }).catch(error => {
            console.error('Erro na requisição:', error);
            setEnd('CEP não encontrado');
        });
    };

    async function Cadastrar(img, nome, email, senha, CEP, end) {
        // await AsyncStorage.clear();
        try {
            const userData = [{
                img: img,
                nome: nome,
                email: email,
                senha: senha,
                CEP: CEP,
                end: end
            }]

            const listaUsers = await AsyncStorage.getItem('usuario');
            //console.log(listaUsers)

            if (listaUsers !== null) {
                const usersSave = JSON.parse(listaUsers);

                usersSave.push({ img: img, nome: nome, email: email, senha: senha, CEP: CEP, end: end })

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

        return <>
            {!camera && <Cabecalho />}
            {camera &&
                <View style={estilos.container}>
                    <Camera style={estilos.camera} type={type} ref={cameraRef}>
                        <BackButton acao={inverteExpandir} color={'white'}></BackButton>
                        <View style={estilos.test}>
                            <View style={estilos.buttonContainer}>
                                <TouchableOpacity style={estilos.button} onPress={toggleCameraType}>
                                    <AntDesign name="retweet" size={40} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={estilos.botaoFoto} onPress={tirarFoto}>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Camera>
                </View>
            }
            {!reg && !camera &&
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

                <Botao texto='Cadastrar' onPress={()=>{Cadastrar(img, nome, email, senha, CEP, end), setReg(True)}}/>
            </View>}
        </>
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
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        camera: {
            flex: 1,
        },
        buttonContainer: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            margin: 64,
        },
        button: {
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
        }
    });
}
export default CadastroScreen;
