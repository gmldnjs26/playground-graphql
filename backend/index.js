const database = require("./database");
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    teams: [Team]
    equipments: [Equipment]
    team(id: Int): Team
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment {
    id: String
    used_by: String
    count: Int
    new_or_used: String
  }
  type Supply {
    id: String
    team: Int
  }
`;
const resolvers = {
  Query: {
    teams: () => {
      const teams = database.teams;
      const supplies = database.supplies;
      return teams.map((team) => {
        return {
          ...team,
          supplies: supplies.filter((supply) => supply.team === team.id),
        };
      });
    },
    team: (parent, args, context, info) =>
      database.teams.filter((team) => {
        return team.id === args.id;
      })[0],
    equipments: () => database.equipments,
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
