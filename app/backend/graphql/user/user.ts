import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.id('id')
    t.nullable.string('name')
    t.nullable.string('image')
  },
})