const router = require('express').Router()
const level = require('level')
const db = level('db', { valueEncoding: 'json' })

router.get('/', (req, res) => {
    res.send('General Store')
})

router.get('/:key', (req, res) => {
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

router.post('/:key', (req, res) => {
    db.put(req.params.key, req.body, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.send()
    })
})

router.delete('/:key', (req, res) => {
    db.del(req.params.key, (err) => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.send()
    })
})

module.exports = router