import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
    mode: "production",
    entry: "./pages/index.tsx",
    resolve: {
        alias: {
            "~/components": path.resolve(__dirname, "src/components/"),
            "~/pages": path.resolve(__dirname, "pages/"),
            //"~/api": path.resolve(__dirname, "api/"),
            "~/public": path.resolve(__dirname, "public/"),
            "~/styles": path.resolve(__dirname, "styles/"),
            //"~/hooks": path.resolve(__dirname, "hooks/"),
            //"~/contexts": path.resolve(__dirname, "contexts"),
            "~/utils": path.resolve(__dirname, "utils/"),
            "~/types": path.resolve(__dirname, "types/"),
            //"~/stores": path.resolve(__dirname, "stores/"),
            "~/tests": path.resolve(__dirname, "tests/"),
            "~/graphql": path.resolve(__dirname, "graphql/"),
            "~/effects": path.resolve(__dirname, "effect/"),
            "~/locales": path.resolve(__dirname, "locale/"),
        },
        extensions: [".css", ".sass", ".scss", ".tsx"]   //allow import without these extensions 
    },
    module: {
        rules: [
            {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: "javascript/auto"
            }
        ]
    },
}