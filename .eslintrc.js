module.exports = {
    parser: "babel-eslint",
    extends: ["plugin:react/recommended", "plugin:prettier/recommended"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {},
    settings: {
        react: {
            version: "detect"
        }
    }
};
