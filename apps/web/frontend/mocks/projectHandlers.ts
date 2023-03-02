import {
  mockMyProjectsQuery,
  mockProjectMembershipCreateMutation,
  mockProjectMembershipDeleteMutation,
  mockTimeTableQuery,
} from '../generated/graphql'
import { testProject1, testProject2 } from './testData'

export let assignedProjects = [testProject1, testProject2]

const allProjects = [testProject1, testProject2]

export const projectHandlers = [
  mockProjectMembershipDeleteMutation((request, response, context) => {
    assignedProjects = assignedProjects.filter((project) => project.id !== request.variables.projectID)

    const result = response(
      context.data({
        __typename: 'Mutation',
        projectMembershipDelete: {
          __typename: 'Project',
          title: allProjects.find((project) => project.id === request.variables.projectID)?.title ?? '',
          members: [],
        },
      }),
    )
    return result
  }),
  mockProjectMembershipCreateMutation((request, response, context) => {
    const addedProject = allProjects.find((project) => project.id === request.variables.projectID)

    if (addedProject) assignedProjects.push(addedProject)

    const result = response(
      context.data({
        __typename: 'Mutation',
        projectMembershipCreate: {
          __typename: 'Project',
          title: addedProject?.title ?? '',
          members: [{ __typename: 'User', name: 'Team Member' }],
        },
      }),
    )
    return result
  }),
  mockMyProjectsQuery((request, response, context) => {
    const result = response(
      context.data({
        __typename: 'Query',
        projects: [testProject1, testProject2],
      }),
    )
    return result
  }),
  mockTimeTableQuery((_request, response, context) =>
    response(
      context.data({
        __typename: 'Query',
        projects: [
          { ...testProject1, tasks: testProject1.tasks.map((task) => ({ ...task, workHours: [] })) },
          { ...testProject2, tasks: testProject2.tasks.map((task) => ({ ...task, workHours: [] })) },
        ],
      }),
    ),
  ),
]
