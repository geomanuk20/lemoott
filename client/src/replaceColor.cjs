const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname);
const oldColor = /#ff0000/g;
const newColor = '#b3d332';
const oldColorHover = /#e60000/g;
const newColorHover = '#b3d332';

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content.replace(oldColor, newColor).replace(oldColorHover, newColorHover);
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      // Only update Frontend components to avoid breaking Admin panel if they only want frontend
      const fileName = path.basename(fullPath);
      if (
        fileName.startsWith('Frontend') || 
        fileName === 'Home.jsx' || 
        fileName === 'Watchlist.jsx' || 
        fileName === 'ResetPassword.jsx' ||
        fileName === 'App.jsx' ||
        fileName === 'index.css'
      ) {
        replaceInFile(fullPath);
      }
    }
  }
}

processDirectory(directoryPath);
console.log('Color replacement complete.');
