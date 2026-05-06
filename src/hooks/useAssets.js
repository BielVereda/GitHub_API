import { darkTheme } from "../styles/theme";

export default function useAssets(theme) {
    return {
        githubIcon:
            theme.background === darkTheme.background
                ? require("../assets/github-dark.png")
                : require("../assets/github-light.png"),
    };
}