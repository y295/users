
var express = require('express');
var router = express.Router();
// const multiparty = require('multiparty');
const multer = require('multer')
const fs = require('fs')
const body_parse = require('body-parser')


let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var changedName = (req.body.id + "-" + new Date().getTime()) + '-' + file.originalname;
            cb(null, changedName);
        }
    })
});


module.exports = app => {
    // 登录
    app.use(body_parse.urlencoded({ extended: true }))
    app.use(body_parse.json())

    app.post('/web/api/login', async (req, res) => {
        //   console.log(req.body);
        const { username, password } = req.body
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const filterUser = currFileObj.filter(v => {
            return v.username == username
        })
        if (filterUser.length) {
            if (filterUser[0].password == password) {
                res.send({
                    status: 0,
                    message: "登录成功"
                })
            } else {
                res.status(422).send({
                    message: "用户名或密码错误"
                })
            }
        } else {
            res.status(422).send({
                message: "用户名或密码错误"
            })
        }

    })

    //注册
    app.post('/web/api/register', async (req, res) => {
        const { username, email } = req.body
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const filterUser = currFileObj.filter(v => {
            return v.username == username
        })
        const filterEmail = currFileObj.filter(v => {
            return v.email == email
        })
        if (!filterUser.length && !filterEmail.length) {
            if (currFileObj.length) {
                req.body.id = currFileObj[currFileObj.length - 1].id + 1
            } else {
                req.body.id = 1
            }
            currFileObj.push(req.body);
            fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
            res.send({
                status: 0,
                message: "注册成功"
            })
        } else {
            if (filterUser.length) {
                res.status(422).send({
                    message: "用户名已存在"
                })
            } else {
                res.status(422).send({
                    message: "邮箱已使用"
                })
            }

        }
    })

    //获取用户列表
    app.get('/web/api/userList', async (req, res) => {
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const data = currFileObj;
        res.send(data)
    })

    app.get('/web/api/userListMobile/:listLength', async (req, res) => {
        const listLength = parseInt(req.params.listLength);
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const end = listLength + 10;
        const data = currFileObj.slice(listLength, end);
        res.send(data)

    })

    //新建用户
    app.post('/web/api/addUsers', async (req, res) => {
        const { username, email } = req.body
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const filterUser = currFileObj.filter(v => {
            return v.username == username
        })
        const filterEmail = currFileObj.filter(v => {
            return v.email == email
        })
        if (!filterUser.length && !filterEmail.length) {
            if (currFileObj.length) {
                req.body.id = currFileObj[currFileObj.length - 1].id + 1
            } else {
                req.body.id = 1
            }

            currFileObj.push(req.body);
            fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
            res.send({
                status: 0,
                message: "新建成功"
            })
        } else {
            if (filterUser.length) {
                res.status(422).send({
                    message: "用户名已存在"
                })
            } else {
                res.status(422).send({
                    message: "邮箱已使用"
                })
            }

        }
    })

    //获取用户详情
    app.get('/web/api/getUser/:id', async (req, res) => {
        const id = req.params.id
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const data = currFileObj.filter(v => {
            return v.id == id
        })
        res.send(data[0])
    })

    //修改用户资料
    app.post('/web/api/editUsers/:id', async (req, res) => {
        const id = req.params.id
        const { username, email } = req.body
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const filterUser = currFileObj.filter(v => {
            if (v.id != id) {
                return v.username == username
            }
        })
        const filterEmail = currFileObj.filter(v => {
            if (v.id != id) {
                return v.email == email
            }
        })
        if (!filterUser.length && !filterEmail.length) {

            //   currFileObj.forEach((x, index, arr) => {
            //     if (x.id == id) {
            //       arr[index] = req.body
            //     }
            //   });
            for (let index = 0; index < currFileObj.length; index++) {
                if (currFileObj[index].id == id) {
                    currFileObj[index] = req.body
                    break
                }
            }
            // console.log(currFileObj)
            fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
            res.send({
                status: 0,
                message: "修改成功"
            })

        } else {
            if (filterUser.length) {
                res.status(422).send({
                    message: "用户名已存在"
                })
            } else {
                res.status(422).send({
                    message: "邮箱已使用"
                })
            }

        }
    });

    //删除用户
    app.delete('/web/api/delete/:id', async (req, res) => {
        const id = req.params.id
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        currFileObj.forEach((x, index, arr) => {
            if (x.id == id) {
                arr.splice(index, 1)
            }
        });
        fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
        res.send({
            status: 0,
            message: "删除成功"
        })
    })

    //搜索结果
    app.get('/web/api/searchList/:value', async (req, res) => {
        const value = req.params.value
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const data = currFileObj;
        const filterUser = currFileObj.filter(v => {
            return v.username.includes(value)
        })
        res.send(filterUser)
    })

    //   router.post('/changePhoto', function (req, res) {
    //     // console.log(req);
    //     /* 生成multiparty对象，并配置上传目标路径 */
    //     let form = new multiparty.Form();
    //     /* 设置编辑 */
    //     form.encoding = 'utf-8';
    //     //设置文件存储路劲
    //     form.uploadDir = '../dist/img';
    //     //设置文件大小限制
    //      form.maxFilesSize = 2 * 1024 * 1024;
    //     console.log(req);
    //     form.parse(req, function (err, fields, files) {
    //         try {
    //           console.log(fields);
    //         console.log(files)
    //         let inputFile = files.file[0];
    //         let uploadedPath = inputFile.path;
    //         let newPath = form.uploadDir + "/" + inputFile.originalFilename;
    //         //同步重命名文件名 fs.renameSync(oldPath, newPath)
    //         fs.renameSync(inputFile.path, newPath);
    //         res.send({ data: "上传成功！" });
    //         //读取数据后 删除文件
    //         // fs.unlink(newPath, function () {
    //         //   console.log("删除上传文件");
    //         // })
    //       } catch (err) {
    //         console.log(err);
    //         res.send({ err: "上传失败！" });
    //       };
    //     })

    //   })


    router.post('/changePhoto', upload.single('file'), (req, res) => {
        const id = req.body.id
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);

        for (let index = 0; index < currFileObj.length; index++) {
            if (currFileObj[index].id == id) {
                currFileObj[index].photoPath = req.file.path
                break
            }
        }
        // currFileObj.every((x, index, arr) => {
        //     console.log(x.id);
        //     if (x.id == id) {
        //         arr[index].photoPath = req.file.path
        //         return true
        //     }
        // })
        fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
        res.send({
            path: req.file.path
        })
        // res.json({
        //     code: '0000',
        //     type: 'single',
        //     originalname: req.file.originalname,
        //     path: req.file.path
        // })
    });

    router.get("/getPhoto/:username", async (req, res) => {
        const username = req.params.username
        const currFile = fs.readFileSync('./user/user.json');
        const currFileObj = JSON.parse(currFile);
        const data = currFileObj.filter(v => {
            return v.username == username
        })
        res.send(data[0].photoPath)
    })

    app.use("/web/api", router)
}

