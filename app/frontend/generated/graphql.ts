/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import gql from 'graphql-tag'
import * as Urql from 'urql'
import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: string
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: string
}

export type Customer = {
  __typename?: 'Customer'
  /** Identifier of the customer */
  id: Scalars['ID']
  /** List of all customer projects */
  projects: Array<Project>
  /** Title of the customer */
  title: Scalars['String']
}

export type CustomerInput = {
  /** Title of the customer */
  title: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Create a new customer for a team */
  customerCreate: Customer
  /** Delete a customer */
  customerDelete: Customer
  /** Update a customer */
  customerUpdate: Customer
  /** Create a new project */
  projectCreate: Project
  /** Delete a project */
  projectDelete: Project
  /** Update a project */
  projectUpdate: Project
  /** Archive a task */
  taskArchive: Task
  /** Create a new Task */
  taskCreate: Task
  /** Delete a task */
  taskDelete: Task
  /** Update a task */
  taskUpdate: Task
  /** Accept an invite to a team */
  teamAcceptInvite: Team
  /** Create a new team */
  teamCreate: Team
  /** Delete a new team */
  teamDelete: Team
  /** Update a new team */
  teamUpdate: Team
  /** Create a new WorkHour */
  workHourCreate: WorkHour
  /** Delete a work hour entry */
  workHourDelete: WorkHour
  /** Updates a work hour entry */
  workHourUpdate: WorkHour
}

export type MutationCustomerCreateArgs = {
  data: CustomerInput
}

export type MutationCustomerDeleteArgs = {
  customerId: Scalars['ID']
}

export type MutationCustomerUpdateArgs = {
  customerId: Scalars['ID']
  data: CustomerInput
}

export type MutationProjectCreateArgs = {
  data: ProjectInput
}

export type MutationProjectDeleteArgs = {
  id: Scalars['ID']
}

export type MutationProjectUpdateArgs = {
  data: ProjectInput
  id: Scalars['ID']
}

export type MutationTaskArchiveArgs = {
  taskId: Scalars['ID']
}

export type MutationTaskCreateArgs = {
  data: TaskInput
}

export type MutationTaskDeleteArgs = {
  id: Scalars['ID']
}

export type MutationTaskUpdateArgs = {
  data: TaskInput
  id: Scalars['ID']
}

export type MutationTeamAcceptInviteArgs = {
  inviteKey: Scalars['String']
}

export type MutationTeamCreateArgs = {
  data: TeamInput
}

export type MutationTeamDeleteArgs = {
  id: Scalars['ID']
}

export type MutationTeamUpdateArgs = {
  data: TeamInput
  id: Scalars['ID']
}

export type MutationWorkHourCreateArgs = {
  comment?: InputMaybe<Scalars['String']>
  date: Scalars['Date']
  duration: Scalars['Int']
  taskId: Scalars['ID']
}

export type MutationWorkHourDeleteArgs = {
  id: Scalars['ID']
}

export type MutationWorkHourUpdateArgs = {
  data: WorkHourInput
  id: Scalars['ID']
}

export type Project = {
  __typename?: 'Project'
  /** Customer of the project */
  customer?: Maybe<Customer>
  endDate?: Maybe<Scalars['Date']>
  /** identifies the project */
  id: Scalars['ID']
  /** List of users that are member of the project */
  members: Array<User>
  startDate?: Maybe<Scalars['Date']>
  tasks: Array<Task>
  title: Scalars['String']
  workHours: Array<WorkHour>
}

export type ProjectTasksArgs = {
  showArchived?: Scalars['Boolean']
}

export type ProjectInput = {
  /** Id of the customer to which the project belongs. */
  customerId?: InputMaybe<Scalars['ID']>
  end?: InputMaybe<Scalars['Date']>
  start?: InputMaybe<Scalars['Date']>
  title: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  /** Returns a single customer */
  customer: Customer
  /** Returns a single project */
  project: Project
  /** Returns a list of all projects */
  projects: Array<Project>
  /** Returns a single task */
  task: Task
  /** Return team by slug provided in the api route (/api/[teamSlug]/graphql) */
  team: Team
  /** Return a team by a slug */
  teamBySlug: Team
  /** Return all teams */
  teams: Array<Team>
  /** Returns a single user */
  user: User
  /** @deprecated Use members field on team type instead */
  users: Array<User>
  /** Returns a list of work hours for a given time period and a list of users */
  workHours: Array<WorkHour>
}

export type QueryCustomerArgs = {
  customerId: Scalars['ID']
}

export type QueryProjectArgs = {
  projectId: Scalars['ID']
}

export type QueryTaskArgs = {
  taskId: Scalars['ID']
}

export type QueryTeamBySlugArgs = {
  slug: Scalars['String']
}

export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['ID']>
}

export type QueryWorkHoursArgs = {
  from: Scalars['Date']
  to?: InputMaybe<Scalars['Date']>
  userIds?: InputMaybe<Array<Scalars['ID']>>
}

export type Task = {
  __typename?: 'Task'
  archived: Scalars['Boolean']
  hasWorkHours: Scalars['Boolean']
  /** Identifies the task */
  id: Scalars['ID']
  project: Project
  /** The user can identify the task in the UI */
  title: Scalars['String']
  workhours: Array<WorkHour>
}

export type TaskInput = {
  projectId: Scalars['ID']
  title: Scalars['String']
}

export type Team = {
  __typename?: 'Team'
  /** List of all customers of the team */
  customers: Array<Customer>
  /** Identifier of the team */
  id: Scalars['ID']
  inviteKey: Scalars['String']
  /** All members of the team */
  members: Array<User>
  /** Slug that is used in the team URL */
  slug: Scalars['String']
  /** Color theme of the team */
  theme: Theme
  /** Title of the team */
  title: Scalars['String']
}

export type TeamInput = {
  /** Slug that is used in the team URL */
  slug: Scalars['String']
  /** Color theme of the team */
  theme?: InputMaybe<Theme>
  /** Title of the team */
  title: Scalars['String']
}

export enum Theme {
  Blue = 'BLUE',
  Gray = 'GRAY',
  Green = 'GREEN',
  Indigo = 'INDIGO',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  Yellow = 'YELLOW',
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  /** Returns the list of projects where the user is a member */
  projects: Array<Project>
}

export type WorkHour = {
  __typename?: 'WorkHour'
  comment?: Maybe<Scalars['String']>
  date: Scalars['Date']
  /** Duration of the work hour in minutes */
  duration: Scalars['Int']
  /** Identifies the work hour */
  id: Scalars['ID']
  project: Project
  /** Task for which the working hour was booked */
  task: Task
}

export type WorkHourInput = {
  comment?: InputMaybe<Scalars['String']>
  date: Scalars['Date']
  /** Duration of the work hour in minutes */
  duration: Scalars['Int']
  taskId: Scalars['ID']
}

export type TeamsQueryVariables = Exact<{ [key: string]: never }>

export type TeamsQuery = {
  __typename?: 'Query'
  teams: Array<{ __typename?: 'Team'; id: string; title: string; slug: string }>
}

export type ProjectQueryVariables = Exact<{
  projectId: Scalars['ID']
}>

export type ProjectQuery = {
  __typename?: 'Query'
  project: {
    __typename?: 'Project'
    id: string
    title: string
    startDate?: string | null | undefined
    endDate?: string | null | undefined
    tasks: Array<{
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }>
  }
}

export type TaskFragment = {
  __typename?: 'Task'
  id: string
  title: string
  hasWorkHours: boolean
  project: { __typename?: 'Project'; id: string; title: string }
}

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>

export type ProjectsQuery = {
  __typename?: 'Query'
  projects: Array<{
    __typename?: 'Project'
    id: string
    title: string
    startDate?: string | null | undefined
    endDate?: string | null | undefined
    tasks: Array<{
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }>
  }>
}

export type ProjectFragment = {
  __typename?: 'Project'
  id: string
  title: string
  startDate?: string | null | undefined
  endDate?: string | null | undefined
  tasks: Array<{
    __typename?: 'Task'
    id: string
    title: string
    hasWorkHours: boolean
    project: { __typename?: 'Project'; id: string; title: string }
  }>
}

export type ProjectCreateMutationVariables = Exact<{
  data: ProjectInput
}>

export type ProjectCreateMutation = {
  __typename?: 'Mutation'
  projectCreate: {
    __typename?: 'Project'
    id: string
    title: string
    startDate?: string | null | undefined
    endDate?: string | null | undefined
    tasks: Array<{
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }>
  }
}

export type ProjectDeleteMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type ProjectDeleteMutation = {
  __typename?: 'Mutation'
  projectDelete: {
    __typename?: 'Project'
    id: string
    title: string
    startDate?: string | null | undefined
    endDate?: string | null | undefined
    tasks: Array<{
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }>
  }
}

export type ProjectUpdateMutationVariables = Exact<{
  id: Scalars['ID']
  data: ProjectInput
}>

export type ProjectUpdateMutation = {
  __typename?: 'Mutation'
  projectUpdate: {
    __typename?: 'Project'
    id: string
    title: string
    startDate?: string | null | undefined
    endDate?: string | null | undefined
    tasks: Array<{
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }>
  }
}

export type TaskCreateMutationVariables = Exact<{
  data: TaskInput
}>

export type TaskCreateMutation = {
  __typename?: 'Mutation'
  taskCreate: {
    __typename?: 'Task'
    id: string
    title: string
    hasWorkHours: boolean
    project: { __typename?: 'Project'; id: string; title: string }
  }
}

export type TaskDeleteMutationVariables = Exact<{
  id: Scalars['ID']
  hasWorkHours: Scalars['Boolean']
}>

export type TaskDeleteMutation = {
  __typename?: 'Mutation'
  taskDelete?: {
    __typename?: 'Task'
    id: string
    title: string
    hasWorkHours: boolean
    project: { __typename?: 'Project'; id: string; title: string }
  }
  taskArchive?: {
    __typename?: 'Task'
    id: string
    title: string
    hasWorkHours: boolean
    project: { __typename?: 'Project'; id: string; title: string }
  }
}

export type TaskUpdateMutationVariables = Exact<{
  id: Scalars['ID']
  data: TaskInput
}>

export type TaskUpdateMutation = {
  __typename?: 'Mutation'
  taskUpdate: {
    __typename?: 'Task'
    id: string
    title: string
    hasWorkHours: boolean
    project: { __typename?: 'Project'; id: string; title: string }
  }
}

export type TeamQueryVariables = Exact<{ [key: string]: never }>

export type TeamQuery = {
  __typename?: 'Query'
  team: {
    __typename?: 'Team'
    id: string
    title: string
    slug: string
    theme: Theme
    inviteKey: string
    members: Array<{
      __typename?: 'User'
      id: string
      name?: string | null | undefined
      image?: string | null | undefined
      projects: Array<{ __typename?: 'Project'; id: string; title: string }>
    }>
  }
}

export type TeamFragment = {
  __typename?: 'Team'
  id: string
  title: string
  slug: string
  theme: Theme
  inviteKey: string
}

export type TeamCreateMutationVariables = Exact<{
  data: TeamInput
}>

export type TeamCreateMutation = {
  __typename?: 'Mutation'
  teamCreate: { __typename?: 'Team'; id: string; title: string; slug: string; theme: Theme; inviteKey: string }
}

export type TeamUpdateMutationVariables = Exact<{
  id: Scalars['ID']
  data: TeamInput
}>

export type TeamUpdateMutation = {
  __typename?: 'Mutation'
  teamUpdate: { __typename?: 'Team'; id: string; title: string; slug: string; theme: Theme; inviteKey: string }
}

export type WorkHourCreateMutationVariables = Exact<{
  duration: Scalars['Int']
  taskId: Scalars['ID']
  date: Scalars['Date']
  comment?: InputMaybe<Scalars['String']>
}>

export type WorkHourCreateMutation = {
  __typename?: 'Mutation'
  workHourCreate: {
    __typename?: 'WorkHour'
    id: string
    comment?: string | null | undefined
    date: string
    duration: number
    project: {
      __typename?: 'Project'
      id: string
      title: string
      startDate?: string | null | undefined
      endDate?: string | null | undefined
    }
  }
}

export type WorkHourDeleteMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type WorkHourDeleteMutation = {
  __typename?: 'Mutation'
  workHourDelete: { __typename?: 'WorkHour'; id: string }
}

export type WorkHourUpdateMutationVariables = Exact<{
  id: Scalars['ID']
  data: WorkHourInput
}>

export type WorkHourUpdateMutation = {
  __typename?: 'Mutation'
  workHourUpdate: {
    __typename?: 'WorkHour'
    id: string
    date: string
    comment?: string | null | undefined
    duration: number
    project: {
      __typename?: 'Project'
      id: string
      title: string
      startDate?: string | null | undefined
      endDate?: string | null | undefined
      tasks: Array<{
        __typename?: 'Task'
        id: string
        title: string
        hasWorkHours: boolean
        project: { __typename?: 'Project'; id: string; title: string }
      }>
    }
    task: {
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }
  }
}

export type WorkHoursQueryVariables = Exact<{
  from: Scalars['Date']
}>

export type WorkHoursQuery = {
  __typename?: 'Query'
  workHours: Array<{
    __typename?: 'WorkHour'
    id: string
    date: string
    comment?: string | null | undefined
    duration: number
    project: {
      __typename?: 'Project'
      id: string
      title: string
      startDate?: string | null | undefined
      endDate?: string | null | undefined
      tasks: Array<{
        __typename?: 'Task'
        id: string
        title: string
        hasWorkHours: boolean
        project: { __typename?: 'Project'; id: string; title: string }
      }>
    }
    task: {
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }
  }>
}

export type WorkHourFragment = {
  __typename?: 'WorkHour'
  id: string
  date: string
  comment?: string | null | undefined
  duration: number
  project: {
    __typename?: 'Project'
    id: string
    title: string
    startDate?: string | null | undefined
    endDate?: string | null | undefined
    tasks: Array<{
      __typename?: 'Task'
      id: string
      title: string
      hasWorkHours: boolean
      project: { __typename?: 'Project'; id: string; title: string }
    }>
  }
  task: {
    __typename?: 'Task'
    id: string
    title: string
    hasWorkHours: boolean
    project: { __typename?: 'Project'; id: string; title: string }
  }
}

export type CustomerCreateMutationVariables = Exact<{
  data: CustomerInput
}>

export type CustomerCreateMutation = {
  __typename?: 'Mutation'
  customerCreate: { __typename?: 'Customer'; id: string; title: string }
}

export type CustomersQueryVariables = Exact<{
  slug: Scalars['String']
}>

export type CustomersQuery = {
  __typename?: 'Query'
  teamBySlug: {
    __typename?: 'Team'
    id: string
    title: string
    customers: Array<{ __typename?: 'Customer'; id: string; title: string }>
  }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    id: string
    image?: string | null | undefined
    name?: string | null | undefined
    projects: Array<{ __typename?: 'Project'; id: string; title: string }>
  }
}

export type TeamAcceptInviteMutationVariables = Exact<{
  inviteKey: Scalars['String']
}>

export type TeamAcceptInviteMutation = {
  __typename?: 'Mutation'
  teamAcceptInvite: {
    __typename?: 'Team'
    id: string
    title: string
    slug: string
    theme: Theme
    inviteKey: string
    members: Array<{ __typename?: 'User'; id: string; name?: string | null | undefined }>
  }
}

export const TeamFragmentDoc = gql`
  fragment Team on Team {
    id
    title
    slug
    theme
    inviteKey
  }
`
export const TaskFragmentDoc = gql`
  fragment Task on Task {
    id
    title
    hasWorkHours
    project {
      id
      title
    }
  }
`
export const ProjectFragmentDoc = gql`
  fragment Project on Project {
    id
    title
    startDate
    endDate
    tasks {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`
export const WorkHourFragmentDoc = gql`
  fragment WorkHour on WorkHour {
    id
    date
    comment
    duration
    project {
      ...Project
    }
    task {
      ...Task
    }
  }
  ${ProjectFragmentDoc}
  ${TaskFragmentDoc}
`
export const TeamsDocument = gql`
  query teams {
    teams {
      id
      title
      slug
    }
  }
`

export function useTeamsQuery(options: Omit<Urql.UseQueryArgs<TeamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamsQuery>({ query: TeamsDocument, ...options })
}
export const ProjectDocument = gql`
  query project($projectId: ID!) {
    project(projectId: $projectId) {
      ...Project
      tasks {
        ...Task
      }
    }
  }
  ${ProjectFragmentDoc}
  ${TaskFragmentDoc}
`

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectQuery>({ query: ProjectDocument, ...options })
}
export const ProjectsDocument = gql`
  query projects {
    projects {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options })
}
export const ProjectCreateDocument = gql`
  mutation projectCreate($data: ProjectInput!) {
    projectCreate(data: $data) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useProjectCreateMutation() {
  return Urql.useMutation<ProjectCreateMutation, ProjectCreateMutationVariables>(ProjectCreateDocument)
}
export const ProjectDeleteDocument = gql`
  mutation projectDelete($id: ID!) {
    projectDelete(id: $id) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useProjectDeleteMutation() {
  return Urql.useMutation<ProjectDeleteMutation, ProjectDeleteMutationVariables>(ProjectDeleteDocument)
}
export const ProjectUpdateDocument = gql`
  mutation projectUpdate($id: ID!, $data: ProjectInput!) {
    projectUpdate(id: $id, data: $data) {
      ...Project
    }
  }
  ${ProjectFragmentDoc}
`

export function useProjectUpdateMutation() {
  return Urql.useMutation<ProjectUpdateMutation, ProjectUpdateMutationVariables>(ProjectUpdateDocument)
}
export const TaskCreateDocument = gql`
  mutation taskCreate($data: TaskInput!) {
    taskCreate(data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`

export function useTaskCreateMutation() {
  return Urql.useMutation<TaskCreateMutation, TaskCreateMutationVariables>(TaskCreateDocument)
}
export const TaskDeleteDocument = gql`
  mutation taskDelete($id: ID!, $hasWorkHours: Boolean!) {
    taskDelete(id: $id) @skip(if: $hasWorkHours) {
      ...Task
    }
    taskArchive(taskId: $id) @include(if: $hasWorkHours) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`

export function useTaskDeleteMutation() {
  return Urql.useMutation<TaskDeleteMutation, TaskDeleteMutationVariables>(TaskDeleteDocument)
}
export const TaskUpdateDocument = gql`
  mutation taskUpdate($id: ID!, $data: TaskInput!) {
    taskUpdate(id: $id, data: $data) {
      ...Task
    }
  }
  ${TaskFragmentDoc}
`

export function useTaskUpdateMutation() {
  return Urql.useMutation<TaskUpdateMutation, TaskUpdateMutationVariables>(TaskUpdateDocument)
}
export const TeamDocument = gql`
  query team {
    team {
      ...Team
      members {
        id
        name
        image
        projects {
          id
          title
        }
      }
    }
  }
  ${TeamFragmentDoc}
`

export function useTeamQuery(options: Omit<Urql.UseQueryArgs<TeamQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamQuery>({ query: TeamDocument, ...options })
}
export const TeamCreateDocument = gql`
  mutation teamCreate($data: TeamInput!) {
    teamCreate(data: $data) {
      ...Team
    }
  }
  ${TeamFragmentDoc}
`

export function useTeamCreateMutation() {
  return Urql.useMutation<TeamCreateMutation, TeamCreateMutationVariables>(TeamCreateDocument)
}
export const TeamUpdateDocument = gql`
  mutation teamUpdate($id: ID!, $data: TeamInput!) {
    teamUpdate(id: $id, data: $data) {
      ...Team
    }
  }
  ${TeamFragmentDoc}
`

export function useTeamUpdateMutation() {
  return Urql.useMutation<TeamUpdateMutation, TeamUpdateMutationVariables>(TeamUpdateDocument)
}
export const WorkHourCreateDocument = gql`
  mutation workHourCreate($duration: Int!, $taskId: ID!, $date: Date!, $comment: String) {
    workHourCreate(duration: $duration, taskId: $taskId, date: $date, comment: $comment) {
      id
      comment
      date
      duration
      project {
        id
        title
        startDate
        endDate
      }
    }
  }
`

export function useWorkHourCreateMutation() {
  return Urql.useMutation<WorkHourCreateMutation, WorkHourCreateMutationVariables>(WorkHourCreateDocument)
}
export const WorkHourDeleteDocument = gql`
  mutation workHourDelete($id: ID!) {
    workHourDelete(id: $id) {
      id
    }
  }
`

export function useWorkHourDeleteMutation() {
  return Urql.useMutation<WorkHourDeleteMutation, WorkHourDeleteMutationVariables>(WorkHourDeleteDocument)
}
export const WorkHourUpdateDocument = gql`
  mutation workHourUpdate($id: ID!, $data: WorkHourInput!) {
    workHourUpdate(id: $id, data: $data) {
      ...WorkHour
    }
  }
  ${WorkHourFragmentDoc}
`

export function useWorkHourUpdateMutation() {
  return Urql.useMutation<WorkHourUpdateMutation, WorkHourUpdateMutationVariables>(WorkHourUpdateDocument)
}
export const WorkHoursDocument = gql`
  query workHours($from: Date!) {
    workHours(from: $from) {
      ...WorkHour
    }
  }
  ${WorkHourFragmentDoc}
`

export function useWorkHoursQuery(options: Omit<Urql.UseQueryArgs<WorkHoursQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<WorkHoursQuery>({ query: WorkHoursDocument, ...options })
}
export const CustomerCreateDocument = gql`
  mutation customerCreate($data: CustomerInput!) {
    customerCreate(data: $data) {
      id
      title
    }
  }
`

export function useCustomerCreateMutation() {
  return Urql.useMutation<CustomerCreateMutation, CustomerCreateMutationVariables>(CustomerCreateDocument)
}
export const CustomersDocument = gql`
  query customers($slug: String!) {
    teamBySlug(slug: $slug) {
      id
      title
      customers {
        id
        title
      }
    }
  }
`

export function useCustomersQuery(options: Omit<Urql.UseQueryArgs<CustomersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CustomersQuery>({ query: CustomersDocument, ...options })
}
export const MeDocument = gql`
  query me {
    user {
      id
      image
      name
      projects {
        id
        title
      }
    }
  }
`

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options })
}
export const TeamAcceptInviteDocument = gql`
  mutation teamAcceptInvite($inviteKey: String!) {
    teamAcceptInvite(inviteKey: $inviteKey) {
      id
      title
      slug
      theme
      inviteKey
      members {
        id
        name
      }
    }
  }
`

export function useTeamAcceptInviteMutation() {
  return Urql.useMutation<TeamAcceptInviteMutation, TeamAcceptInviteMutationVariables>(TeamAcceptInviteDocument)
}

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTeamsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ teams })
 *   )
 * })
 */
export const mockTeamsQuery = (
  resolver: ResponseResolver<GraphQLRequest<TeamsQueryVariables>, GraphQLContext<TeamsQuery>, any>,
) => graphql.query<TeamsQuery, TeamsQueryVariables>('teams', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectQuery((req, res, ctx) => {
 *   const { projectId } = req.variables;
 *   return res(
 *     ctx.data({ project })
 *   )
 * })
 */
export const mockProjectQuery = (
  resolver: ResponseResolver<GraphQLRequest<ProjectQueryVariables>, GraphQLContext<ProjectQuery>, any>,
) => graphql.query<ProjectQuery, ProjectQueryVariables>('project', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ projects })
 *   )
 * })
 */
export const mockProjectsQuery = (
  resolver: ResponseResolver<GraphQLRequest<ProjectsQueryVariables>, GraphQLContext<ProjectsQuery>, any>,
) => graphql.query<ProjectsQuery, ProjectsQueryVariables>('projects', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectCreateMutation((req, res, ctx) => {
 *   const { data } = req.variables;
 *   return res(
 *     ctx.data({ projectCreate })
 *   )
 * })
 */
export const mockProjectCreateMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<ProjectCreateMutationVariables>,
    GraphQLContext<ProjectCreateMutation>,
    any
  >,
) => graphql.mutation<ProjectCreateMutation, ProjectCreateMutationVariables>('projectCreate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectDeleteMutation((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ projectDelete })
 *   )
 * })
 */
export const mockProjectDeleteMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<ProjectDeleteMutationVariables>,
    GraphQLContext<ProjectDeleteMutation>,
    any
  >,
) => graphql.mutation<ProjectDeleteMutation, ProjectDeleteMutationVariables>('projectDelete', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockProjectUpdateMutation((req, res, ctx) => {
 *   const { id, data } = req.variables;
 *   return res(
 *     ctx.data({ projectUpdate })
 *   )
 * })
 */
export const mockProjectUpdateMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<ProjectUpdateMutationVariables>,
    GraphQLContext<ProjectUpdateMutation>,
    any
  >,
) => graphql.mutation<ProjectUpdateMutation, ProjectUpdateMutationVariables>('projectUpdate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTaskCreateMutation((req, res, ctx) => {
 *   const { data } = req.variables;
 *   return res(
 *     ctx.data({ taskCreate })
 *   )
 * })
 */
export const mockTaskCreateMutation = (
  resolver: ResponseResolver<GraphQLRequest<TaskCreateMutationVariables>, GraphQLContext<TaskCreateMutation>, any>,
) => graphql.mutation<TaskCreateMutation, TaskCreateMutationVariables>('taskCreate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTaskDeleteMutation((req, res, ctx) => {
 *   const { id, hasWorkHours } = req.variables;
 *   return res(
 *     ctx.data({ taskDelete, taskArchive })
 *   )
 * })
 */
export const mockTaskDeleteMutation = (
  resolver: ResponseResolver<GraphQLRequest<TaskDeleteMutationVariables>, GraphQLContext<TaskDeleteMutation>, any>,
) => graphql.mutation<TaskDeleteMutation, TaskDeleteMutationVariables>('taskDelete', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTaskUpdateMutation((req, res, ctx) => {
 *   const { id, data } = req.variables;
 *   return res(
 *     ctx.data({ taskUpdate })
 *   )
 * })
 */
export const mockTaskUpdateMutation = (
  resolver: ResponseResolver<GraphQLRequest<TaskUpdateMutationVariables>, GraphQLContext<TaskUpdateMutation>, any>,
) => graphql.mutation<TaskUpdateMutation, TaskUpdateMutationVariables>('taskUpdate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTeamQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ team })
 *   )
 * })
 */
export const mockTeamQuery = (
  resolver: ResponseResolver<GraphQLRequest<TeamQueryVariables>, GraphQLContext<TeamQuery>, any>,
) => graphql.query<TeamQuery, TeamQueryVariables>('team', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTeamCreateMutation((req, res, ctx) => {
 *   const { data } = req.variables;
 *   return res(
 *     ctx.data({ teamCreate })
 *   )
 * })
 */
export const mockTeamCreateMutation = (
  resolver: ResponseResolver<GraphQLRequest<TeamCreateMutationVariables>, GraphQLContext<TeamCreateMutation>, any>,
) => graphql.mutation<TeamCreateMutation, TeamCreateMutationVariables>('teamCreate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTeamUpdateMutation((req, res, ctx) => {
 *   const { id, data } = req.variables;
 *   return res(
 *     ctx.data({ teamUpdate })
 *   )
 * })
 */
export const mockTeamUpdateMutation = (
  resolver: ResponseResolver<GraphQLRequest<TeamUpdateMutationVariables>, GraphQLContext<TeamUpdateMutation>, any>,
) => graphql.mutation<TeamUpdateMutation, TeamUpdateMutationVariables>('teamUpdate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkHourCreateMutation((req, res, ctx) => {
 *   const { duration, taskId, date, comment } = req.variables;
 *   return res(
 *     ctx.data({ workHourCreate })
 *   )
 * })
 */
export const mockWorkHourCreateMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<WorkHourCreateMutationVariables>,
    GraphQLContext<WorkHourCreateMutation>,
    any
  >,
) => graphql.mutation<WorkHourCreateMutation, WorkHourCreateMutationVariables>('workHourCreate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkHourDeleteMutation((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ workHourDelete })
 *   )
 * })
 */
export const mockWorkHourDeleteMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<WorkHourDeleteMutationVariables>,
    GraphQLContext<WorkHourDeleteMutation>,
    any
  >,
) => graphql.mutation<WorkHourDeleteMutation, WorkHourDeleteMutationVariables>('workHourDelete', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkHourUpdateMutation((req, res, ctx) => {
 *   const { id, data } = req.variables;
 *   return res(
 *     ctx.data({ workHourUpdate })
 *   )
 * })
 */
export const mockWorkHourUpdateMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<WorkHourUpdateMutationVariables>,
    GraphQLContext<WorkHourUpdateMutation>,
    any
  >,
) => graphql.mutation<WorkHourUpdateMutation, WorkHourUpdateMutationVariables>('workHourUpdate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockWorkHoursQuery((req, res, ctx) => {
 *   const { from } = req.variables;
 *   return res(
 *     ctx.data({ workHours })
 *   )
 * })
 */
export const mockWorkHoursQuery = (
  resolver: ResponseResolver<GraphQLRequest<WorkHoursQueryVariables>, GraphQLContext<WorkHoursQuery>, any>,
) => graphql.query<WorkHoursQuery, WorkHoursQueryVariables>('workHours', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCustomerCreateMutation((req, res, ctx) => {
 *   const { data } = req.variables;
 *   return res(
 *     ctx.data({ customerCreate })
 *   )
 * })
 */
export const mockCustomerCreateMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<CustomerCreateMutationVariables>,
    GraphQLContext<CustomerCreateMutation>,
    any
  >,
) => graphql.mutation<CustomerCreateMutation, CustomerCreateMutationVariables>('customerCreate', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCustomersQuery((req, res, ctx) => {
 *   const { slug } = req.variables;
 *   return res(
 *     ctx.data({ teamBySlug })
 *   )
 * })
 */
export const mockCustomersQuery = (
  resolver: ResponseResolver<GraphQLRequest<CustomersQueryVariables>, GraphQLContext<CustomersQuery>, any>,
) => graphql.query<CustomersQuery, CustomersQueryVariables>('customers', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockMeQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ user })
 *   )
 * })
 */
export const mockMeQuery = (
  resolver: ResponseResolver<GraphQLRequest<MeQueryVariables>, GraphQLContext<MeQuery>, any>,
) => graphql.query<MeQuery, MeQueryVariables>('me', resolver)

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockTeamAcceptInviteMutation((req, res, ctx) => {
 *   const { inviteKey } = req.variables;
 *   return res(
 *     ctx.data({ teamAcceptInvite })
 *   )
 * })
 */
export const mockTeamAcceptInviteMutation = (
  resolver: ResponseResolver<
    GraphQLRequest<TeamAcceptInviteMutationVariables>,
    GraphQLContext<TeamAcceptInviteMutation>,
    any
  >,
) => graphql.mutation<TeamAcceptInviteMutation, TeamAcceptInviteMutationVariables>('teamAcceptInvite', resolver)
