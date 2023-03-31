import { getMonth, getYear } from 'date-fns'

import { builder } from '../builder'
import { ModifyInterface } from '../interfaces/modifyInterface'
import { prisma } from '../prisma'
import { DateScalar } from '../scalars'

export const Task = builder.prismaObject('Task', {
  select: {},
  interfaces: [ModifyInterface],
  fields: (t) => ({
    id: t.exposeID('id', { description: 'Identifies the task' }),
    title: t.exposeString('title', { description: 'The user can identify the task in the UI' }),
    hourlyRate: t.float({
      nullable: true,
      description: 'For calculating the money spent',
      select: { hourlyRate: true },
      resolve: (task) => task.hourlyRate?.toNumber(),
    }),
    archived: t.boolean({
      select: { archivedAt: true },
      resolve: (task) => !!task.archivedAt,
    }),
    hasWorkHours: t.boolean({
      select: { _count: { select: { workHours: true } } },
      resolve: (task) => task._count.workHours > 0,
    }),
    project: t.relation('project'),
    workHours: t.withAuth({ isLoggedIn: true }).relation('workHours', {
      args: {
        from: t.arg({ type: DateScalar, required: true }),
        to: t.arg({ type: DateScalar, required: false }),
      },
      query: ({ from, to }, context) => ({
        where: {
          userId: context.session.user.id,
          date: {
            gte: from,
            lte: to ?? from,
          },
        },
      }),
    }),
    canModify: t.withAuth({ isLoggedIn: true }).boolean({
      description: 'Can the user modify the entity',
      select: { projectId: true },
      resolve: async (task, _arguments, context) => {
        const projectMembership = await prisma.projectMembership.findUnique({
          select: { role: true },
          where: { userId_projectId: { projectId: task.projectId, userId: context.session.user.id } },
        })
        return projectMembership?.role === 'ADMIN'
      },
    }),
    tracking: t.withAuth({ isLoggedIn: true }).prismaField({
      select: { id: true },
      type: 'Tracking',
      nullable: true,
      resolve: (query, task, _argument, context) =>
        prisma.tracking.findFirst({ ...query, where: { userId: context.session.user.id, taskId: task.id } }),
    }),
    isLocked: t.withAuth({ isLoggedIn: true }).boolean({
      select: { projectId: true },
      resolve: async (task) => {
        const now = new Date()
        const year = getYear(now)
        const month = getMonth(now)

        const lockedMonth = await prisma.lockedMonth.findUnique({
          where: {
            projectId_year_month: { projectId: task.projectId, year, month },
          },
        })

        return !!lockedMonth
      },
    }),
  }),
})
