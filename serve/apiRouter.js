const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

let databasesName = 'final'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: databasesName
})

db.connect(err => {
    if (err) throw err
    console.log(`连接数据库${databasesName}成功`)
})

//上传图片
router.post('/imgUpload', upload.array('img', 1), (req, res) => {
    let file = req.files;
    console.log("图片信息", file[0])
    let fileInfo = {}
    fileInfo.type = file[0].mimetype;
    fileInfo.name = file[0].originalname;
    fileInfo.size = file[0].size;
    fileInfo.path = 'http://localhost:3000/img/' + file[0].filename
    res.send({
        code: 0,
        value: '图片上传成功',
        data: fileInfo
    })
})

//后台接口-----------------------
//添加用户
router.post('/addUser', (req, res) => {
    let postData = req.body
    let userPass = postData.userPass
    let userImg = postData.userImg
    let userName = postData.userName
    let userAccount = postData.userAccount

    let sql =
        `insert into user (userImg,userName,userPass,userAccount) values( '${userImg}','${userName}','${userPass}','${userAccount}');`
    console.log('执行：' + sql)
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                code: 200,
                msg: "数据保存成功"
            })
            console.log("数据保存成功")
        }
    })
})
//查询用户
router.get('/getUser', (req, res) => {
    let sql = 'SELECT * FROM user;'
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                code: 200,
                msg: "数据查询成功",
                data: result
            })
        }
    })
})
//删除用户
router.get('/deteuser', (req, res) => {
    let id = req.query.id
    console.log("id", id)
    let sql = `delete from user where userId = ${id} `
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                code: 200,
                msg: "数据删除成功"
            })
            console.log("数据删除成功")
        }
    })
})
router.post('/addSentence',(req,res)=>{
    let content = req.body.content
    console.log('req.body',req.body)
    let sql =
    `insert into sentence (content) values( '${content}');`
console.log('执行：' + sql)
db.query(sql, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        res.send({
            code: 200,
            msg: "数据保存成功"
        })
        console.log("数据保存成功")
    }
})
})

router.get('/getSentence', (req, res) => {
    let sql = 'SELECT * FROM sentence;'
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                code: 200,
                msg: "数据查询成功",
                data: result
            })
        }
    })
})

router.get('/deteSentence', (req, res) => {
    let id = req.query.id
    console.log("id", id)
    let sql = `delete from sentence where senId = ${id} `
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                code: 200,
                msg: "数据删除成功"
            })
            console.log("数据删除成功")
        }
    })
})

//前台接口--------------------------------------------------
//前台登陆
router.post('/login', (req, res) => {
    let account = req.body.userName
    let pass = req.body.password

    let sql = `SELECT userName,userImg FROM user where userAccount = ${account} and userPass = ${pass};`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            if (result.length) {
                res.send({
                    code: 200,
                    msg: "登陆成功",
                    data: result
                })
            }
            else{
                res.send({
                    code: 200,
                    msg: "登陆失败，账号或密码错误",
                    data: result
                })
            }

        }
    })

})


module.exports = router