// Node.js code which creates/overwrites JSON file that includes a timestamp
// which is used to append as query string onto child theme JS or CSS URLs to bust cache
import fs from 'fs-extra';
const file = `${process.cwd()}/build/json/timestamp.json`;
const currentTime = Date.now();
const obj = { timestamp: currentTime };
fs.outputJsonSync(file, obj);
