export const programingLanguages = {
    javascript: "javascript",
    reactjs : "reactjs",
    php: "php",
    python: "python",
    vue: "vue",
    ruby: "ruby"
};

programingLanguages.javascript = "hello";

export type javascriptLanguage = (typeof programingLanguages)["javascript"];