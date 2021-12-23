const { ApolloServer, gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
  bookmark: [Bookmark]
  }
  type Bookmark{
    id: ID!
    url: String!
    desc: String!
  }
`

const authors = [
  { id: 1, url: 'Terry Pratchett', desc: "Noting fancy" },
  { id: 2, url: 'Terry Pratchett', desc: "Noting fancy" },
  { id: 3, url: 'Terry Pratchett', desc: "Noting fancy" },
]

const resolvers = {
  Query: {
   
    bookmark: (root, args) => {
      console.log('hihhihi', args.name)
      return authors
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
