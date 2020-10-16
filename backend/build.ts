import fs from 'fs-extra';


/** This will be executed before the main build starts. */

try {
    fs.removeSync('./dist/');
} catch (err) {
    console.error(err);
}
