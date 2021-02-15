const express = require('express')
const level = require('level')

const app = express()
const db = level('db', { valueEncoding: 'json' })
app.use(express.json())

app.get('/', (req, res) => {
    res.send('General Store')
})

app.get('/:key', (req, res) => {
    db.get(req.params.key, (err, value) => {
        if (err) {
            if (err.notFound) {
                return res.status(400).send(`Key not found`)
            }
            console.error(err)
            return res.status(500).send(err)
        }
        res.send(value)
    })
})

app.post('/:key', (req, res) => {
    db.put(req.params.key, req.body, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.send()
    })
})

app.delete('/:key', (req, res) => {
    db.del(req.params.key, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.send()
    })
})

app.listen(3000)