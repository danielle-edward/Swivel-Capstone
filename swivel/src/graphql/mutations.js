/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createMatch = /* GraphQL */ `
  mutation CreateMatch(
    $input: CreateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    createMatch(input: $input, condition: $condition) {
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
export const updateMatch = /* GraphQL */ `
  mutation UpdateMatch(
    $input: UpdateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    updateMatch(input: $input, condition: $condition) {
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
export const deleteMatch = /* GraphQL */ `
  mutation DeleteMatch(
    $input: DeleteMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    deleteMatch(input: $input, condition: $condition) {
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
