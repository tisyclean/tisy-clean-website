const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const FILES = ["index.html", "style.css", "script.js", "robots.txt", "sitemap.xml"];
const DIRS = ["images"];

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const file of FILES) {
  const src = path.join(ROOT, file);
  if (!fs.existsSync(src)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
  copyFile(src, path.join(DIST, file));
  console.log(`  ✓ ${file}`);
}

for (const dir of DIRS) {
  const src = path.join(ROOT, dir);
  if (!fs.existsSync(src)) {
    console.error(`Missing required directory: ${dir}/`);
    process.exit(1);
  }
  copyDir(src, path.join(DIST, dir));
  console.log(`  ✓ ${dir}/`);
}

console.log(`\nBuild complete → dist/`);
