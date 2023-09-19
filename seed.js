const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require("bcrypt");

const users = [
    {username: "cat-tastrophy", password: "cat"},
    {username: "chris", password: "123"},
    {username: "serena", password: "456"},
]

const posts = [
    {title: "post1", text:"blah blah", authorId:1},
    {title: "post2", text:"blah blah", authorId:1},
    {title: "post3", text:"blah blah", authorId:1},
    {title: "post4", text:"blah blah", authorId:2},
    {title: "post5", text:"blah blah", authorId:2},
    {title: "post6", text:"blah blah", authorId:2},
    {title: "post7", text:"blah blah", authorId:3},
    {title: "post8", text:"blah blah", authorId:3},
    {title: "post9", text:"blah blah", authorId:3},
]


async function seed(){
const SALT_ROUNDS = 5;
    await Promise.all(
        users.map(async (user) =>{
            const hashedPassword = await bcrypt.hash(user.password,  SALT_ROUNDS);
            await prisma.user.create({
                data: {
                    username: user.username,
                    password: hashedPassword
                }
            })
        })
    )
    await Promise.all(
        posts.map(async(post)=>{
            await prisma.post.create({
                data:{
                    title: post.title,
                    text: post.text,
                    authorId: post.authorId
                }
            })
        })
    )
       

}

seed()
.then(async()=> {
    await prisma.$disconnect()
})
.catch(async(error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
})