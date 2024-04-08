const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


exports.userSignUp = (req,res,next)=>{//saves password in hash
    User.find({email:req.body.email}).exec().then(user=>{
        if(user.length>=1){
            return res.status(409).json({message:'this user already exists'})
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(409).json({error:err})
                } else{
                    const user = new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        name:req.body.name,
                        password:hash
                        

                    })
                    user.save().then(result=>{
                        res.status(201).json({message:'user created'})
                    }).catch(err=>{
                        res.status(409).json({error:err})
                    })
                }
            })
        }

    })
}

exports.userLogIn = (req, res, next) => {//compares passwords in hash and if ok gives token
    User.findOne({ email: req.body.email }).exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({ message: 'auth failed' })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: 'auth failed' })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id,
                        name: user.name
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "12h"
                    })
                return res.status(200).json({ message: 'auth succesful', token: token })
            }
            return res.status(401).json({ message: 'auth failed' })
        })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userGetAll = (req,res,next)=>{
    User.find().exec().then(result=>{
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userGetOneById = (req,res,next)=>{
    User.findById(req.params.userId).exec().then(result=>{
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userDeleteOneById = (req,res,next)=>{
    User.deleteOne({_id:req.params.userId}).exec().then(result=>{
        res.status(200).json({message:'user deleted'})
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userPatchOneById  = (req,res,next)=>{
    User.findOneAndUpdate({_id:req.params.userId},{$set:req.body}, {new:true}).exec().then(result=>{
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userAddFollow = (req,res,next)=>{
    User.findById(req.params.userId).exec().then(user=>{
        let userFollows = user.follows
        let index = userFollows.indexOf(req.body.newFollow)
        
        if(index==-1){
            userFollows.push(req.body.newFollow)
            user.follows = userFollows
            user.save().then(
                res.status(200).json({message:'updated user follows'})
            ).catch(err=>{
                return res.status(409).json({error:err})
            })
            //update user
        }else{
            return res.status(404).json({message:'user this user already in follows'})
        }
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userRemoveFollow = (req, res, next) => {
    User.findById(req.params.userId)
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            let userFollows = user.follows;
            let index = userFollows.indexOf(req.body.newFollow);

            if (index === -1) {
                return res.status(404).json({ message: 'This user is already not in follows' });
            } else {
                userFollows.splice(index, 1);
                user.follows = userFollows;
                user.save()
                    .then(() => {
                        return res.status(200).json({ message: 'Updated user follows' });
                    })
                    .catch(err => {
                        return res.status(409).json({ error: err });
                    });
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err });
        });
};

exports.userFindByName = (req,res,next)=>{
    const regex = new RegExp(req.body.query,'i')
    User.find({name:regex}).limit(20).exec().then(response=>{
        res.status(200).json(response)
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

exports.userGetFriends = (req,res,next)=>{
    User.findById(req.params.userId)
    .populate('follows') // Populate the 'follows' field to get details of the users being followed
    .then(user => {
        if (!user) {
            console.log('User not found');
            return;
        }

        // Extract the users being followed from the user's document
        const followedUsers = user.follows;

        console.log('Followed Users:', followedUsers);

        // Respond with the followed users
        res.status(200).json({ followedUsers });
    })
    .catch(error => {
        console.error('Error:', error);

        // Respond with an error message
        res.status(500).json({ error: 'Internal server error' });
    });
}



