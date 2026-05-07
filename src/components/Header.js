import React from "react";
import { StyleSheet, TouchableOpacity, Image, View, Linking } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import Animated from "react-native-reanimated";

export default function Header({ title, navigation, showBack, onBack }) {
    const { theme, toggleTheme, isDark } = useThemeContext();

    return (
        <Animated.View style={[styles.container, { backgroundColor: theme.primary }]}>
            <View style={styles.left}>
                {showBack && (
                    <TouchableOpacity onPress={onBack || (() => navigation.goBack())}>
                        <Image
                            source={isDark ? require("../assets/arrow-light.png") : require("../assets/arrow-dark.png")}
                            style={[styles.icon, { transform: [{ rotate: "180deg" }] }]}
                        />
                    </TouchableOpacity>
                )}
                <Animated.Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{title}</Animated.Text>
            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
                    <Image
                        source={isDark ? require("../assets/star-dark.png") : require("../assets/star-light.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleTheme}>
                    <Animated.Text style={{ fontSize: 20, color: isDark ? "#fff" : "#000" }}>
                        {isDark ? "🌙" : "☀️"}
                    </Animated.Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL("https://github.com/bielvereda")}>
                    <Image
                        source={isDark ? require("../assets/github-dark.png") : require("../assets/github-light.png")}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingVertical: 12, 
        paddingHorizontal: 16, 
        elevation: 6 
    },
    left: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 8 
    },
    title: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginLeft: 8 
    },
    right: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 12 
    },
    icon: { 
        width: 24, 
        height: 24, 
        resizeMode: "contain" 
    },
});