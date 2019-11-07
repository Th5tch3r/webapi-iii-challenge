const express = 'express';

const router = express.Router();
const Users = require('./userDb');
const Post = require('../posts/postDb');

//Add a user to db
//Requires a name
router.post('/', validateUser, (req, res) => {
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
router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
    Post.insert(req.body)
        .then( post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error adding post"})
        })
});

//Getting back all users
router.get('/', (req, res) => {
    Users.get(req.query)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(501).json({message: "Error listing users"})
        });
});

//Get users by their ID
router.get('/:id', validateUserId, (req, res) => {
    Users.getById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(501).json({message: "Error listing this user"})
        })
});

//Get a user's posts
router.get('/:id/posts', validateUserId, (req, res) => {
    Users.getUserPosts(req.params.id)
        .then(posts => {
            res.status(201).json(posts);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error getting this user's posts"})
        })
});

//deleting a user
router.delete('/:id', validateUserId, (req, res) => {
    Users.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: "User has been deleted"});
            } else {
                res.status(404).json({message: "User could not be found"});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Error deleting the user."})
        })
});

//Editing a user
router.put('/:id', [validateUser, validateUserId], (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Users.update(id, changes)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Error updating user"})
        });
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
