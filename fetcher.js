const request = require('request'); // node request module
const fs = require('fs'); // node fs module

const args = process.argv.slice(2); // command line arguments
const url = args[0];
const path = args[1];

request(url, (error, response, body) => {
  if (!path) { // code to execute if no path passed as arg
    console.log('ERROR: no path input!');
    process.exit();
  }

  if (error || response.statusCode !== 200) { // code to execute if error occurred
    console.log('statusCode:', response && response.statusCode); // print the response error
    console.log('Something wrong with your URL!');
    process.exit();
  }
  
  fs.writeFile(path, body, (err) => { // writing file
    if (err) throw err; // if error occurs error will be thrown


    const stats = fs.statSync(path); // accessing stats on file written
    const bytes = stats.size; // getting the byte size downloaded

    console.log(`Downloaded and saved ${bytes} bytes to ${path}`); // console.log final output
  });

});