const {generateRandomString} = require('utils');

for (let i = 0; i < 32; i++) {
  const id = generateRandomString()
  console.log(id)
}
