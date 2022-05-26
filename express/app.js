const express = require('express')

const app = express()


app.get('/', (req, res) => {
    console.log(req.url)
    console.log(req.header)
    console.log(req.headers)
    // res.send('Hello World!')

    res.cookie('foo', 'bar')
    res.cookie('a', 'abc')
    res.status(202).send('Hello')
})

app.post('/', (req, res) => {
    console.log('请求参数：', req.query)
    // res.send('Hello World!')

    // res.statusCode = 201
    // res.end()

    // res.write('a')
    // res.write('b')
    // res.write('c')
    // res.end()

    // res.end('Hello world!')

    // res.send({
    //     foo:'bar'
    // })

})

app.put('/user', (req, res) => {
    res.send('put user')
})

app.delete('/user', (req, res) => {
    res.send('deltet user')
})

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/')
})