const express = require('express');
const router = express('router');
const dotenv = require('dotenv');

const URLS = require('../models/urls');
const BIN = require('../models/bin');

dotenv.config({ path: './.env' });


//add url api 
router.post('/api/add_url', async (req, res) => {
    const { url } = req.body

    const urlRes = new URLS({ url })
    urlRes.save()
    .then(response=>{
        console.log(response)
        res.send(true)
    })
    .catch(err=>{
        console.log(err)
        res.send(flase)
    })
})


//get url api 
router.get('/api/get_url', async (req, res) => {
    // const { url } = req.body

    // console.log('utrr',url)
   await URLS.find({}) 
    .then(response=>{
        console.log(response)
        res.send({response})
    })
    .catch(err=>{
        console.log(err)
        res.send(err)
    })
})


//delete url api 
router.post('/api/delte_url', async (req, res) => {
     const { url } = req.body

    console.log('utrr',url)
//    await URLS.find({}) 
//     .then(response=>{
//         console.log(response)
//         res.send({response})
//     })
//     .catch(err=>{
//         console.log(err)
//         res.send(err)
//     })
})


//add authorization

module.exports = router;