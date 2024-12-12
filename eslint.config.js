module.exports = [
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": ["warn", { "args": "none" }]
      "eqeqeq": "error",
      "no-console": "warn"
    }
  }
];
