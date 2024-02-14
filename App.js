import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import Player from './Player';

export default function App() {

  const [audio, setAudio] = useState(null);
  const [play, setPlay] = useState(false);
  const [audioIndex, setAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [musicas, setMusicas] = useState([

    {
      nome: 'Música 1',
      artista: 'Artista 1',
      play: false,
      file: require('./STIM - fury (ft. RJ Pasin).mp3')
    },
    {
      nome: 'Música 2',
      artista: 'Artista 2',
      play: false,
      file: require('./VVV(guitar remix) x sukuna.mp3')
    }
  ])

  const changeMusic= async (id)=> {
    let curFile = null;
    let newMusics = musicas.filter((val, k)=> {
      if(k == id) {
        musicas[k].play = true;
        curFile = musicas[k].file;
        setPlaying(true);
        setAudioIndex(id);
      }else {
        musicas[k].play = false;
      }
      return musicas[k];    
    })

    if(audio != null) {
      audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    }catch(error) {}

    setAudio(curAudio);
    setMusicas(newMusics);
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.textHeader}>DecoPlayer</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.tableText}>Música</Text>
          <Text style={styles.tableText}>Artista</Text>
        </View>
        {
          musicas.map((val, k)=>{
            if(val.play) {
              return(
                <View style={styles.table}>
                  <TouchableOpacity style={styles.rowText} onPress={()=> changeMusic(k)}>
                    <Text style={styles.playing}><AntDesign name="play" size={15} color='#1DB954' />  {val.nome}</Text>
                    <Text style={styles.playing}>{val.artista}</Text>
                  </TouchableOpacity>
              </View>
              )
            }else {
              return(
                <View style={styles.table}>
                  <TouchableOpacity style={styles.rowText} onPress={()=> changeMusic(k)}>
                    <Text style={styles.pause}><AntDesign name="play" size={15} color='white'/>  {val.nome}</Text>
                    <Text style={styles.pause}>{val.artista}</Text>
                  </TouchableOpacity>
              </View>
              )
            }
          })
        }
        <View style={{paddingBottom: 200}}></View>
      </ScrollView>

      <Player playing={playing} setPlaying={setPlaying} audioIndex={audioIndex} setAudioIndex={setAudioIndex} musicas={musicas} setMusicas={setMusicas} audio={audio} setAudio={setAudio}></Player>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  header: {
    backgroundColor: '#1DB954',
    width: '100%',
    padding: 20,
  },
  textHeader: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1DB954'
  },
  tableText: {
    color: '#fff',
    fontSize: 16,
    width: '50%'
  },
  rowText: {
    flexDirection: 'row',
    width: '100%'
  },
  playing: {
    color: '#1DB954',
    fontWeight: 'bold',
    width: '50%',
  }, 
  pause: {
    color: '#fff',
    width: '50%',
  }
});
