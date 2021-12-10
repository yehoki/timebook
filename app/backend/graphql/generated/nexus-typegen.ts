/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type * as prisma from '@prisma/client'
import type { Context } from './../context'
import type { FieldAuthorizeResolver } from 'nexus/dist/plugins/fieldAuthorizePlugin'
import type { core } from 'nexus'
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    time<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Time";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    time<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Time";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ProjectInput: {
    // input type
    end?: NexusGenScalars['Date'] | null // Date
    start?: NexusGenScalars['Date'] | null // Date
    title: string // String!
  }
  TaskInput: {
    // input type
    projectId: number // Int!
    title: string // String!
  }
  TeamInput: {
    // input type
    slug: string // String!
    theme?: NexusGenEnums['Theme'] | null // Theme
    title: string // String!
  }
}

export interface NexusGenEnums {
  Theme: 'BLUE' | 'GRAY' | 'GREEN' | 'INDIGO' | 'PINK' | 'PURPLE' | 'RED' | 'YELLOW'
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  Time: any
}

export interface NexusGenObjects {
  Mutation: {}
  Project: prisma.Project
  Query: {}
  Task: prisma.Task
  Team: {
    // root type
    id: string // ID!
    inviteKey: string // String!
    slug: string // String!
    theme: NexusGenEnums['Theme'] // Theme!
    title: string // String!
  }
  User: {
    // root type
    id: string // ID!
    image?: string | null // String
    name?: string | null // String
  }
  WorkHour: prisma.WorkHour
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Mutation: {
    // field return type
    createWorkHour: NexusGenRootTypes['WorkHour'] // WorkHour!
    projectCreate: NexusGenRootTypes['Project'] // Project!
    projectDelete: NexusGenRootTypes['Project'] // Project!
    projectUpdate: NexusGenRootTypes['Project'] // Project!
    taskCreate: NexusGenRootTypes['Task'] // Task!
    taskDelete: NexusGenRootTypes['Task'] // Task!
    teamAcceptInvite: NexusGenRootTypes['Team'] // Team!
    teamCreate: NexusGenRootTypes['Team'] // Team!
    teamDelete: NexusGenRootTypes['Team'] // Team!
    teamUpdate: NexusGenRootTypes['Team'] // Team!
  }
  Project: {
    // field return type
    endDate: NexusGenScalars['Date'] | null // Date
    id: string // ID!
    startDate: NexusGenScalars['Date'] | null // Date
    tasks: NexusGenRootTypes['Task'][] // [Task!]!
    title: string // String!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  Query: {
    // field return type
    project: NexusGenRootTypes['Project'] // Project!
    projects: NexusGenRootTypes['Project'][] // [Project!]!
    team: NexusGenRootTypes['Team'] // Team!
    teamBySlug: NexusGenRootTypes['Team'] // Team!
    teams: NexusGenRootTypes['Team'][] // [Team!]!
    user: NexusGenRootTypes['User'] // User!
    users: NexusGenRootTypes['User'][] // [User!]!
  }
  Task: {
    // field return type
    id: string // ID!
    project: NexusGenRootTypes['Project'] // Project!
    title: string // String!
    workhours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  Team: {
    // field return type
    id: string // ID!
    inviteKey: string // String!
    members: NexusGenRootTypes['User'][] // [User!]!
    slug: string // String!
    theme: NexusGenEnums['Theme'] // Theme!
    title: string // String!
  }
  User: {
    // field return type
    id: string // ID!
    image: string | null // String
    name: string | null // String
  }
  WorkHour: {
    // field return type
    comment: string | null // String
    date: NexusGenScalars['Date'] // Date!
    duration: number // Int!
    id: string // ID!
    project: NexusGenRootTypes['Project'] // Project!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: {
    // field return type name
    createWorkHour: 'WorkHour'
    projectCreate: 'Project'
    projectDelete: 'Project'
    projectUpdate: 'Project'
    taskCreate: 'Task'
    taskDelete: 'Task'
    teamAcceptInvite: 'Team'
    teamCreate: 'Team'
    teamDelete: 'Team'
    teamUpdate: 'Team'
  }
  Project: {
    // field return type name
    endDate: 'Date'
    id: 'ID'
    startDate: 'Date'
    tasks: 'Task'
    title: 'String'
    workHours: 'WorkHour'
  }
  Query: {
    // field return type name
    project: 'Project'
    projects: 'Project'
    team: 'Team'
    teamBySlug: 'Team'
    teams: 'Team'
    user: 'User'
    users: 'User'
  }
  Task: {
    // field return type name
    id: 'ID'
    project: 'Project'
    title: 'String'
    workhours: 'WorkHour'
  }
  Team: {
    // field return type name
    id: 'ID'
    inviteKey: 'String'
    members: 'User'
    slug: 'String'
    theme: 'Theme'
    title: 'String'
  }
  User: {
    // field return type name
    id: 'ID'
    image: 'String'
    name: 'String'
  }
  WorkHour: {
    // field return type name
    comment: 'String'
    date: 'Date'
    duration: 'Int'
    id: 'ID'
    project: 'Project'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createWorkHour: {
      // args
      comment?: string | null // String
      date: NexusGenScalars['Date'] // Date!
      duration: number // Int!
      taskId: string // ID!
    }
    projectCreate: {
      // args
      data: NexusGenInputs['ProjectInput'] // ProjectInput!
    }
    projectDelete: {
      // args
      id: string // ID!
    }
    projectUpdate: {
      // args
      data: NexusGenInputs['ProjectInput'] // ProjectInput!
      id: string // ID!
    }
    taskCreate: {
      // args
      data: NexusGenInputs['TaskInput'] // TaskInput!
    }
    taskDelete: {
      // args
      id: string // ID!
    }
    teamAcceptInvite: {
      // args
      inviteKey: string // String!
    }
    teamCreate: {
      // args
      data: NexusGenInputs['TeamInput'] // TeamInput!
    }
    teamDelete: {
      // args
      id: string // ID!
    }
    teamUpdate: {
      // args
      data: NexusGenInputs['TeamInput'] // TeamInput!
      id: string // ID!
    }
  }
  Query: {
    project: {
      // args
      projectId: string // ID!
    }
    team: {
      // args
      id: string // ID!
    }
    teamBySlug: {
      // args
      slug: string // String!
    }
    user: {
      // args
      userId: string // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = never

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = never

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context
  inputTypes: NexusGenInputs
  rootTypes: NexusGenRootTypes
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars
  argTypes: NexusGenArgTypes
  fieldTypes: NexusGenFieldTypes
  fieldTypeNames: NexusGenFieldTypeNames
  allTypes: NexusGenAllTypes
  typeInterfaces: NexusGenTypeInterfaces
  objectNames: NexusGenObjectNames
  inputNames: NexusGenInputNames
  enumNames: NexusGenEnumNames
  interfaceNames: NexusGenInterfaceNames
  scalarNames: NexusGenScalarNames
  unionNames: NexusGenUnionNames
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames']
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames']
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames']
  abstractTypeMembers: NexusGenAbstractTypeMembers
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType
  features: NexusGenFeaturesConfig
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
