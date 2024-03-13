const mongoose = require('mongoose')

const Wish = require('../models/wish')

exports.wishesGetAll = (req,res,next)=>{
    Wish.find().exec().then(docs=>{
        res.status(200).json({
            count:docs.length,
            data:docs
        })
    }).catch(err=>{
        res.status(404).json({error:err})
    })
}

exports.wishesGetOneById = (req,res,next)=>{
    Wish.findById(req.params.wishId).exec().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(404).json({error:err})
    })
}

exports.wishesPostOne = (req,res,next)=>{
    const wish = new Wish({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        description:req.body.description,
        link:req.body.link,
        userId:req.body.userId

    })
    wish.save().then(result=>{
        res.status(201).json(result)
    }).catch(err=>{
        res.status(404).json({error:err})
    })
}

exports.wishesOfUserByUserId = (req,res,next)=>{
    Wish.find({userId:req.params.userId}).exec().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(404).json({error:err})
    })
}

exports.wishesDeleteOneById = (req,res,next)=>{
    Wish.deleteOne({_id:req.params.wishId}).exec().then(result=>{
        res.status(200).json({message:'deleted wish'})
    }).catch(err=>{
        res.status(404).json({error:err})
    })
}

exports.wishesPatchOneById = (req,res,next)=>{
    Wish.findOneAndUpdate({_id:req.params.wishId},{$set:req.body}, {new:true}).exec().then(result=>{
        res.status(200).json({
            message:'updated',
            data:result
        })
    }).catch(err=>{
        res.status(404).json({error:err})
    })
}



