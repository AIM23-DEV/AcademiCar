import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder = env.APPDATA ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;
const certificateName = "academicar.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

try {
    if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
        console.log('Certificate files do not exist, attempting to generate them...');
        const result = child_process.spawnSync('dotnet', [
            'dev-certs',
            'https',
            '--export-path',
            certFilePath,
            '--format',
            'Pem',
            '--no-password',
        ], { stdio: 'inherit' });

        if (result.status !== 0) {
            throw new Error("Could not create certificate.");
        }
    }
} catch (error) {
    console.error('Error generating certificates:', error);
    process.exit(1);
}

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
        ? env.ASPNETCORE_URLS.split(';')[0]
        : 'https://localhost:7194';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '/api': {
                target,
                changeOrigin: true,
                secure: false
            },
            '/Saml2': {
                target,
                changeOrigin: true,
                secure: false
            }
        },
        port: 5173,
        https: {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    }
});
