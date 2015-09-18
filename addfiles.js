var fs = require('fs');
var readdir = require('recursive-readdir');

var tsconfig = require('./tsconfig.json');
readdir('./src', function (e, files) {
  tsconfig.files = files.filter(function (file) {
    var len = file.length
    return file.substr(len - 3) === '.ts' && file.substr(len - 5) !== ".d.ts";
  });

  fs.writeFile('./tsconfig.json', JSON.stringify(tsconfig,null,2), function () {
    console.log('%s files added',tsconfig.files.length);
  });
})

