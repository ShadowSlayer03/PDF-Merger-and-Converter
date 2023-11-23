import PDFMerger from 'pdf-merger-js';

var merger = new PDFMerger();

const mergePDFs = async (filePaths, length, time) => {
  try {
    for (let i = 0; i < length; i++) {
      await merger.add(filePaths[i]);
    }
    
    await merger.save(`public/merged/${time}_merged.pdf`); // save under given name and reset the internal document
    
    // Export the merged PDF as a nodejs Buffer
    // const mergedPdfBuffer = await merger.saveAsBuffer();
    // fs.writeSync('merged.pdf', mergedPdfBuffer);
  } catch (error) {
    console.error('Error merging PDFs:', error);
    // Handle the error or throw it again if you want to propagate it
    throw error;
  }
};

export { mergePDFs };
