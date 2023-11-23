'use strict';

import { join } from 'path';
import { promises as fs } from 'fs';

import { convertAsync, convert } from 'libreoffice-convert';
convertAsync = require('util').promisify(convert);

async function main() {
    const ext = '.pdf'
    const inputPath = join(__dirname, '/uploads/example.docx');
    const outputPath = join(__dirname, `/resources/example${ext}`);

    // Read file
    const docxBuf = await fs.readFile(inputPath);

    // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
    let pdfBuf = await convertAsync(docxBuf, ext, undefined);
    
    // Here in done you have pdf file which you can save or transfer in another stream
    await fs.writeFile(outputPath, pdfBuf);
}

main().catch(function (err) {
    console.log(`Error converting file: ${err}`);
});