'use strict'

module.exports = {
  "parser": "babel-eslint" ,
  "plugins": [
    "prettier",
    "react"
  ],
  "rules": {
    "prettier/prettier": [
      "error"
    ],
    "react/prop-types": 0
  },
  "env": {
    "node" : true,
    "es6": true,
    "browser": true,
  },
  "extends": [
    // "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  "settings": {
    "react": {
      "version": "latest",
    },
  }
}