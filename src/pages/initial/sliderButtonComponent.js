import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";
import buttonArrow from '../../assets/initial/buttonArrow.png';
import { GestureHandlerRootView  } from "react-native-gesture-handler";
import { useAnimatedGestureHandler, useSharedValue } from "react-native-reanimated";
import { useState } from 'react/cjs/react.production.min';

const BUTTON_WIDTH = 198;
const BUTTON_HEIGHT = 50;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

const sliderButtonComponent = ({onToggle})=> {
    const X = useSharedValue(0);
    const animatedGestureHandler = useAnimatedGestureHandler({
        onActive:(e) =>{
            X.value = e.translationX;
            const [toggled, setToggled] = useState(false);
        }
    })

    const handleComplete = (isToggled) => {
        if (isToggled != toggled) {
            setToggled(isToggled);
            onToggle(isToggled);
        }
    }
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
                <GestureHandlerRootView  onGestureEvent={animatedGestureHandler}>
                <View style={styles.circleButtonContainer}>
                    <View style={styles.circleButtonPath}>
                        <Image source={buttonArrow} style={styles.arrowStyle}/>
                    </View>
                </View>
                </GestureHandlerRootView >
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
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        backgroundColor: '#313131',
        borderRadius: 30,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.20,
        shadowRadius: BUTTON_HEIGHT,
        elevation: 8,
    },
    circleButtonPath: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SWIPEABLE_DIMENSIONS,
        height: SWIPEABLE_DIMENSIONS,
        backgroundColor: 'white',
        borderRadius: SWIPEABLE_DIMENSIONS,
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
        height: 15,
        width: 15,
    }
});

export default sliderButtonComponent;