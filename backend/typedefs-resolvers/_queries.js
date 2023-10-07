const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    equipments: [Equipment]
    equipmentAdvs: [EquipmentAdv]
    softwares: [Software]
    software: Software
    supplies: [Supply]
    people: [People]
    peopleFilterd: [People]
    peoplePaginated: [People]
    givens: [Given]
  }
`;

module.exports = typeDefs;
