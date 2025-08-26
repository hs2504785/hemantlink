const shell = require('shelljs');
const sourceDir = 'dist/apps/gale/';

// Remove the existing ngsw-worker.js
shell.rm(sourceDir + 'ngsw-worker.js');

// Rename safety-worker.js to ngsw-worker.js
shell.mv(sourceDir + 'safety-worker.js', sourceDir + 'ngsw-worker.js');
