module.exports = {
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/" // Ajusta según los módulos que necesites excluir
    ],
    testPathIgnorePatterns: [
      "/node_modules/"
    ],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    }
  };