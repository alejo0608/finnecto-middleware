const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../results/results.jsonl');

function appendResultToFile(result) {
  const jsonLine = JSON.stringify(result) + '\n';
  fs.appendFile(filePath, jsonLine, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    }
  });
}

module.exports = { appendResultToFile };
