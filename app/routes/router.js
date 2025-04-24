const express = require('express')
const router = express.Router()
const axios = require('axios')
const port = process.env.port || 3000

router.use(express.static('public'))

// root route
router.get('/api', (req, res)=> {
    res.json({
        "all users": `http://localhost:${port}/api/user`
    })
})

router.use('/api/user', require('./api/userRoutes'))

router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'Home',
        name: 'Home'
    })
})

// all users
router.get('/user', (req, res)=> {

    const url = `http://localhost:${port}/api/user`

    axios.get(url)
        .then(resp => {
            res.render('pages/allUser', {
                title: 'Users',
                name: 'All Users',
                data: resp.data
            })
        })
})

//userForm
router.get('/userForm', (req, res)=> {

    res.render('pages/userForm', {
        title: 'Create Account',
        name: 'Create Account'
    })
})




module.exports = router
