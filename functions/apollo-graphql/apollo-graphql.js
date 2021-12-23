const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
  bookmark: [Bookmark!]
  }
  type Bookmark{
    id: ID!
    url: String!
    desc: String!
  }
  type Mutation {
    addBookMark (url: String!, desc: String!) : Bookmark
  }
`

const authors = [
  { id: 1, url: 'Terry Pratchett', desc: "Noting fancy" },
  { id: 2, url: 'Terry Pratchett', desc: "Noting fancy" },
  { id: 3, url: 'Terry Pratchett', desc: "Noting fancy" },
]

const resolvers = {
  Query: {
   
    bookmark: async (root, args) => {
      var client = new faunadb.Client({ secret: 'fnAEbCXikmACTLP9mDWuxiU1yt-k_8_eHCr1wOxB'});
      try{
        
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index('url'))),
            q.Lambda(x => q.Get(x))
          
          )
        );
        console.log(result.data)
        return result.data.map(d=> {
          return {
            id: d.ts,
            url: d.data.url,
            desc: d.data.desc
          }
          
        })
      }
      catch(err){
        console.log ("Error" ,err)
      }
   
    }
  },
 Mutation : {
   addBookMark :async (_,{url,desc})=>{
     console.log('textfield',url,desc)
     try {
      var client = new faunadb.Client({ secret: 'fnAEbCXikmACTLP9mDWuxiU1yt-k_8_eHCr1wOxB'});
      var result = await client.query(
        q.Create(
          q.Collection('mybookmark'),
          { data:{
            url,
            desc 
           }},
        )
      );
      return result.ref.data;
     
    } 
    catch (error){
        console.log('Error: ');
        console.log(error);
    }
     
   }
 }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
