import {
  mockTeamArchiveMutation,
  mockTeamUnarchiveMutation,
  mockMeQuery,
  mockTeamQuery,
  mockTeamsQuery,
  mockUserQuery,
  mockUserRoleUpdateMutation,
  Role,
  TeamFragment,
  Theme,
  mockUserCapacityUpdateMutation,
} from '../generated/graphql'

const testTeam1: TeamFragment = {
  __typename: 'Team',
  id: 'okay',
  inviteKey: 'inviteKey',
  slug: 'team1',
  theme: Theme.Blue,
  title: 'testTeam1',
  archived: false,
}
const testTeam2: TeamFragment = {
  __typename: 'Team',
  id: 'okay2',
  inviteKey: 'inviteKey2',
  slug: 'team2',
  theme: Theme.Red,
  title: 'testTeam2',
  archived: false,
}

let userRole = Role.Admin

export const teamHandlers = [
  mockTeamsQuery((request, response, context) => {
    const result = response(
      context.data({
        __typename: 'Query',
        teams: [testTeam1, testTeam2],
      }),
    )
    return result
  }),
  mockTeamQuery((request, response, context) => {
    const result = response(
      context.data({
        __typename: 'Query',
        teamBySlug: { ...testTeam1, members: [], canModify: true },
      }),
    )
    return result
  }),
  mockMeQuery((request, response, context) => {
    const result = response(
      context.data({
        __typename: 'Query',
        user: {
          __typename: 'User',
          id: '',
          image: undefined,
          name: 'Admin',
          role: Role.Admin,
        },
      }),
    )
    return result
  }),
  mockUserQuery((request, response, context) => {
    const result = response(
      context.data({
        __typename: 'Query',
        user: {
          __typename: 'User',
          id: '23182391283',
          name: 'Test Member',
          image: undefined,
          role: userRole,
        },
      }),
    )
    return result
  }),
  mockUserRoleUpdateMutation((request, response, context) => {
    userRole = request.variables.role

    const result = response(
      context.data({
        __typename: 'Mutation',
        userRoleUpdate: {
          __typename: 'User',
          id: '123123-asd-12323',
          role: userRole,
        },
      }),
    )
    return result
  }),
  mockTeamArchiveMutation((request, response, context) => {
    testTeam1.archived = true
    const result = response(
      context.data({
        __typename: 'Mutation',
        teamArchive: testTeam1,
      }),
    )
    return result
  }),
  mockTeamUnarchiveMutation((request, response, context) => {
    testTeam1.archived = false
    const result = response(
      context.data({
        __typename: 'Mutation',
        teamUnarchive: testTeam1,
      }),
    )
    return result
  }),
  mockUserCapacityUpdateMutation((request, response, context) => {
    const result = response(
      context.data({
        __typename: 'Mutation',
        userCapacityUpdate: {
          __typename: 'User',
          id: request.variables.userId,
          availableMinutesPerWeek: request.variables.availableMinutesPerWeek,
        },
      }),
    )
    return result
  }),
]
