import { prismaClient } from "../../lib/db";
const queries={
  getUser : async(_:any,payload:{email:string})=>{
      const User=await prismaClient.user.findFirst({where:{
        email:payload.email
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
           console.log("ddd");
           const createdUser=await prismaClient.user.create({data:{
            firstName,
            lastName,
            email,
            password,
            salt:"123"
           }}) 
          return [createdUser.id]
    }
};

export const resolvers={queries,mutations};