import { idArg, mutationField } from 'nexus'
import { isTeamAdmin } from '../../isTeamAdmin'
import { Project } from '../project'
import { ProjectInput } from '../projectInput'

export const projectUpdateMutationField = mutationField('projectUpdate', {
  type: Project,
  description: 'Update a project',
  args: {
    id: idArg({ description: 'id of the project' }),
    data: ProjectInput,
  },
  authorize: async (_source, _arguments, context) => isTeamAdmin(context),
  // eslint-disable-next-line unicorn/no-null
  resolve: async (_source, { id, data: { title, start, end, customerId = null } }, context) => {
    if (!context.session?.user.id || !context.teamSlug) {
      throw new Error('not authenticated')
    }

    const team = await context.prisma.team.findUniqueOrThrow({ where: { slug: context.teamSlug } })

    const project = await context.prisma.project.findUniqueOrThrow({
      where: { id },
    })

    if (project.teamId !== team.id) {
      // Project is from different team
      throw new Error('not authenticated')
    }

    if (customerId) {
      const newCustomer = await context.prisma.customer.findFirst({ where: { id: customerId } })

      if (!newCustomer || newCustomer.teamId !== team.id) {
        throw new Error('Customer not found')
      }
    }

    return context.prisma.project.update({
      where: { id },
      data: {
        title,
        startDate: start,
        endDate: end,
        customerId,
      },
    })
  },
})
