'use strict';

import express from 'express';
import multer from 'multer';
import path from 'path';
import { mergePDFs } from './mergerFunc.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import {convert} from 'libreoffice-convert';

const convertAsync = promisify(convert);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/pdf-merger", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pdf-merger.html'));
});

app.get("/pdf-converter", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pdf-converter.html'));
});

app.post('/merge', upload.array('pdfs', 5), async (req, res) => {
    const number = req.files.length;
    const time = new Date().getTime();
    const paths = req.files.map(file => path.join(__dirname, file.path));

    await mergePDFs(paths, number, time);

    res.redirect(`http://localhost:3000/merged/${time}_merged.pdf`);
});

app.post('/convert-to-pdf', upload.single('office-file'), async (req, res) => {
    try {
        console.log(req.file);
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const time = new Date().getTime();
      const ext = '.pdf';
      const inputPath = req.file.path; // Path to the uploaded DOCX file
      const outputPath = path.join(__dirname, 'public', 'converted', `${time}_result${ext}`);
  
      // Read the uploaded DOCX file
      const docxBuf = await fs.readFile(inputPath);
  
      // Convert it to a PDF format with an undefined filter (as in your example)
      const pdfBuf = await convertAsync(docxBuf, ext, undefined);
  
      // Write the converted PDF to the public directory
      await fs.writeFile(outputPath, pdfBuf);
  
      res.redirect(`http://localhost:3000/converted/${time}_result.pdf`);
    } catch (error) {
      console.error('Error converting file:', error);
      res.status(500).json({ error: 'Error converting file' });
    }
  });

app.listen(port, () => {
    console.log(`Listening successful at http://localhost:${port}`);
});