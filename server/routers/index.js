module.exports = app => {
  const express = require('express')
  const fs = require('fs')
  // 登录
  app.post('/web/api/login', async (req, res) => {
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
      req.body.id = currFileObj[currFileObj.length-1].id + 1
      currFileObj.push(req.body);
      fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
      res.send({
        status: 0,
        message: "注册成功"
      })
    } else {
      if (filterUser.length) {
        res.status(422).send({
          status: 1,
          message: "用户名存在"
        })
      } else {
       res.status(422).send({
          status: 1,
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
      req.body.id = currFileObj[currFileObj.length-1].id + 1
      currFileObj.push(req.body);
      fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
      res.send({
        status: 0,
        message: "新建成功"
      })
    } else {
      if (filterUser.length) {
        res.status(422).send({
          status: 1,
          message: "用户名存在"
        })
      } else {
       res.status(422).send({
          status: 1,
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
      currFileObj.forEach((x, index, arr) => {
        if (x.id == id) {
          arr[index] = req.body
        }
      });
      // console.log(currFileObj)
      fs.writeFileSync('./user/user.json', JSON.stringify(currFileObj));
      res.send({
        status: 0,
        message: "修改成功"
      })

    } else {
      if (filterUser.length) {
        res.send({
          status: 1,
          message: "用户名已存在"
        })
      } else {
        res.send({
          status: 1,
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
}

