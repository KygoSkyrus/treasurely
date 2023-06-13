const express = require('express');
const router = express('router');
const dotenv = require('dotenv');

const URLS = require('../models/urls');

dotenv.config({ path: './.env' });


// Authorization middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('tt', token)
    if (!token || token !== `Bearer ${process.env.SECRET_KEY}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};


//add url api 
router.post('/api/add_url', authenticateToken, async (req, res) => {
    const { url } = req.body

    const urlRes = new URLS({ url })
    urlRes.save()
        .then(response => {
            console.log(response)
            res.send(true)
        })
        .catch(err => {
            console.log(err)
            res.send(flase)
        })
})


//get url api 
router.get('/api/get_url', authenticateToken, async (req, res) => {

    await URLS.find({})
        .then(resp => {
            console.log(resp)
            let response = resp.filter(x => !x.isTrashed)//only not trashed urls
            res.send({ response })
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})


//delete url api 
router.post('/api/trash_url', authenticateToken, async (req, res) => {
    const { param } = req.body

    try {
        console.log('utrr', param)
        let result = await URLS.findOneAndUpdate({ _id: param.id }, { isTrashed: true }, { new: true })
        if (result) {
            res.send({ isTrashed: true })
        } else {
            res.send({ isTrashed: false })
        }
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})


//signin
router.post("/api/login", async (req, res) => {
    const credentials = req.body;
  
    try {
    //   const result =await ADMIN.findOne({ username: credentials.username, password: credentials.password })
    //   if (result) {
    //     if (
    //       credentials.username === result.username &&
    //       credentials.password === result.password
    //     ) {
    //       res.send({ matched: true });
    //     }
    //   } else {
    //     res.send({ matched: false });
    //   }
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;