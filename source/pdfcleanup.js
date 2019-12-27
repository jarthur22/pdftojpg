const fs = require('fs');
const path = require('path');
var log = require('single-line-log').stdout;

var count = 0;
fs.readdir('../DROP_PDF_HERE', (err, files) => {
    if(err) throw err;
    files.forEach((file, index) => {
        var fromPath = path.join('../DROP_PDF_HERE', file);
        
        fs.stat(fromPath, (error, stat) => {
            if (error) throw error;

            if(stat.isFile()){
                log(`Deleting pdfs....${file}`);
                try{
                    fs.unlinkSync(fromPath);
                    count++;
                }
                catch(err){
                    log(err);
                }
            }
        });
    });
});
