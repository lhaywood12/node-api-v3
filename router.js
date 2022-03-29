const express = require('express')
const router = express.Router()
const fetch = (...args) => import(`node-fetch`).then(({default:fetch}) => fetch(...args))
const PORT = process.env.PORT || 3000

router.use(express.static('public'))

//Home router
router.get('/', (req, res) => {
    res.render('pages/home', {
        title:'Home',
        name: 'Sakila Home Page'
    })
})

router.get('/film', (req, res)=> {
    const url = `http://localhost:${PORT}/api/customer`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/film', {
            title: 'Films',
            name: 'Sakila Films',
            data
        })
    })
})

router.get('/customer', (req, res)=> {
    const url = `http://localhost:${PORT}/api/customer`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/customer', {
            title: 'Customers',
            name: 'Sakila Customers',
            data
        })
    })
})

router.get('/customer/:id', (req, res)=> {
    const id = req.params.id
    const url = `http://localhost:${PORT}/api/customer/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/customer-single', {
            title: `${data.last_name} ${data.first_name}`, 
            name: `${data.first_name} ${data.last_name}`,
            data 
        })
    })
})

router.get('/film/:id', (req, res)=> {
    const id = req.params.id
    const url = `http://localhost:${PORT}/api/film/${id}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('pages/film-single', {
            title: `${data.film_title}`,
            name: `${data.film_name}`,
            data
        })
    })
})

router.get('*', (req, res)=> {
    if(req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.send('<h1>404 ERROR This page does not exist</h1>')
    }
})

module.exports = router