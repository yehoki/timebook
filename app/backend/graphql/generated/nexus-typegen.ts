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
  CustomerInput: {
    // input type
    title: string // String!
  }
  ProjectInput: {
    // input type
    customerId?: string | null // ID
    end?: NexusGenScalars['Date'] | null // Date
    start?: NexusGenScalars['Date'] | null // Date
    title: string // String!
  }
  TaskInput: {
    // input type
    projectId: string // ID!
    title: string // String!
  }
  TeamInput: {
    // input type
    slug: string // String!
    theme?: NexusGenEnums['Theme'] | null // Theme
    title: string // String!
  }
  WorkHourInput: {
    // input type
    comment?: string | null // String
    date: NexusGenScalars['Date'] // Date!
    duration: number // Int!
    taskId: string // ID!
  }
}

export interface NexusGenEnums {
  Role: 'ADMIN' | 'MEMBER'
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
  Customer: {
    // root type
    id: string // ID!
    title: string // String!
  }
  Mutation: {}
  Project: prisma.Project
  Query: {}
  Report: NexusGenArgTypes['Query']['report']
  ReportGroupedByDate: {
    // root type
    date: NexusGenScalars['Date'] // Date!
    duration: number // Int!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  ReportGroupedByTask: {
    // root type
    duration: number // Int!
    task: NexusGenRootTypes['Task'] // Task!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  ReportGroupedByUser: {
    // root type
    duration: number // Int!
    user: NexusGenRootTypes['User'] // User!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  Task: prisma.Task
  Team: prisma.Team
  User: {
    // root type
    id: string // ID!
    image?: string | null // String
    name?: string | null // String
  }
  WorkHour: prisma.WorkHour
}

export interface NexusGenInterfaces {
  ModifyInterface:
    | NexusGenRootTypes['Customer']
    | NexusGenRootTypes['Project']
    | NexusGenRootTypes['Task']
    | NexusGenRootTypes['Team']
}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Customer: {
    // field return type
    canModify: boolean // Boolean!
    id: string // ID!
    projects: NexusGenRootTypes['Project'][] // [Project!]!
    title: string // String!
  }
  Mutation: {
    // field return type
    customerCreate: NexusGenRootTypes['Customer'] // Customer!
    customerDelete: NexusGenRootTypes['Customer'] // Customer!
    customerUpdate: NexusGenRootTypes['Customer'] // Customer!
    projectCreate: NexusGenRootTypes['Project'] // Project!
    projectDelete: NexusGenRootTypes['Project'] // Project!
    projectUpdate: NexusGenRootTypes['Project'] // Project!
    taskArchive: NexusGenRootTypes['Task'] // Task!
    taskCreate: NexusGenRootTypes['Task'] // Task!
    taskDelete: NexusGenRootTypes['Task'] // Task!
    taskUpdate: NexusGenRootTypes['Task'] // Task!
    teamAcceptInvite: NexusGenRootTypes['Team'] // Team!
    teamArchive: NexusGenRootTypes['Team'] // Team!
    teamCreate: NexusGenRootTypes['Team'] // Team!
    teamDelete: NexusGenRootTypes['Team'] // Team!
    teamUpdate: NexusGenRootTypes['Team'] // Team!
    userRoleUpdate: NexusGenRootTypes['User'] // User!
    workHourCreate: NexusGenRootTypes['WorkHour'] // WorkHour!
    workHourDelete: NexusGenRootTypes['WorkHour'] // WorkHour!
    workHourUpdate: NexusGenRootTypes['WorkHour'] // WorkHour!
  }
  Project: {
    // field return type
    canModify: boolean // Boolean!
    customer: NexusGenRootTypes['Customer'] | null // Customer
    endDate: NexusGenScalars['Date'] | null // Date
    id: string // ID!
    members: NexusGenRootTypes['User'][] // [User!]!
    startDate: NexusGenScalars['Date'] | null // Date
    tasks: NexusGenRootTypes['Task'][] // [Task!]!
    title: string // String!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  Query: {
    // field return type
    customer: NexusGenRootTypes['Customer'] // Customer!
    project: NexusGenRootTypes['Project'] // Project!
    projects: NexusGenRootTypes['Project'][] // [Project!]!
    report: NexusGenRootTypes['Report'] // Report!
    task: NexusGenRootTypes['Task'] // Task!
    team: NexusGenRootTypes['Team'] // Team!
    teamBySlug: NexusGenRootTypes['Team'] // Team!
    teams: NexusGenRootTypes['Team'][] // [Team!]!
    user: NexusGenRootTypes['User'] // User!
    users: NexusGenRootTypes['User'][] // [User!]!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  Report: {
    // field return type
    groupedByDate: NexusGenRootTypes['ReportGroupedByDate'][] // [ReportGroupedByDate!]!
    groupedByTask: NexusGenRootTypes['ReportGroupedByTask'][] // [ReportGroupedByTask!]!
    groupedByUser: NexusGenRootTypes['ReportGroupedByUser'][] // [ReportGroupedByUser!]!
  }
  ReportGroupedByDate: {
    // field return type
    date: NexusGenScalars['Date'] // Date!
    duration: number // Int!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  ReportGroupedByTask: {
    // field return type
    duration: number // Int!
    task: NexusGenRootTypes['Task'] // Task!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  ReportGroupedByUser: {
    // field return type
    duration: number // Int!
    user: NexusGenRootTypes['User'] // User!
    workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  Task: {
    // field return type
    archived: boolean // Boolean!
    canModify: boolean // Boolean!
    hasWorkHours: boolean // Boolean!
    id: string // ID!
    project: NexusGenRootTypes['Project'] // Project!
    title: string // String!
    workhours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
  }
  Team: {
    // field return type
    archived: boolean // Boolean!
    canModify: boolean // Boolean!
    customers: NexusGenRootTypes['Customer'][] // [Customer!]!
    id: string // ID!
    inviteKey: string // String!
    members: NexusGenRootTypes['User'][] // [User!]!
    projects: NexusGenRootTypes['Project'][] // [Project!]!
    slug: string // String!
    theme: NexusGenEnums['Theme'] // Theme!
    title: string // String!
  }
  User: {
    // field return type
    id: string // ID!
    image: string | null // String
    name: string | null // String
    projects: NexusGenRootTypes['Project'][] // [Project!]!
    role: NexusGenEnums['Role'] // Role!
  }
  WorkHour: {
    // field return type
    comment: string | null // String
    date: NexusGenScalars['Date'] // Date!
    duration: number // Int!
    id: string // ID!
    project: NexusGenRootTypes['Project'] // Project!
    task: NexusGenRootTypes['Task'] // Task!
    user: NexusGenRootTypes['User'] // User!
  }
  ModifyInterface: {
    // field return type
    canModify: boolean // Boolean!
  }
}

export interface NexusGenFieldTypeNames {
  Customer: {
    // field return type name
    canModify: 'Boolean'
    id: 'ID'
    projects: 'Project'
    title: 'String'
  }
  Mutation: {
    // field return type name
    customerCreate: 'Customer'
    customerDelete: 'Customer'
    customerUpdate: 'Customer'
    projectCreate: 'Project'
    projectDelete: 'Project'
    projectUpdate: 'Project'
    taskArchive: 'Task'
    taskCreate: 'Task'
    taskDelete: 'Task'
    taskUpdate: 'Task'
    teamAcceptInvite: 'Team'
    teamArchive: 'Team'
    teamCreate: 'Team'
    teamDelete: 'Team'
    teamUpdate: 'Team'
    userRoleUpdate: 'User'
    workHourCreate: 'WorkHour'
    workHourDelete: 'WorkHour'
    workHourUpdate: 'WorkHour'
  }
  Project: {
    // field return type name
    canModify: 'Boolean'
    customer: 'Customer'
    endDate: 'Date'
    id: 'ID'
    members: 'User'
    startDate: 'Date'
    tasks: 'Task'
    title: 'String'
    workHours: 'WorkHour'
  }
  Query: {
    // field return type name
    customer: 'Customer'
    project: 'Project'
    projects: 'Project'
    report: 'Report'
    task: 'Task'
    team: 'Team'
    teamBySlug: 'Team'
    teams: 'Team'
    user: 'User'
    users: 'User'
    workHours: 'WorkHour'
  }
  Report: {
    // field return type name
    groupedByDate: 'ReportGroupedByDate'
    groupedByTask: 'ReportGroupedByTask'
    groupedByUser: 'ReportGroupedByUser'
  }
  ReportGroupedByDate: {
    // field return type name
    date: 'Date'
    duration: 'Int'
    workHours: 'WorkHour'
  }
  ReportGroupedByTask: {
    // field return type name
    duration: 'Int'
    task: 'Task'
    workHours: 'WorkHour'
  }
  ReportGroupedByUser: {
    // field return type name
    duration: 'Int'
    user: 'User'
    workHours: 'WorkHour'
  }
  Task: {
    // field return type name
    archived: 'Boolean'
    canModify: 'Boolean'
    hasWorkHours: 'Boolean'
    id: 'ID'
    project: 'Project'
    title: 'String'
    workhours: 'WorkHour'
  }
  Team: {
    // field return type name
    archived: 'Boolean'
    canModify: 'Boolean'
    customers: 'Customer'
    id: 'ID'
    inviteKey: 'String'
    members: 'User'
    projects: 'Project'
    slug: 'String'
    theme: 'Theme'
    title: 'String'
  }
  User: {
    // field return type name
    id: 'ID'
    image: 'String'
    name: 'String'
    projects: 'Project'
    role: 'Role'
  }
  WorkHour: {
    // field return type name
    comment: 'String'
    date: 'Date'
    duration: 'Int'
    id: 'ID'
    project: 'Project'
    task: 'Task'
    user: 'User'
  }
  ModifyInterface: {
    // field return type name
    canModify: 'Boolean'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    customerCreate: {
      // args
      data: NexusGenInputs['CustomerInput'] // CustomerInput!
    }
    customerDelete: {
      // args
      customerId: string // ID!
    }
    customerUpdate: {
      // args
      customerId: string // ID!
      data: NexusGenInputs['CustomerInput'] // CustomerInput!
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
    taskArchive: {
      // args
      taskId: string // ID!
    }
    taskCreate: {
      // args
      data: NexusGenInputs['TaskInput'] // TaskInput!
    }
    taskDelete: {
      // args
      id: string // ID!
    }
    taskUpdate: {
      // args
      data: NexusGenInputs['TaskInput'] // TaskInput!
      id: string // ID!
    }
    teamAcceptInvite: {
      // args
      inviteKey: string // String!
    }
    teamArchive: {
      // args
      teamId: string // ID!
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
    userRoleUpdate: {
      // args
      role: NexusGenEnums['Role'] // Role!
      userId: string // ID!
    }
    workHourCreate: {
      // args
      data: NexusGenInputs['WorkHourInput'] // WorkHourInput!
    }
    workHourDelete: {
      // args
      id: string // ID!
    }
    workHourUpdate: {
      // args
      data: NexusGenInputs['WorkHourInput'] // WorkHourInput!
      id: string // ID!
    }
  }
  Project: {
    tasks: {
      // args
      showArchived: boolean // Boolean!
    }
  }
  Query: {
    customer: {
      // args
      customerId: string // ID!
    }
    project: {
      // args
      projectId: string // ID!
    }
    report: {
      // args
      from: NexusGenScalars['Date'] // Date!
      projectId: string // ID!
      to: NexusGenScalars['Date'] // Date!
    }
    task: {
      // args
      taskId: string // ID!
    }
    teamBySlug: {
      // args
      slug: string // String!
    }
    teams: {
      // args
      includeArchived: boolean // Boolean!
    }
    user: {
      // args
      userId?: string | null // ID
    }
    workHours: {
      // args
      from: NexusGenScalars['Date'] // Date!
      teamSlug: string // String!
      to?: NexusGenScalars['Date'] | null // Date
      userIds?: string[] | null // [ID!]
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  ModifyInterface: 'Customer' | 'Project' | 'Task' | 'Team'
}

export interface NexusGenTypeInterfaces {
  Customer: 'ModifyInterface'
  Project: 'ModifyInterface'
  Task: 'ModifyInterface'
  Team: 'ModifyInterface'
}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = keyof NexusGenEnums

export type NexusGenInterfaceNames = keyof NexusGenInterfaces

export type NexusGenScalarNames = keyof NexusGenScalars

export type NexusGenUnionNames = never

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never

export type NexusGenAbstractsUsingStrategyResolveType = 'ModifyInterface'

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
