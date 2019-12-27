const fs = require('fs');
const path = require('path');
const PDF2Pic = require('pdf2pic');
var log = require('single-line-log').stdout;
const directory = require('./directory.json');

fs.readdir('../DROP_PDF_HERE', (err, files) => {
    if(err) throw err;
    var count = 0;
    files.forEach((file, index) => {
        var fromPath = path.join('../DROP_PDF_HERE', file);
        
        fs.stat(fromPath, (error, stat) => {
            if (error) throw error;

            if(stat.isFile()){
                log(`Processing file... ${file}`);
                const pdf2pic = new PDF2Pic ({
                    density: 100,              // output pixels per inch
                    savename: file,            // output file name
                    savedir: directory.savedir,// output file location
                    format: "jpg",             // output file format
                    size: "2096x2096"          // output size in pixels
                });

                pdf2pic.convert(fromPath).then((resolve) => {
                    count++;
                    log(`(${count}) images converted successfully!`);
                    return resolve;
                }).catch(err => console.log(err));
            }
        });
    });
});