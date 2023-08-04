import * as React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TransparentLines from '../../assets/initial/transparentLines.svg'
import SolidLines from '../../assets/initial/solidLines.svg';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from "react";

const InitialBackgroundComponent = ()=> {
    const [fontsLoaded] = useFonts({
        'Inter-SemiBold': require('../../assets/Inter-SemiBold.ttf'),
        'Inter-Regular': require('../../assets/Inter-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View style={styles.container}>
            <LinearGradient colors={['rgba(229, 189, 246, 1)', 'rgba(216, 222, 222, 1)']} style={styles.background} >
                <ImageBackground source={TransparentLines} style={[styles.logo]} >
                    <ImageBackground source={SolidLines} style={[styles.logo]} >
                        <Text style={styles.mainParagraph}>
                            Atrask save naujai
                            su kiekvienu drabužiu!
                        </Text>
                        <Text style={styles.secondaryParagraph}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
                            sapien eros. Nulla varius iaculis justo, eget efficitur lorem placerat
                        </Text>
                    </ImageBackground>
                </ImageBackground>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    mainParagraph:{
        color: '#313131',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold',
        fontSize: 38,
        fontWeight: '600',
        lineHeight: 45,
    },
    secondaryParagraph:{
        color: '#414141',
        paddingTop: 13,
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'Inter-Regular',
        fontSize: 11,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.275,
    }
});

export default InitialBackgroundComponent;