import React from 'react';
import {Image, StyleSheet} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedGestureHandler,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    Extrapolate,
    interpolateColor,
    runOnJS,
} from 'react-native-reanimated';
import {useState} from 'react';
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import buttonArrow from '../../assets/initial/buttonArrow.png';

const BUTTON_WIDTH = 198;
const BUTTON_HEIGHT = 50;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const sliderButtonComponent = ({onToggle}) => {
    // Animated value for X translation
    const X = useSharedValue(0);
    // Toggled State
    const [toggled, setToggled] = useState(false);

    // Fires when animation ends
    const handleComplete = (isToggled) => {
        if (isToggled !== toggled) {
            setToggled(isToggled);
            onToggle(isToggled);
        }
    };

    // Gesture Handler Events
    const animatedGestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.completed = toggled;
        },
        onActive: (e, ctx) => {
            let newValue;
            if (ctx.completed) {
                newValue = H_SWIPE_RANGE + e.translationX;
            } else {
                newValue = e.translationX;
            }

            if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
                X.value = newValue;
            }
        },
        onEnd: () => {
            if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
                X.value = withSpring(0);
                runOnJS(handleComplete)(false);
            } else {
                X.value = withSpring(H_SWIPE_RANGE);
                runOnJS(handleComplete)(true);
            }
        },
    });

    const InterpolateXInput = [0, H_SWIPE_RANGE];
    const AnimatedStyles = {
        swipeCont: useAnimatedStyle(() => {
            return {};
        }),
        colorWave: useAnimatedStyle(() => {
            return {
                width: H_WAVE_RANGE + X.value,

                opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
            };
        }),
        swipeable: useAnimatedStyle(() => {
            return {
                backgroundColor: interpolateColor(
                    X.value,
                    [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
                    ['#fff', '#fff'],
                ),
                transform: [{translateX: X.value}],
            };
        }),
        swipeText: useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    X.value,
                    InterpolateXInput,
                    [1, 0],
                    Extrapolate.CLAMP,
                ),
                transform: [
                    {
                        translateX: interpolate(
                            X.value,
                            InterpolateXInput,
                            [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
                            Extrapolate.CLAMP,
                        ),
                    },
                ],
            };
        }),
    };

    return (
        <GestureHandlerRootView>
        <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
            <AnimatedLinearGradient
                style={[AnimatedStyles.colorWave, styles.colorWave]}
                colors={['#313131', '#626262']}
                start={{x: 0.0, y: 0.5}}
                end={{x: 1, y: 0.5}}
            />
            <PanGestureHandler onGestureEvent={animatedGestureHandler}>
                <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} >
                    <Image source={buttonArrow} style={styles.arrowStyle}/>
                </Animated.View>
            </PanGestureHandler>
            <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
                Pradėkime!
            </Animated.Text>
        </Animated.View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    swipeCont: {
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        backgroundColor: '#313131',
        borderRadius: BUTTON_HEIGHT,
        padding: BUTTON_PADDING,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity:  0.20,
    },
    colorWave: {
        position: 'absolute',
        left: 0,
        height: BUTTON_HEIGHT,
        borderRadius: BUTTON_HEIGHT,
    },
    swipeable: {
        position: 'absolute',
        left: BUTTON_PADDING,
        height: SWIPEABLE_DIMENSIONS,
        width: SWIPEABLE_DIMENSIONS,
        borderRadius: SWIPEABLE_DIMENSIONS,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
    },
    swipeText: {
        fontFamily: 'Inter-Medium',
        alignSelf: 'center',
        fontSize: 15,
        zIndex: 2,
        color: 'white',
    },
    arrowStyle: {
        height: 15,
        width: 15,
    }
});

export default sliderButtonComponent;