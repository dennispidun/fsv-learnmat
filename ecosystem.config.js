module.exports = {
    apps: [
        {
            name: 'fsv-learnmat',
            script: '/home/fsv-learnmat/dist/main.js',
            time: true,
            instances: 1,
            autorestart: true,
            max_restarts: 50,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: "production",
                PORT: 8060
            }
        },
    ],
    deploy: {
        production: {
            user: process.env.DEPLOY_PM2_USER,
            host: process.env.DEPLOY_PM2_HOST,
            key: 'deploy.key',
            ref: 'origin/main',
            repo: 'https://github.com/dennispidun/fsv-learnmat',
            path: '/home/fsv-learnmat',
            'post-deploy': 'pwd && npm -v && node -v && rm -rf node_modules/ && npm install && npm install && npm run build && pm2 startOrRestart /home/fsv-learnmat/ecosystem.config.js --env production && pm2 save',
        },
    },
}