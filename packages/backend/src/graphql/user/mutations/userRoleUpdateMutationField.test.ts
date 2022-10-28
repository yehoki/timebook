import { GraphQLError } from 'graphql'

import { PrismaClient } from '@progwise/timebook-prisma'

import { getTestServer } from '../../../getTestServer'

const prisma = new PrismaClient()

const userRoleUpdateMutation = `
  mutation userRoleUpdate($userId: ID!, $role: Role!, $teamSlug: String!) {
    userRoleUpdate(userId: $userId, role: $role, teamSlug: $teamSlug) {
      id
      role(teamSlug: $teamSlug)
    }
  }
`

describe('userRoleUpdateMutationField', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
    await prisma.team.deleteMany()
  })

  it('should throw error when unauthorized', async () => {
    const testServer = getTestServer({ noSession: true })

    const response = await testServer.executeOperation({
      query: userRoleUpdateMutation,
      variables: {
        role: 'ADMIN',
        userId: '1',
        teamSlug: 'progwise',
      },
    })

    expect(response.data).toBeNull()
    expect(response.errors).toEqual([new GraphQLError('Not authorized')])
  })

  it('should throw error when not team admin', async () => {
    await prisma.team.create({ data: { slug: 'progwise', id: '1', title: 'Progwise' } })
    await prisma.user.create({ data: { id: '1' } })
    await prisma.teamMembership.create({ data: { role: 'MEMBER', teamId: '1', userId: '1' } })

    const testServer = getTestServer()

    const response = await testServer.executeOperation({
      query: userRoleUpdateMutation,
      variables: {
        role: 'ADMIN',
        userId: '1',
        teamSlug: 'progwise',
      },
    })

    expect(response.data).toBeNull()
    expect(response.errors).toEqual([new GraphQLError('Not authorized')])
  })

  it('should throw error when updating own role', async () => {
    await prisma.team.create({ data: { slug: 'progwise', id: '1', title: 'Progwise' } })
    await prisma.user.create({ data: { id: '1' } })
    await prisma.teamMembership.create({ data: { role: 'ADMIN', teamId: '1', userId: '1' } })

    const testServer = getTestServer()

    const response = await testServer.executeOperation({
      query: userRoleUpdateMutation,
      variables: {
        role: 'MEMBER',
        userId: '1',
        teamSlug: 'progwise',
      },
    })

    expect(response.data).toBeNull()
    expect(response.errors).toEqual([new GraphQLError('cant update own role')])
  })

  it('should update user role', async () => {
    await prisma.team.create({ data: { slug: 'progwise', id: '1', title: 'Progwise' } })
    await prisma.user.create({ data: { id: '1' } })
    await prisma.teamMembership.create({ data: { role: 'ADMIN', teamId: '1', userId: '1' } })
    await prisma.user.create({ data: { id: '2' } })
    await prisma.teamMembership.create({ data: { role: 'MEMBER', teamId: '1', userId: '2' } })

    const testServer = getTestServer()
    const response = await testServer.executeOperation({
      query: userRoleUpdateMutation,
      variables: {
        role: 'ADMIN',
        userId: '2',
        teamSlug: 'progwise',
      },
    })

    expect(response.data).toEqual({ userRoleUpdate: { id: '2', role: 'ADMIN' } })
    expect(response.errors).toBeUndefined()
  })

  it('should throw error if user is not teamMember', async () => {
    await prisma.team.create({ data: { slug: 'progwise', id: '1', title: 'Progwise' } })
    await prisma.user.create({ data: { id: '1' } })
    await prisma.teamMembership.create({ data: { role: 'ADMIN', teamId: '1', userId: '1' } })
    await prisma.user.create({ data: { id: '2' } })

    const testServer = getTestServer()
    const response = await testServer.executeOperation({
      query: userRoleUpdateMutation,
      variables: {
        role: 'ADMIN',
        userId: '2',
        teamSlug: 'progwise',
      },
    })

    expect(response.data).toBeNull()
    expect(response.errors).toEqual([new GraphQLError('user not found in team')])
  })
})