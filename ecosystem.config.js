module.exports = {
  apps: [
    {
      name: 'supreme-court-api',
      script: './src/index.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
