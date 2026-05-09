import React, { useState } from "react";
import { Animated, View, TextInput, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import api from "../services/api";
import CardRepo from "../components/CardRepo";
import Button from "../components/Button";
import Header from "../components/Header";
import { useThemeContext } from "../context/ThemeContext";

export default function Home({ navigation }) {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, isDark } = useThemeContext();

  async function fetchRepos() {
    if (!username) return;
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/users/${username}/repos`);
      setRepos(response.data);
    } catch (err) {
      setError("Usuário não encontrado ou erro na API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="GitHub Explorer" navigation={navigation} />
      <View style={styles.content}>
        <TextInput
          placeholder="Digite o usuário do GitHub"
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={fetchRepos}
          style={[
            styles.input,
            {
              backgroundColor: theme.card,
              color: isDark ? "#c9d1d9" : "#24292e",
            },
          ]}
          placeholderTextColor={isDark ? "#8b949e" : "#57606a"}
        />
        <Button title="Buscar Repositórios do Usuário" onPress={fetchRepos}/>

        {loading && <ActivityIndicator size="large" color={theme.primary} />}
        {error !== "" && (
          <Animated.Text style={{ color: theme.text }}>{error}</Animated.Text>
        )}

        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardRepo
              repo={item}
              onPress={() => navigation.navigate("Details", { repo: item })}
            />
          )}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20
  },
  content: { 
    flex: 1, 
    padding: 16 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
});