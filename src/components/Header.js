import React from "react";
import { StyleSheet, TouchableOpacity, Linking, Image, Animated } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import useAssets from "../hooks/useAssets";
import { darkTheme } from "../styles/theme";

export default function Header({ title }) {
    const { theme, toggleTheme, isDark } = useThemeContext();
    const assets = useAssets(isDark ? { background: "#0d1117" } : { background: "#f6f8fa" });

    return (
        <Animated.View style={[styles.container, { backgroundColor: theme.card }]}>
            <Animated.Text style={[styles.title, { color: theme.text }]}>{title}</Animated.Text>

            <TouchableOpacity onPress={toggleTheme} style={styles.actions}>
                <Image source={assets.githubIcon} style={styles.icon} resizeMode="contain" />
                <Animated.Text style={{ color: theme.text }}>
                    {isDark ? "🌙" : "☀️"}
                </Animated.Text>
            </TouchableOpacity>
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
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    icon: {
        width: 28,
        height: 28,
        marginRight: 12,
    },
});