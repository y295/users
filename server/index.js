const express = require('express')
const cors = require('cors')
const app = express()

// 允许跨域
app.use(cors())
// app.all("*", function (req, res, next) {
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin", "*");
//     //允许的header类型
//     res.header("Access-Control-Allow-Headers", "content-type");
//     //跨域允许的请求方式 
//     res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
//     if (req.method.toLowerCase() == 'options')
//         res.send(200);  //让options尝试请求快速结束
//     else
//         next();
// })
// app.use(express.json())

app.use('/', express.static(__dirname + '/dist'))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen('3000', async(req, res) => {
  console.log("http://localhost:3000")
})

require('./routers/index')(app)
