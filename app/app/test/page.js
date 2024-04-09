"use client"
import React from 'react';
// Import createServerContext from 'react'
import { createServerContext } from 'react';

// Create a Server Component using createServerContext
const MyServerComponent = createServerContext();

// Use MyServerComponent in your pages or components


import { useQuery, gql } from '@apollo/client';

   const GET_DATA = gql`
     query {
       getPosts {
         content
       }
     }
   `;

   const ExampleComponent = () => {
     const { loading, error, data } = useQuery(GET_DATA);

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error.message}</p>;

     return (
        <MyServerComponent>
            <div>
         {data.getPosts.map(user => (
           <div>{user.content}</div>
         ))}
       </div>
        </MyServerComponent>
       
     );
   };

   export default ExampleComponent;