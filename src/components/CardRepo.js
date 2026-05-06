import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeContext } from "../context/ThemeContext";

export default function CardRepo({ repo, onPress }) {
    const { theme } = useThemeContext();

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.card }]} onPress={onPress}>
            <Animated.Text style={[styles.title, { color: theme.primary }]}>{repo.name}</Animated.Text>
            <Animated.Text style={[styles.desc, { color: theme.subText }]}>
                {repo.description || "Sem descrição"}
            </Animated.Text>
            <Animated.Text style={[styles.info, { color: theme.text }]}>
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
            </Animated.Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: { fontSize: 18, fontWeight: "bold" },
    desc: { fontSize: 14, marginVertical: 6 },
    info: { fontSize: 12, marginTop: 4 },
});