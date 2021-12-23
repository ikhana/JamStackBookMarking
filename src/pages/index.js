import React from "react"
import { useQuery } from '@apollo/client';
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

export default function Home() {
  const { loading, error, data } = useQuery(BookMarkQuery);

  return (
      <div>
        <h2>Data Received from Apollo Client at runtime from Serverless Function:</h2>
        {loading && <p>Loading Client Side Querry...</p>}
        {error && <p>Error: ${error.message}</p>}
        {data && data && (
          <div>{JSON.stringify(data)}</div>
        )}
      </div>
  );
    
}