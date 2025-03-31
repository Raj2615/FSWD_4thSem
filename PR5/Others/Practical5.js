const fs = require('fs');
const path = require('path');

const directoryPath = "E:/4th Sem/FS/PR5";

console.log("Checking directory:", directoryPath);

if (!fs.existsSync(directoryPath)) {
    console.error(" Error: Directory does not exist. Please check the path.");
    process.exit(1);
}

function organizeFiles(directoryPath) {
    const categories = {
        Images: ['.jpg', '.jpeg', '.png', '.gif'],
        Documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx'],
        Videos: ['.mp4', '.avi', '.mkv'],
        Others: []
    };

    const summary = [];

    fs.readdirSync(directoryPath).forEach(file => {
        const filePath = path.join(directoryPath, file);
        
        if (!fs.statSync(filePath).isFile()) return;

        const fileExt = path.extname(file).toLowerCase();
        let folderName = 'Others';

        for (const [category, extensions] of Object.entries(categories)) {
            if (extensions.includes(fileExt)) {
                folderName = category;
                break;
            }
        }

        const folderPath = path.join(directoryPath, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        let newFilePath = path.join(folderPath, file);

        let counter = 1;
        while (fs.existsSync(newFilePath)) {
            const name = path.basename(file, fileExt);
            newFilePath = path.join(folderPath, `${name}(${counter})${fileExt}`);
            counter++;
        }

        fs.renameSync(filePath, newFilePath);
        summary.push(`${file} -> ${folderName}`);
    });

    const summaryFilePath = path.join(directoryPath, 'summary.txt');
    fs.writeFileSync(summaryFilePath, summary.join('\n'));

    console.log("✅ Files organized successfully. Summary saved to summary.txt\n");
    console.log(fs.readFileSync(summaryFilePath, 'utf8'));
}

organizeFiles(directoryPath);
