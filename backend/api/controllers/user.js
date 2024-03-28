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
                        expiresIn: "1h"
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
    User.findById(req.params.userId).exec().then(user => {
        let userFollows = user.follows
        let index = userFollows.indexOf(req.body.newFollow)
        if (index == -1) {
            return req.status(404).json({ message: 'this user already not in follows' })
        } else {
            userFollows.splice(index, 1)
            user.follows = userFollows
            user.save().then(
                res.status(200).json({ message: 'updated user follows' })
            ).catch(err => {
                return res.status(409).json({ error: err })
            })
            
            return req.status(404).json({ message: 'user this user already in follows' })
        }
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}



