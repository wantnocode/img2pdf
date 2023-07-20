import { PDFDocument, StandardFonts } from 'pdf-lib';
import { promises as fs } from 'fs';
import { config } from './config.js'



async function convertJpgToPdf() {
  try {
    
    const pdfDoc = await PDFDocument.create();
    await Promise.all(
      config.imgList.map(async (imagePath) => {
        
        const jpgData = await fs.readFile(imagePath);

        const page = pdfDoc.addPage();

        const jpgImage = await pdfDoc.embedJpg(jpgData);

        page.drawImage(jpgImage, {
          x: 0,
          y: 0,
          width: page.getWidth(),
          height: page.getHeight()
        });
      })
    );

  
    // 保存 PDF 文档到文件
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile('output.pdf', pdfBytes);

    console.log('转换为PDF成功！');
  } catch (error) {
    console.log('转换出错：', error);
  }
}

convertJpgToPdf();