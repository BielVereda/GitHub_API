import React, { useState } from "react";
import { Animated, View, FlatList, StyleSheet } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import CardRepo from "../components/CardRepo";

export default function Favorites({ navigation }) {
    const [favorites, setFavorites] = useState([]); // aqui você pode integrar com AsyncStorage depois
    const { theme } = useThemeContext();

    return (
        <Animated.View style={[styles.container, { backgroundColor: theme.background }]}>
            <Header title="Favoritos" />
            <View style={styles.content}>
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CardRepo
                            repo={item}
                            onPress={() => navigation.navigate("Details", { repo: item })}
                        />
                    )}
                    ListEmptyComponent={
                        <Animated.Text style={{ color: theme.subText, textAlign: "center", marginTop: 20 }}>
                            Nenhum favorito ainda.
                        </Animated.Text>
                    }
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16 },
});