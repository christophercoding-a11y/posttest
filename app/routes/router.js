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

// user single
router.get('/user/:id', (req, res)=> {
    const id = req.params.id

    const url = `http://localhost:${port}/api/user/${id}`

    axios.get(url)
        .then(resp => {
            res.render('pages/userSingle', {
                title: `${resp.data.first_name} ${resp.data.last_name}`,
                name: `${resp.data.first_name} ${resp.data.last_name}`,
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



// router.post('/api/user/post', (req, res)=> {
//     axios.post(`http://localhost:${port}/api/user/post`,
//         {
//             first_name: req.body.first_name.toLowerCase(),
//             last_name: req.body.last_name.toLowerCase(),
//             email: req.body.email.toLowerCase(),
//             password: req.body.password,
//             imgUrl: req.body.imgUrl
//         }
//     ).then(resp => {
//         console.log('this works!', resp)
//     }).catch(err => {
//         console.log(err)
//     })
// })


// editPassword
router.get('/editPassword/:userId', (req, res)=> {
    const userId = req.params.userId

    res.render('pages/editPassword', {
        title: 'Edit Password',
        name: 'Edit Password',
        userId
    })
})




module.exports = router
