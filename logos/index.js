const fs = require("fs");
const path = require("path");

const directoryPath = ".";

fs.readdir(directoryPath, (error, files) => {
  if (error) {
    console.error(error);
  } else {
    files.forEach((file, index) => {
      if (path.extname(file) === ".png") {
        const filePath = path.join(directoryPath, file);
        fs.readFile(filePath, (error, data) => {
          if (error) {
            console.error(error);
          } else {
            ////////////////////////////////////////////////////////
            const base64data = Buffer.from(data).toString("base64");

            const datum = {
              base64: `data:image/png;base64,${base64data}`,
            };

            fs.writeFile(`${file.replace('.png','')}.json`, JSON.stringify(datum), (error) => {
              if (error) {
                console.error(error);
              } else {
                console.log(`${file.replace('.png','')}.json`);
              }
            });
            ////////////////////////////////////////////////////////
          }
        });
      }
    });
  }
});
