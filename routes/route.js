const express = require('express');
const router = express('router');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const URLS = require('../models/urls');

dotenv.config({ path: './.env' });


// Authorization middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
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
            res.send(true)
        })
        .catch(err => {
            console.log(err)
            res.send(flase)
        })
})

router.get('/api/get_url', async (req, res) => {
    const token = req.headers['authorization']; // Extract the token from the request headers

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const { username } = decoded;
        if (username === process.env.ADMIN_USERNAME) {
            // Admin is authorized, proceed to send the protected content
            await URLS.find({})
                .then(resp => {
                    let response = resp.filter(x => !x.isTrashed)//only not trashed urls
                    res.json({ response });
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }

})


//delete url api 
router.post('/api/trash_url', authenticateToken, async (req, res) => {
    const { param } = req.body

    try {
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


router.post('/api/login', authenticateToken, (req, res) => {
    // Verify admin credentials
    const { passCode } = req.body;
    if (passCode === process.env.ADMIN_PSWD) {
        // Generate and return a token
        const token = jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.SECRET_KEY);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


module.exports = router;