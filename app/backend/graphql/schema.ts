import path from 'path'
import { fieldAuthorizePlugin, makeSchema } from 'nexus'
import { projectsQueryField } from './project'
import { createWorkHourMutationField } from './workHour'
import { DateScalar } from './scalars/date'

export const schema = makeSchema({
    types: [createWorkHourMutationField, projectsQueryField, DateScalar],
    outputs: {
        typegen: path.join(process.env.ROOT ?? '', '/backend/graphql/generated', 'nexus-typegen.ts'),
        schema: path.join(process.env.ROOT ?? '', '/backend/graphql/generated', 'schema.graphql'),
    },
    prettierConfig: path.join(process.env.ROOT ?? '', './.prettierrc.js'),
    contextType: {
        module: path.join(process.env.ROOT ?? '', '/backend/graphql', 'context.ts'),
        export: 'Context',
    },
    nonNullDefaults: { input: true, output: true },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
        mapping: {
            Project: 'prisma.Project',
            WorkHour: 'prisma.WorkHour',
        },
    },
    plugins: [fieldAuthorizePlugin()],
})
