import React from "react";
import { Animated, View, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";

export default function Details({ route }) {
    const { repo } = route.params;
    const { theme } = useThemeContext();

    return (
        <Animated.View style={[styles.container, { backgroundColor: theme.background }]}>
            <Header title={repo.name} />
            <View style={styles.content}>
                <Animated.Text style={[styles.text, { color: theme.text }]}>
                    {repo.description || "Sem descrição"}
                </Animated.Text>
                <Animated.Text style={[styles.text, { color: theme.text }]}>
                    ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                </Animated.Text>
                <TouchableOpacity onPress={() => Linking.openURL(repo.html_url)}>
                    <Animated.Text style={[styles.link, { color: theme.primary }]}>
                        Abrir no GitHub
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16 },
    text: { fontSize: 16, marginBottom: 12 },
    link: { fontSize: 16, fontWeight: "bold" },
});