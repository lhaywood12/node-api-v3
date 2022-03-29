//Step 1//
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000
// step 4 add router
const router = require('./router')

//Step 2
//Create Connection of Database
const mysql = require('mysql')
const con = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

//Connection to Database
con.connect((error)=> {
    if(!error) {
        console.log('The database is connected yo...')
    } else {
        console.log('ERROR', error)
    }
})

//Step 3
//Build API
//ROOT ROUTE
server.get('/api', (req, res)=> {
    res.json({
        'All Customers': `http://localhost:${PORT}/api/customer`,
        'All Addresses': `http://localhost:${PORT}/api/address`,
        'All Films': `http://localhost:${PORT}/api/film`,
        'All Categories': `http://localhost:${PORT}/api/category`,
    })
})

//ALL ROUTE

server.get('/api/:field', (req, res)=> {
    const field = req.params.field

    con.query(
        `SELECT * FROM ${field}`,
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('ERROR', error)
            }
        }
    )
})


//SINGLE ROUTE
server.get('/api/:field/:id', (req, res)=> {
    const field = req.params.field
    const id = req.params.id

    con.query(
        `SELECT * FROM ${field} WHERE ${field}_id = ${id}`,
        (error, rows) => {
            if(!error) {
                if (rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('ERROR', error)
            }
        }
    )
})

//Step 4
server.set('view engine', 'ejs')

server.use('/', router)


//Step 1//
server.listen(PORT, ()=> console.log(`Port $ {PORT}`))

