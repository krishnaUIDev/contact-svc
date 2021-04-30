module.exports = {
  apps: [
    {
      name: "Contact-svc",
      script: "index.js",
      instances: "MAX",
      autorestart: true,
      args: "CONTACT SVC - 1",
      watch: false,
      max_memory_restart: "1G",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        port: 3000,
      },
    },
    {
      name: "Contact-svc 2",
      script: "index.js",
      instances: "MAX",
      autorestart: true,
      args: "CONTACT SVC - 2",
      watch: false,
      max_memory_restart: "1G",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        port: 3001,
      },
    },
  ],
};
