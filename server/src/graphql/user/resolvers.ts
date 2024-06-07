const queries={};

const mutations={
    createUser:(_:any,
        {firstName,lastName,email,password}:
        {firstName:string,lastName:string,email:string,password:string}
        )=>{

            return "test"
    }
};

export const resolvers={queries,mutations};