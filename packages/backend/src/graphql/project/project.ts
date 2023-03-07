import { builder } from '../builder'
import { ModifyInterface } from '../interfaces/modifyInterface'
import { prisma } from '../prisma'
import { WorkHour } from '../workHour'

export const Project = builder.prismaObject('Project', {
  select: {},
  interfaces: [ModifyInterface],
  fields: (t) => ({
    id: t.exposeID('id', { description: 'identifies the project' }),
    title: t.exposeString('title'),
    startDate: t.expose('startDate', { type: 'Date', nullable: true }),
    endDate: t.expose('endDate', { type: 'Date', nullable: true }),
    workHours: t.field({
      type: [WorkHour],
      select: { tasks: { select: { workHours: { select: { id: true } } } } },
      resolve: (project) => project.tasks.flatMap((task) => task.workHours),
    }),
    tasks: t.relation('tasks', {
      args: {
        showArchived: t.arg.boolean({ defaultValue: false }),
      },
      query: ({ showArchived }) => ({
        where: {
          // eslint-disable-next-line unicorn/no-null
          archivedAt: showArchived ? undefined : null,
        },
        orderBy: { title: 'asc' },
      }),
    }),
    members: t.prismaField({
      description: 'List of users that are member of the project',
      select: { id: true },
      type: ['User'],
      args: {
        includePastMembers: t.arg.boolean({
          defaultValue: false,
          description:
            'Set this to true if you want to see also the users who booked work hours on this project, but are no longer project members. This arg is useful for e.g. reports.',
        }),
      },
      resolve: (query, project, { includePastMembers }) =>
        prisma.user.findMany({
          ...query,
          where: includePastMembers
            ? {
                OR: [
                  { projectMemberships: { some: { projectId: project.id } } },
                  { workhours: { some: { task: { projectId: project.id } } } },
                ],
              }
            : {
                projectMemberships: { some: { projectId: project.id } },
              },
          orderBy: { name: 'asc' },
        }),
    }),
    canModify: t.withAuth({ isLoggedIn: true }).boolean({
      description: 'Can the user modify the entity',
      resolve: () => true,
    }),
  }),
})
