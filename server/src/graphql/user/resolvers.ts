import { prismaClient } from "../../lib/db";
const queries={
  getUser : async(_:any,payload:{email:string,profileImageUrl:string})=>{
      const User=await prismaClient.user.findMany({where:{
        profileImageUrl: null
      }})
      // console.log(User);
      return User
  }
};
const mutations={
    createUser: async(_:any,
        {firstName,lastName,email,password}:
        {firstName:string,lastName:string,email:string,password:string}
        )=>{
           const createdUser=await prismaClient.user.create({data:{
            firstName,
            lastName,
            email,
            password,
            salt:"123"
           }}) 
          return createdUser.id
    }
};

export const resolvers={queries,mutations};