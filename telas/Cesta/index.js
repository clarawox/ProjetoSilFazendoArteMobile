import { React, useEffect, useRef, useState} from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';
import { Video, ResizeMode, Audio } from 'expo-av';
import Carousel, { PaginationLight } from 'react-native-x-carousel';

import Cabecalho from '../../src/componentes/Cabecalho';
import Contatos from '../../src/componentes/Contatos';
import Texto from '../../src/componentes/Texto';
import Carrossel from '../../src/mocks/Carrossel'

import bolsa1 from '../../assets/produtos/bolsa1.png';
import bolsa2 from '../../assets/produtos/bolsa2.png';
import bolsa3 from '../../assets/produtos/bolsa3.png';
import tapete1 from '../../assets/produtos/tapete1.png';
import tapete2 from '../../assets/produtos/tapete2.png';
import Imagem from '../../assets/Imagem.png';
import babyCats from '../../assets/babyCats.mp4';
import { Button } from 'react-native';

const { width } = Dimensions.get('window');

const DATA = [
  {
    coverImageUri: bolsa1,
    cornerLabelColor: '#FFD300',
    cornerLabelText: 'Novidade',
  },
  {
    coverImageUri: bolsa2
  },
  {
    coverImageUri: bolsa3
  },
  {
    coverImageUri: tapete1
  },
  {
    coverImageUri: tapete2
  },
];

const Imagens = () => {
  const renderItem = data => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.coverImageUri} />
        <View style={[styles.cornerLabel, { backgroundColor: data.cornerLabelColor },]}>
          <Texto style={styles.cornerLabelText}>
            {data.cornerLabelText}
          </Texto>
        </View>
      </View>
    </View>
  );

  const video = useRef(null);
  const [Status, setStatus] = useState({});

  const [audioStatus, setAudioStatus]=useState(false);
  const [sound, setSound]=useState(new Audio.Sound())

  useEffect(()=>{
    (async()=>{
      console.log('status', audioStatus)
      if(audioStatus){
        await sound.loadAsync(require('../../assets/audio.mp3'))
        try {await sound.playAsync()} catch(e){console.log(e)}
      }else{
        await sound.stopAsync()
        await sound.unloadAsync()
      }
      })()
    }, [audioStatus]);

  return (
    <View style={styles.container}>
      <Cabecalho />
      <View style={styles.line} />
      <ScrollView>
        <Texto style={styles.titulo}> {Carrossel.Imagens.produtos} </Texto>
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={DATA}
          loop
          autoplay
        />

        <View style={styles.line} />

        <Texto style={styles.titulo}> {Carrossel.Imagens.sobre} </Texto>
        <View style={styles.item}>
          <Texto style={styles.textoConteudo}> {Carrossel.Imagens.conteudo} </Texto>
          <Image style={styles.imagem} source={Imagem} />
        </View>

        <View style={styles.line} />

        <Texto style={styles.titulo}>🐾Nós:</Texto>
        <Video ref={video}
          style={styles.video}
          source={babyCats}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)} />

        <View style={styles.line} />
        <Contatos />
        <View style={styles.line} />
        <Button color={audioStatus?'purple':'black'} title={'▶'} 
        onPress={()=>setAudioStatus(!audioStatus)}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    marginTop: 0,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.9,
    height: width * 1.0,
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  titulo: {
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 26,
    fontWeight: "bold",
    color: '#660066',
    textAlign: 'center',
  },
  Cabecalho: {
    paddingTop: 0,
  },
  textoConteudo: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    width: 225,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    paddingVertical: 10,
    alignItems: "center",
    alignContent: "center",
  },
  imagem: {
    borderRadius: 8,
  },
  line: {
    paddingTop: 10,
    borderBottomColor: '#660066',
    borderBottomWidth: 2,
  },
  video: {
    alignSelf: 'center',
    width: 400,
    height: 400,
  },
});

export default Imagens;