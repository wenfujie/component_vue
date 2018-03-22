var formidable = require('formidable');
var path = require("path");

var Upload = function () {};
Upload.prototype = {
  constructor: Upload,

  form: function (req, callBack) {
    var options = {
      multiples: true,
      encoding: 'utf-8',
      uploadDir: 'static/temp',
      keepExtensions: true,//保留后缀
      maxFieldsSize: 2 * 1024 * 1024//限制所有存储表单字段域的大小（除去file字段），如果超出，则会触发error事件，默认为2M
    };
    var form = new formidable.IncomingForm(options);
    form.parse(req, function (err, fileds, files) {
      if (err){
        callBack('error');
        return
      }

      var file, name;
      for (var key in files) {
        file = files[key];
        name = key;
        break;
      }

      var url=path.normalize(file.path);
      //  var url = file.path.replace(/\\/g, "/")
      url = url.replace(/public/, "").replace(/\\/g,"/");
      callBack({url: url, name: name, file: file,fileds:fileds});
    });
  }
}
module.exports = Upload;
