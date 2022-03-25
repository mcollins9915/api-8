const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default:fetch})=> fetch(...args))

router.get('/', (req,res)=> {
    const URL = 'https://api.sampleapis.com/avatar/characters'
    fetch(URL)
    .then(res => res.json())
    .then(data => {
        res.render('pages/characters', {
            title: 'ALL Charaters',
            name: 'Charater List',
            data
        })
    })
})

router.get('/:id', (req,res)=> {
    const id = req.params.id
    const URL = `https://api.sampleapis.com/avatar/characters/${id}`

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        if(Object.keys(data).length >= 1) {
            res.render('pages/single-characters', {
                title: `${data.title}`,
                name: `${data.title}`,
                data
            })
        } else {
            res.render('pages/404', {
                title: '404 Error - Page not found',
                name: '404 Error'
            })
        }
    })
    .catch(error => {
        console.log('ERROR', error)
    })
})

module.exports = router