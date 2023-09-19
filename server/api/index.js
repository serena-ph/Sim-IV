const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/posts', async (req,res,next)=>{
    try{
       const allPosts = await prisma.post.findMany();
       res.send(allPosts)
    }catch(err){
        next(err)
    }
})

router.get('/posts/:id', async (req,res,next)=>{
    try{
        const post = await prisma.post.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(post)
    }catch(err){
        next(err)
    }
})

router.post('/posts', async (req,res,next)=>{
    try{
        const post = await prisma.post.create({
            data:req.body
        })
        res.send(post)
    }catch(err){
        next(err)
    }
})

router.delete('/posts/:id', async (req,res,next)=>{
    try{
        const product = await prisma.post.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.send(post)
    }catch(err){
        next(err)
    }
})


router.put('/posts/:id', async (req,res,next)=>{
    try{
        const product = await prisma.post.update({
            where:{
                id: Number(req.params.id)
            },
            data:req.body
        })
        res.send(product)
    }catch(err){
        next(err)
    }
})

module.exports = router;