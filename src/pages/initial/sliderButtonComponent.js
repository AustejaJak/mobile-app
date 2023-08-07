import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useCallback} from "react";
import buttonArrow from '../../assets/initial/buttonArrow.png';
const sliderButtonComponent = ()=> {
    const [fontsLoaded] = useFonts({
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
            <View style={styles.submitButtonPath}>
                <View style={styles.circleButtonContainer}>
                    <View style={styles.circleButtonPath}>
                        <Image source={buttonArrow} style={styles.arrowStyle}/>
                    </View>
                </View>
                <View style={styles.buttonTextContainer}>
                    <Text style={styles.buttonText}>
                        Pradėkime!
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleButtonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    submitButtonPath: {
        flexDirection: 'row',
        width: '50%',
        height: '20%',
        backgroundColor: '#313131',
        borderRadius: 30,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.20,
        shadowRadius: 5.62,
        elevation: 8,
    },
    circleButtonPath: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 100,
        marginLeft: 10,
    },
    buttonTextContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Inter-Medium',
        color: 'white',
        fontSize: 15,
    },
    arrowStyle: {
        height: 22,
        width: 22,
    }
});

export default sliderButtonComponent;