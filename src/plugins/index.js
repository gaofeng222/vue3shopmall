const customPlugin = {
  install(app) {
    console.log("🚀 ~ install ~ app:", app);
    app.provide("sysInfo", {
      name: "vue3-ts",
      version: "1.0.0",
      description: "vue3 + typescript",
      author: "wang",
      date: new Date().toLocaleString(),
    });
  },
};

export default customPlugin;
