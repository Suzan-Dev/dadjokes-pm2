module.exports = {
  apps: [
    {
      name: 'dadjokes',
      script: './server.js',
      max_memory_restart: '1G', // 1GB
      // cron_restart: '0 */24 * * *', // restart every 24 hours
      // watch: ['views'],
      // ignore_watch: ['node_modules', 'public'],
      // watch_delay: 1000,
      // restart_delay: 5000, // wait for five seconds before restarting
      exp_backoff_restart_delay: 100, // 100ms
      max_restarts: 10,
      min_uptime: 2000,
      // autorestart: false,
      // out_file: '/var/log/pm2/dadjokes/out.log',
      // error_file: '/var/log/pm2/dadjokes/error.log', // sudo mkdir /var/log/pm2 && sudo chown -R <your_username> /var/log/pm2
      // out_file: '/dev/null',
      // error_file: '/dev/null',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
      env_staging: {
        PORT: 3000,
        NODE_ENV: 'staging',
      },
      env_production: {
        PORT: 80,
        NODE_ENV: 'production',
      },
      instances: -1,
      exec_mode: 'cluster',
    },
  ],
  deploy: {
    production: {
      user: '<your_remote_server_username>',
      host: ['<your_remote_server_ip>'],
      ref: 'origin/prod',
      repo: '<your_git_repo_url>',
      path: '/home/<your_server_username>/dadjokes',
      'post-setup': 'npm install',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
