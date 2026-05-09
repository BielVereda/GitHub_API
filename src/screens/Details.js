import React from "react";
import { Animated, View, StyleSheet, Linking, TouchableOpacity, Image } from "react-native";
import { useThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";

export default function Details({ route, navigation }) {
  const { repo } = route.params;
  const { theme, isDark } = useThemeContext();

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title={repo.name} navigation={navigation} showBack />
      <View style={styles.centerWrapper}>
        <View
          style={[
            styles.card,
            isDark
              ? { backgroundColor: "#1f2937", borderColor: "#444" }
              : { backgroundColor: "#fff", borderColor: "#ccc" },
          ]}
        >
          <Animated.Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{repo.name}</Animated.Text>
          <Animated.Text style={[styles.desc, { color: isDark ? "#ddd" : "#333" }]}>{repo.description || "Sem descrição"}</Animated.Text>
          <Animated.Text style={[styles.info, { color: isDark ? "#ccc" : "#555" }]}>
            Stars ⭐: {repo.stargazers_count}    |    Forks 🍴: {repo.forks_count}
          </Animated.Text>

          <TouchableOpacity
  style={[styles.button, { backgroundColor: isDark ? "#58a6ff" : "#4ea8de" }]}
  onPress={() => Linking.openURL(repo.html_url)}
>
  <Image
    source={isDark ? require("../assets/github-dark.png") : require("../assets/github-light.png")}
    style={[styles.icon, { tintColor: isDark ? "#fff" : "#000" }]}
  />
  <Animated.Text style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}>
    Abrir Repositório
  </Animated.Text>
  <Image
    source={isDark ? require("../assets/arrow-light.png") : require("../assets/arrow-dark.png")}
    style={[styles.icon, { tintColor: isDark ? "#fff" : "#000" }]}
  />
</TouchableOpacity>

        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  centerWrapper: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  card: {
    width: "30%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1.5,
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 12, 
    textAlign: "center" 
  },
  desc: { 
    fontSize: 16, 
    marginBottom: 12, 
    textAlign: "center" 
  },
  info: { 
    fontSize: 14, 
    marginBottom: 16 
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16, 
    marginHorizontal: 10 
  },
  icon: { 
    width: 22, 
    height: 22, 
    resizeMode: "contain", 
    tintColor: "#fff" 
  },
});
