import React from "react"
import { useQuery,useMutation } from '@apollo/client';
import gql from 'graphql-tag';






// This query is executed at run time by Apollo.
const BookMarkQuery= gql`
{
  bookmark{
    url
    desc
    id
  }
}
`;

const addBookMarkMutation =gql`
mutation   
addBookMark($url: String!, $desc: String!){
  addBookMark(url: $url, desc: $desc){
    url
    desc
    
  }
}

`

export default function Home() {

  const { loading, error, data } = useQuery(BookMarkQuery);
  
 
  const [addBookMark]= useMutation(addBookMarkMutation)
  let url, desc;

  const addBookMarkSubmit = () =>{
    addBookMark({
      variables:{
        url: url.value,
        desc: desc.value

      },
      refetchQueries:[{query: BookMarkQuery}],
    })
    
   //console.log (url.value,desc.value) can be uncommented to see these values in console 
  }

  return (
      <div>
        <h2>Bookmarking Application</h2>
         <div>   <h2>Data Received from Apollo Client at runtime from Serverless Function:</h2>
        {loading && <p>Loading Client Side Querry...</p>}
        {error && <p>Error: ${error.message}</p>}
        {data && data && (
          <div>{JSON.stringify(data)}</div>
          
        )}</div>
        <div>
          <input type="text" placeholder="URL" ref={node => url=node} />
          <input type="text" placeholder="description" ref={node => desc=node} />
          <button onClick={addBookMarkSubmit}>Add Bookmark</button>
        </div>

     
      </div>
     
  );
    
}