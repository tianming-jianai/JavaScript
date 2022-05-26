const express = require('express')
const { json } = require('express/lib/response')
const fs = require('fs')
const { title } = require('process')
const { getDb, saveDb } = require('./db')

const app = express()
// 解析表单请求体 application/json
app.use(express.json())
// 解析表单请求体 application/x-www-form-urlencoded
app.use(express.urlencoded())
// 注意：实际开发中只给客户端配置一种数据传输格式：从一而终

// 查询任务列表
app.get('/todos', async (req, res) => {
    // 1)
    // res.send('get /todos')

    // 2)
    // web开发中能用异步api就不要用同步api，同步阻塞，影响请求数量
    /*fs.readFile('./crud.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({
                "error": err.message
            })
        }
        const db = JSON.parse(data)
        res.status(200).json(db.todos)
    })*/

    // 3)
    try {
        const db = await getDb()
        res.status(200).json(db.todos)
    } catch (err) {
        res.status(500).json({
            "error": err.message
        })
    }

})

// 根据id查询单个任务
app.get('/todos/:id', async (req, res) => {
    // res.send(`get /todos/${req.params.id}`)

    /*
    fs.readFile('./crud.json', (err, data) => {
        if (err) {
            res.status(500).json({
                "error": err.message
            })
        }
        const db = JSON.parse(data)
        const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
        if (!todo) {
            return res.status(404).end()
        }
        res.status(200).send(todo)
    })
    */

    try {
        const db = await getDb()
        const todo = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
        if (!todo) {
            return res.status(404).end()
        }
        res.status(200).json(todo)
    } catch (err) {
        res.status(500), json({
            error: err.message
        })
    }
})

// 添加任务
app.post('/todos', async (req, res) => {
    // res.send('post /todos')

    // 1. 获取客户端请求参数
    // 2. 数据验证
    // 3. 数据验证通过，把数据存储到 db 中
    const todo = req.body
    console.log(req.body)

    if (!todo.title) {
        return res.status(422).json({
            error: 'The field title is required.'
        })
    }

    try {
        const db = await getDb()
        const lastTodo = db.todos[db.todos.length - 1]
        todo.id = lastTodo ? lastTodo.id + 1 : 1
        db.todos.push(todo)
        await saveDb(db)
        res.status(200).json(todo)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


    res.send('post ')
})

// 修改任务
app.patch('/todos/:id', async (req, res) => {
    // res.send('patch /todos')

    try {
        // 1. 获取表单数据
        const todo = req.body
        // 2. 查找要修改的任务项
        const db = await getDb()
        const ret = db.todos.find(todo => todo.id === Number.parseInt(req.params.id))
        if (!ret) {
            return res.status(404).end()
        }
        console.log(todo)
        // 合并
        Object.assign(ret, todo)

        // 存储数据
        await saveDb(db)
        res.status(201).json(ret)
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

})

// 删除任务
app.delete('/todos/:id', async (req, res) => {
    // res.send('delete /todos')

    try {
        const todoId = Number.parseInt(req.params.id)
        const db = await getDb()
        const index = db.todos.findIndex(todo => todo.id === todoId)
        if (index === -1) {
            return res.status(404).end()
        }
        // 删除一个
        db.todos.splice(index, 1)
        await saveDb(db)
        res.status(204).end()
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})


app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/')
})