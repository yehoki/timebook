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
        date<FieldName extends string>(
            fieldName: FieldName,
            opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
        ): void // "Date";
        /**
         * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
         */
        time<FieldName extends string>(
            fieldName: FieldName,
            opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
        ): void // "Time";
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
}

export interface NexusGenEnums {}

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
    WorkHour: prisma.WorkHour
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
    Mutation: {
        // field return type
        createWorkHour: NexusGenRootTypes['WorkHour'] // WorkHour!
        projectCreate: NexusGenRootTypes['Project'] // Project!
        projectDelete: NexusGenRootTypes['Project'] // Project!
        projectUpdate: NexusGenRootTypes['Project'] // Project!
    }
    Project: {
        // field return type
        endDate: NexusGenScalars['Date'] | null // Date
        id: string // ID!
        startDate: NexusGenScalars['Date'] | null // Date
        title: string // String!
        workHours: NexusGenRootTypes['WorkHour'][] // [WorkHour!]!
    }
    Query: {
        // field return type
        projects: NexusGenRootTypes['Project'][] // [Project!]!
    }
    WorkHour: {
        // field return type
        comment: string | null // String
        date: NexusGenScalars['Date'] // Date!
        hours: number // Float!
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
    }
    Project: {
        // field return type name
        endDate: 'Date'
        id: 'ID'
        startDate: 'Date'
        title: 'String'
        workHours: 'WorkHour'
    }
    Query: {
        // field return type name
        projects: 'Project'
    }
    WorkHour: {
        // field return type name
        comment: 'String'
        date: 'Date'
        hours: 'Float'
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
    }
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects

export type NexusGenInputNames = keyof NexusGenInputs

export type NexusGenEnumNames = never

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
