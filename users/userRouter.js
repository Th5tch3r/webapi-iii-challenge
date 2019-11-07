const express = 'express';

const router = express.Router();
const Users = require('./userDb');
const Post = require('../posts/postDb');

//Add a user to db
//Requires a name
router.post('/', (req, res) => {
    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "User needs a name"})
        })
});

//Add a post to a user's account 
router.post('/:id/posts', (req, res) => {
    Post.insert(req.body)
        .then( post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error adding post"})
        })
});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
