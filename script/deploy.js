import path from 'path';

import del from 'del';
import fs from 'fs-extra';
import mkdirp from 'mkdirp';
import zipper from 'zip-local';

import pkg from '../package.json';

const ARCHIVE_FILENAME = 'aws-uncle.zip';
const ROOT_DIR = path.join(__dirname, '../');
const BUILD_DIR = path.join(ROOT_DIR, 'build');


function copyModules() {
  const baseDir = path.join(BUILD_DIR, 'node_modules');
  const moduleDir = path.join(ROOT_DIR, 'node_modules');
  del.sync(baseDir);
  mkdirp(baseDir);
  Object.keys(pkg.dependencies).forEach(name => {
    console.log(`copying... node_modules/${name}`);
    fs.copySync(path.join(moduleDir, name), path.join(baseDir, name));
  });
}

function main() {
  ['.env', 'configs.json'].forEach(name => {
    console.log(`copying... ${name}`);
    fs.copySync(path.join(ROOT_DIR, name), path.join(BUILD_DIR, name));
  });
  copyModules();
  console.log(`compressing... ${ARCHIVE_FILENAME}`);
  zipper.sync.zip(BUILD_DIR).compress().save(path.join(BUILD_DIR, ARCHIVE_FILENAME));
  console.log('done!');
}

main();
