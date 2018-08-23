const express=require('express') ;
const fs=require('fs') ;
const path=require('path') ;
const multer=require('multer') ;
const fun = require('./func');
const app = express();

app.use(express.static('public'));

//上传文件
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/public/data/'))
  },
  filename: function (req, file, cb) {
      cb(null, fun.rename(file.originalname))
  }
})
let upload = multer({ storage: storage })

//展示文件夹信息
app.get('/list', function (req, res) {
  res.writeHead(200,{'Content-type':'application/json;charset=utf-8'});
  let files= fs.readdirSync(path.join(__dirname,'/public/data'));
  let data= JSON.stringify(files);
  res.end(data);
});

//上传文件
app.post('/upload', upload.single('file'), function (req, res, next) {
  res.redirect('http://localhost:3000/');
})

//下载文件
app.get('/down', function (req, res) {
  let { url } = req;
  let params = fun.parse(url);
  if(!params) {
      res.send('404');
      return;
  }
  res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename='+params.file
     });
  res.sendFile(path.join(__dirname,'/public/data/',params.file));
});


app.listen(8000, function () { 
  console.log('Example app listening at http://localhost:8000' );
});