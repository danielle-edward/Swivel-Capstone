/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      typeOfUser
      firstName
      lastName
      verifiedAt
      initialSetupDone
      values
      benefits
      tech_skills
      soft_skills
      employment_type
      about
      picture
      availability
      notification_settings
      preferences
      response_rate
      matches
      email
      organization
      position
      company_size
      location
      website
      alumn
      life_at
      degree
      major
      located
      grad_year
      highlights
      special
      resume
      bio
      liked
      skipped
      notSeen
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        typeOfUser
        firstName
        lastName
        verifiedAt
        initialSetupDone
        values
        benefits
        tech_skills
        soft_skills
        employment_type
        about
        picture
        availability
        notification_settings
        preferences
        response_rate
        matches
        email
        organization
        position
        company_size
        location
        website
        alumn
        life_at
        degree
        major
        located
        grad_year
        highlights
        special
        resume
        bio
        liked
        skipped
        notSeen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMatch = /* GraphQL */ `
  query GetMatch($id: ID!) {
    getMatch(id: $id) {
      id
      company
      student
      createdAt
      status_flag
      upcoming_meeting
      messages
      updatedAt
    }
  }
`;
export const listMatchs = /* GraphQL */ `
  query ListMatchs(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        company
        student
        createdAt
        status_flag
        upcoming_meeting
        messages
        updatedAt
      }
      nextToken
    }
  }
`;
