module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest",
    },
    binary: {
      version: "4.0.2",
      skipMD5: true,
    },
    autoStart: false,
  },
};

// during testing, rather than connecting API to 
// MongoBD cluster, we connect to the one in memory