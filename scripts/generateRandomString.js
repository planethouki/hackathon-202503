const fs = require('fs');
const path = require('path');
const {generateRandomString} = require('./utils');

const randomStringList = Array.from({length: 64}, (_, index) => {
  return generateRandomString();
});

fs.writeFileSync(path.join(__dirname, "out.txt"), randomStringList.join("\n"));
