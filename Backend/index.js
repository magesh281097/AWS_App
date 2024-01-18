const express = require('express')
const fs = require('fs');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser')

var txtData = "";
const filePath = 'example.txt';

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send("Worlds");
})

app.post('/insert', (req, res) => {
  txtData = req.body;
  console.log(txtData);

  fs.readFile(filePath, { encoding: 'utf-8' }, function (err, fileData) {
    if (fileData) {
      console.log('received data: ' + fileData);
      let insertData = JSON.parse(fileData)
      console.log(typeof insertData);
      insertData.push(txtData);
      // console.log(data); 
      fs.open(filePath, 'w+')
      writeToFile(filePath, insertData);
      res.send("Data Saved Successfully");
    } else {
      let formData = [];
      formData.push(txtData);
      writeToFile(filePath, formData);
      res.send("Data Saved Successfully");
    }
  })

})

app.get('/read', (req, res) => {
  fs.readFile(filePath, function (err, data) {
    res.send(data);
  });
})


function writeToFile(filePath, data) {
  // Convert data to a string if it's not already
  const stringData = typeof data === 'string' ? data : JSON.stringify(data, null, 2);

  // Write data to the file
  fs.appendFileSync(filePath, stringData, (err) => {
    if (err) {
      console.error(`Error writing to ${filePath}: ${err}`);
    } else {
      console.log(`Data written to ${filePath} successfully`);
    }
  });
}

// Example usage




const server = app.listen(PORT, () => { console.log('server working') })