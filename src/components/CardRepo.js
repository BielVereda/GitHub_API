import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeContext } from "../context/ThemeContext";

export default function CardRepo({ repo, onPress }) {
    const { theme, isDark } = useThemeContext();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            const stored = await AsyncStorage.getItem("favorites");
            if (stored) {
                const favorites = JSON.parse(stored);
                setIsFavorite(favorites.some((f) => f.id === repo.id));
            }
        };
        checkFavorite();
    }, [repo]);

    const toggleFavorite = async () => {
        const stored = await AsyncStorage.getItem("favorites");
        let favorites = stored ? JSON.parse(stored) : [];
        if (isFavorite) {
            favorites = favorites.filter((f) => f.id !== repo.id);
        } else {
            favorites.push(repo);
        }
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.card }]} onPress={onPress}>
            <View style={{ flex: 1 }}>
                <Animated.Text style={[styles.title, { color: theme.primary }]}>{repo.name}</Animated.Text>
                <Animated.Text style={[styles.desc, { color: theme.subText }]}>{repo.description || "Sem descrição"}</Animated.Text>
                <Animated.Text style={[styles.info, { color: theme.text }]}>
                    Stars ⭐: {repo.stargazers_count}    |    Forks 🍴: {repo.forks_count}
                </Animated.Text>
            </View>
            <TouchableOpacity onPress={toggleFavorite}>
                <Image
                    source={
                        isFavorite
                            ? require("../assets/star-filled.png")
                            : require("../assets/star-empty.png")
                    }
                    style={[
                        styles.icon,
                        { tintColor: isFavorite ? "#FFD700" : isDark ? "#fff" : "#000" }
                    ]}
                />


            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        backgroundColor: theme.card,
        // borda visível
        borderWidth: 1.5,
        borderColor: isDark ? "#444" : "#ccc",
        // sombra Android
        elevation: 4,
        // sombra iOS
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
    },

    title: { fontSize: 18, fontWeight: "bold" },
    desc: { fontSize: 14, marginVertical: 6 },
    info: { fontSize: 12 },
    icon: { width: 24, height: 24, resizeMode: "contain" }
});