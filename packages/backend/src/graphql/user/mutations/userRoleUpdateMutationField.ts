import { builder } from '../../builder'
import { prisma } from '../../prisma'
import { RoleEnum } from '../role'

builder.mutationField('userRoleUpdate', (t) =>
  t.withAuth({ isLoggedIn: true }).prismaField({
    type: 'User',
    description: 'Update a user role',
    args: {
      userId: t.arg.id({ description: 'Id of the user' }),
      role: t.arg({ type: RoleEnum }),
      teamSlug: t.arg.string({ description: 'slug of the team' }),
    },
    authScopes: (_source, { teamSlug }) => ({ isTeamAdminByTeamSlug: teamSlug }),
    resolve: async (query, _source, { role, userId, teamSlug }, context) => {
      if (userId === context.session.user.id) {
        throw new Error('cant update own role')
      }

      const team = await prisma.team.findUniqueOrThrow({
        where: { slug: teamSlug },
        select: { id: true },
      })

      try {
        const teamMembership = await prisma.teamMembership.update({
          where: { userId_teamId: { teamId: team.id, userId: userId.toString() } },
          data: { role },
          select: { user: query },
        })
        return teamMembership.user
      } catch {
        throw new Error('user not found in team')
      }
    },
  }),
)