import { prismaClient } from "../../lib/db"
const queries={
    getPost: async (_:any,payload:{postId:string})=>{
        const Post= await prismaClient.post.findFirst({
            where:{
                id:payload.postId
            }
        }) 
        return Post 
    },
    getPosts: async (_:any,payload:{email:string,userId:string})=>{
        const Posts=await prismaClient.post.findMany()
        return Posts
    },
    getWhoLiked: async (_:any,payload:{postId:string})=>{
        const Data=await prismaClient.post.findFirst({
            where:{
                id:payload.postId
            }
        })
        return Data
    },
    getWhoMarkedScam: async (_:any,payload:{postId:string})=>{
        const Data=await prismaClient.post.findFirst({
            where:{
                id:payload.postId
            }
        })
        return Data
    }
}
const mutations={
    createPost: async (_:any,payload:{userId:string,email:string,content:string})=>{
        await prismaClient.post.create({
            data:{
                content:payload.content,
                creator:payload.userId,
            }
        })
        return "success"
    },
    deletePost: async (_:any,payload:{userId:string,postId:string})=>{
        const data= await prismaClient.post.findFirst({
            where:{
                id:payload.postId
            }
        })
        if(!data && data?.creator===payload.userId){
            await prismaClient.post.delete({
                where:{
                    id:payload.postId
                }
            })
        }
        return "success"
    },
    hitLiked: async (_:any,payload:{userId:string,postId:string})=>{
        const data= await prismaClient.post.findFirst({
            where:{
                id:payload.postId
            }
        })
        data?.likesCounter.push(payload.userId)
        await prismaClient.post.update({
            where:{
                id:payload.postId
            },
            data:{
                likesCounter:data?.likesCounter
            }
         })
    },
    hitScam: async (_:any,payload:{userId:string,postId:string})=>{
        const data= await prismaClient.post.findFirst({
            where:{
                id:payload.postId
            }
        })
        data?.spamCounter.push(payload.userId)
        await prismaClient.post.update({
            where:{
                id:payload.postId
            },
            data:{
                spamCounter:data?.spamCounter
            }
         })
    }


}

export const resolvers={queries,mutations}