import React, { useState, useEffect } from "react";
import { Animated, View, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import CardRepo from "../components/CardRepo";

export default function Favorites({ navigation }) {
    const [favorites, setFavorites] = useState([]);
    const { theme } = useThemeContext();

    useEffect(() => {
        const loadFavorites = async () => {
            const stored = await AsyncStorage.getItem("favorites");
            if (stored) setFavorites(JSON.parse(stored));
        };
        const unsubscribe = navigation.addListener("focus", loadFavorites);
        return unsubscribe;
    }, [navigation]);

    return (
        <Animated.View style={[styles.container, { backgroundColor: theme.background }]}>
            <Header title="Favoritos" navigation={navigation} />
            <View style={styles.content}>
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CardRepo repo={item} onPress={() => navigation.navigate("Details", { repo: item })} />
                    )}
                    showsVerticalScrollIndicator={true}
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
    container: { 
        flex: 1 
    },
    content: { 
        flex: 1, 
        padding: 16 
    },
});