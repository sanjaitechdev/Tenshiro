const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function buildAndDeploy() {
    const rootDir = path.join(__dirname, '..', '..');
    const frontendDir = path.join(rootDir, 'frontend');
    const backendDir = path.join(rootDir, 'backend');
    const publicDir = path.join(backendDir, 'public');

    console.log('🚀 Starting production build...');

    try {
        // 1. Build Frontend
        console.log('📦 Building frontend...');
        execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

        // 2. Clean backend public dir
        console.log('🧹 Cleaning backend public directory...');
        await fs.emptyDir(publicDir);

        // 3. Copy build files
        console.log('KC Copying build files to backend...');
        await fs.copy(path.join(frontendDir, 'dist'), publicDir);

        console.log('✅ Deployment preparation complete!');
        console.log('Run "npm start" in backend directory to serve the app.');

    } catch (err) {
        console.error('❌ Build failed:', err);
        process.exit(1);
    }
}

buildAndDeploy();
