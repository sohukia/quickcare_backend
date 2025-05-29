module.exports = {
    apps: [
        {
            name: "quickare_backend",
            script: "dist/index.js",
            env: {
                NODE_ENV: "production",
                PORT: 4990,
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}