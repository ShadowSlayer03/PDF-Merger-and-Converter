import PDFMerger from 'pdf-merger-js'

var merger = new PDFMerger();

const mergePDFs = async (filePaths,length,time) => {
  for(let i=0;i<length;i++){
        await merger.add(filePaths[i]);
  }   
    await merger.save(`public/merged/${time}_merged.pdf`); //save under given name and reset the internal document
  
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
}

export { mergePDFs };