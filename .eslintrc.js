module.exports = {
    "extends": [
      "eslint:recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:jsx-a11y/recommended",
      "plugin:react/recommended",

    ],
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off"
    },
    "env":{
        "browser": true
    }
  }
  