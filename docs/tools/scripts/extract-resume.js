const fs = require('fs');
const mammoth = require('mammoth');

const docxPath = './knowledge/CHRIS_NATTRESS_RESUME.docx';
const outputPath = './resume-content.txt';

mammoth.extractRawText({path: docxPath})
    .then(result => {
        const text = result.value;
        fs.writeFileSync(outputPath, text, 'utf8');
        console.log(`Successfully extracted ${text.length} characters to ${outputPath}`);
        console.log('\n--- RESUME CONTENT ---\n');
        console.log(text);
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
