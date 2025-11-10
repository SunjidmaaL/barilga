/**
 * Strapi Database Backup Script
 * Энэ скрипт нь Strapi-ийн өгөгдлийг backup хийхэд тусална
 * 
 * Ашиглах: node backup-strapi.js
 */

const fs = require('fs');
const path = require('path');

// Backup хийх folder-ийн зам
const BACKUP_DIR = path.join(__dirname, 'strapi-backups');
const TIMESTAMP = new Date().toISOString().replace(/:/g, '-').split('.')[0];
const BACKUP_FOLDER = path.join(BACKUP_DIR, `backup-${TIMESTAMP}`);

// Strapi төслийн зам (өөрчлөх хэрэгтэй)
const STRAPI_PROJECT_PATH = process.env.STRAPI_PROJECT_PATH || '../your-strapi-project';

console.log('🚀 Strapi Backup Script эхэллээ...\n');

// Backup folder үүсгэх
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log('✅ Backup folder үүсгэгдлээ:', BACKUP_DIR);
}

if (!fs.existsSync(BACKUP_FOLDER)) {
  fs.mkdirSync(BACKUP_FOLDER, { recursive: true });
  console.log('✅ Backup subfolder үүсгэгдлээ:', BACKUP_FOLDER);
}

// Backup хийх функц
function backupFile(sourcePath, destPath, description) {
  try {
    if (fs.existsSync(sourcePath)) {
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ ${description} backup хийгдлээ: ${path.basename(destPath)}`);
      return true;
    } else {
      console.log(`⚠️  ${description} файл олдсонгүй: ${sourcePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ ${description} backup хийхэд алдаа гарлаа:`, error.message);
    return false;
  }
}

// Backup хийх folder-ийг copy хийх функц
function backupFolder(sourcePath, destPath, description) {
  try {
    if (fs.existsSync(sourcePath)) {
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Recursive copy
      function copyRecursive(src, dest) {
        if (fs.statSync(src).isDirectory()) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          fs.readdirSync(src).forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
          });
        } else {
          fs.copyFileSync(src, dest);
        }
      }
      
      copyRecursive(sourcePath, destPath);
      console.log(`✅ ${description} folder backup хийгдлээ: ${path.basename(destPath)}`);
      return true;
    } else {
      console.log(`⚠️  ${description} folder олдсонгүй: ${sourcePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ ${description} folder backup хийхэд алдаа гарлаа:`, error.message);
    return false;
  }
}

// Main backup process
console.log('📦 Backup хийж байна...\n');

// 1. Database backup (SQLite)
const dbSourcePath = path.join(STRAPI_PROJECT_PATH, '.tmp', 'data.db');
const dbDestPath = path.join(BACKUP_FOLDER, 'data.db');
backupFile(dbSourcePath, dbDestPath, 'Database');

// 2. Uploads folder backup
const uploadsSourcePath = path.join(STRAPI_PROJECT_PATH, 'public', 'uploads');
const uploadsDestPath = path.join(BACKUP_FOLDER, 'uploads');
backupFolder(uploadsSourcePath, uploadsDestPath, 'Uploads');

// 3. Config files backup
const configSourcePath = path.join(STRAPI_PROJECT_PATH, 'config');
const configDestPath = path.join(BACKUP_FOLDER, 'config');
backupFolder(configSourcePath, configDestPath, 'Config');

// 4. Schema files backup (Content Type definitions)
const srcSourcePath = path.join(STRAPI_PROJECT_PATH, 'src');
const srcDestPath = path.join(BACKUP_FOLDER, 'src');
backupFolder(srcSourcePath, srcDestPath, 'Source (Schema)');

// 5. Package.json backup
const packageSourcePath = path.join(STRAPI_PROJECT_PATH, 'package.json');
const packageDestPath = path.join(BACKUP_FOLDER, 'package.json');
backupFile(packageSourcePath, packageDestPath, 'Package.json');

// 6. .env backup (if exists)
const envSourcePath = path.join(STRAPI_PROJECT_PATH, '.env');
const envDestPath = path.join(BACKUP_FOLDER, '.env.backup');
backupFile(envSourcePath, envDestPath, 'Environment variables');

// Backup info file үүсгэх
const backupInfo = {
  timestamp: TIMESTAMP,
  date: new Date().toISOString(),
  strapiProjectPath: STRAPI_PROJECT_PATH,
  backupLocation: BACKUP_FOLDER,
  items: [
    'Database (data.db)',
    'Uploads folder',
    'Config files',
    'Source files (Schema)',
    'Package.json',
    'Environment variables'
  ]
};

const infoPath = path.join(BACKUP_FOLDER, 'backup-info.json');
fs.writeFileSync(infoPath, JSON.stringify(backupInfo, null, 2));
console.log(`✅ Backup info файл үүсгэгдлээ: backup-info.json`);

console.log('\n✨ Backup амжилттай дууслаа!');
console.log(`📁 Backup location: ${BACKUP_FOLDER}\n`);

// Зөвлөмж
console.log('💡 ЗӨВЛӨМЖ:');
console.log('1. Backup файлыг найдвартай газар хадгална уу');
console.log('2. Backup-ийг үе үе шалгаж байна уу');
console.log('3. Production environment-д backup автоматаар авах систем тохируулна уу\n');
