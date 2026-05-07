import React, { createContext, useContext, useRef, useState } from "react";
import { Animated } from "react-native";
import { darkTheme, lightTheme } from "../styles/theme";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;

    function toggleTheme() {
        const toValue = isDark ? 1 : 0;
        Animated.timing(animation, {
            toValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
        setIsDark(!isDark);
    }

    const theme = {
        background: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [darkTheme.background, lightTheme.background],
        }),
        card: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [darkTheme.card, lightTheme.card],
        }),
        text: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [darkTheme.text, lightTheme.text],
        }),
        subText: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [darkTheme.subText, lightTheme.subText],
        }),
        primary: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [darkTheme.primary, lightTheme.primary],
        }),
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(ThemeContext);
}