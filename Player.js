import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

export default function Player(props){

    const handlePlay = async ()=> {
        let curFile = props.musicas[props.audioIndex].file;

        let newMusics = props.musicas.filter((val, k)=> {
            if(k == newMusics) {
                props.musicas[k].play = true;
                curFile = props.musicas[k].file;
            }else {
                props.musicas[k].play = false;
            }
            return props.musicas[k]; 
        })

        try {
            if(props.audio != null) {
                props.setPlaying(true);
                props.setMusicas(newMusics);
                await props.audio.playAsync();
            }else {
                let curAudio = new Audio.Sound();
                try {
                    await curAudio.loadAsync(curFile);
                    await curAudio.playAsync();
                }catch(error) {}

                props.setAudio(curAudio);
                props.setMusicas(newMusics);
                props.setPlaying(true);
            }
        }catch(error) {}
    }

    const handlePause = async ()=> {
        if(props.audio != null) {
            await props.audio.pauseAsync();
        }
        props.setPlaying(false);
    }

    const handleBack = async ()=> {
        let newIndex = props.audioIndex - 1;
        if(newIndex < 0) {
            newIndex = props.musicas.length - 1;
        }
        props.setAudioIndex(newIndex);
        
        let curFile = props.musicas[newIndex].file;
        let newMusics = props.musicas.map((val, k)=> {
            if(k == newIndex) {
                val.play = true;
                curFile = val.file;
            }else {
                val.play = false;
            }
            return val;
        })

        if(props.audio != null) {
            await props.audio.unloadAsync();
            let curAudio = new Audio.Sound();
            try {
                await curAudio.loadAsync(curFile);
                await curAudio.playAsync();
            }catch(error) {}

            props.setAudio(curAudio);
            props.setMusicas(newMusics);
            props.setPlaying(true);
        }
    }

    const handleNext = async ()=> {
        let newIndex = props.audioIndex + 1;
        if(newIndex >= props.musicas.length) {
            newIndex = 0;
        }
        props.setAudioIndex(newIndex);
        let curFile = props.musicas[newIndex].file;
        let newMusics = props.musicas.map((val, k)=> {
            if(k == newIndex) {
                val.play = true;
                curFile = val.file;
            }else {
                val.play = false;
            }
            return val;
        })

        if(props.audio != null) {
            await props.audio.unloadAsync();
            let curAudio = new Audio.Sound();
            try {
                await curAudio.loadAsync(curFile);
                await curAudio.playAsync();
            }catch(error) {}

            props.setAudio(curAudio);
            props.setMusicas(newMusics);
            props.setPlaying(true);
        }
    }

    return(
        <View style={styles.player}>
            <TouchableOpacity style={{marginLeft: 20, marginRight: 20}} onPress={()=> handleBack()}>
                <AntDesign name='banckward' size={35} color={'white'} />
            </TouchableOpacity>
            
            {
                !props.playing ?
                <TouchableOpacity style={{marginLeft: 20, marginRight: 20}} onPress={()=> handlePlay()}>
                    <AntDesign name='play' size={40} color={'white'} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{marginLeft: 20, marginRight: 20}} onPress={()=> handlePause()}>
                    <AntDesign name='pause' size={40} color={'white'} />
                </TouchableOpacity>
            }

            <TouchableOpacity style={{marginLeft: 20, marginRight: 20}} onPress={()=> handleNext()}>
                <AntDesign name='forward' size={35} color={'white'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        width: '100%',
        height: 90,
        position: 'absolute',
        bottom: 0,
        zIndex: 999,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

})