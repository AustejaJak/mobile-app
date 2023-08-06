import * as React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from "react";
import GlobalStyles from "../../components/globalStyles";
import SliderButtonComponent from "./sliderButtonComponent";
const InitialBackgroundComponent = ()=> {
    const [fontsLoaded] = useFonts({
        'Inter-SemiBold': require('../../assets/Inter-SemiBold.ttf'),
        'Inter-Regular': require('../../assets/Inter-Regular.ttf'),
        'Inter-Medium': require('../../assets/Inter-Medium.ttf'),
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
            <LinearGradient colors={['rgba(229, 189, 246, 1)', 'rgba(216, 222, 222, 1)']} style={styles.background}>
                <Image source={require('../../assets/initial/transparentLines.png')} style={[styles.transparentLines]}/>
                <Image source={require('../../assets/initial/solidLines.png')} style={[styles.solidLines]} />
                <SafeAreaView style={GlobalStyles.droidSafeArea}>
                    <Text style={[styles.brandText]}>
                    LoremIpsum
                    </Text>
                </SafeAreaView>
                <View style={styles.textContainer}>
                    <Text style={styles.mainParagraph}>
                        Lorem ipsum dolor sit amet
                        consectetur!
                    </Text>
                    <Text style={styles.secondaryParagraph}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
                        sapien eros. Nulla varius iaculis justo, eget efficitur lorem
                    </Text>
                    <SliderButtonComponent/>
                </View>
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
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        bottom: 60,
    },
    transparentLines: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        bottom: 250,
        position: 'absolute',
    },
    solidLines: {
        width: '100%',
        height: 300,
        top: 50,
        right: 0,
        position: 'absolute',
    },
    mainParagraph:{
        color: '#313131',
        textAlign: 'center',
        fontFamily: 'Inter-SemiBold',
        fontSize: 35,
        fontWeight: '600',
        lineHeight: 45,
    },
    secondaryParagraph:{
        color: '#414141',
        paddingTop: 13,
        paddingHorizontal: 20,
        textAlign: 'justify',
        fontFamily: 'Inter-Regular',
        fontSize: 11,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16,
        letterSpacing: 0.275,
    },
    brandText: {
        color: '#FFFFFF',
        opacity: 0.5,
        fontFamily: 'Inter-Medium',
        fontSize: 12,
        fontWeight: 500,
        alignSelf: 'center',
    },
});

export default InitialBackgroundComponent;