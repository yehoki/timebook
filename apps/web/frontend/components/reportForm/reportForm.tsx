import { endOfMonth, format, formatISO, parse, startOfMonth } from 'date-fns'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { useQuery } from 'urql'

import { FormattedDuration } from '@progwise/timebook-ui'

import { graphql, useFragment } from '../../generated/gql'
import { ProjectFilter, ReportProjectFragment as ReportProjectFragmentType } from '../../generated/gql/graphql'
import { ComboBox } from '../combobox/combobox'
import { ReportUserSelect } from './reportUserSelect'

const ReportProjectFragment = graphql(`
  fragment ReportProject on Project {
    id
    title
  }
`)

const ReportProjectsQueryDocument = graphql(`
  query reportProjects($from: Date!, $to: Date, $filter: ProjectFilter) {
    projects(from: $from, to: $to, filter: $filter) {
      ...ReportProject
    }
  }
`)

const ReportQueryDocument = graphql(`
  query report($projectId: ID!, $from: Date!, $to: Date!, $userId: ID, $groupByUser: Boolean!) {
    report(projectId: $projectId, from: $from, to: $to, userId: $userId) {
      groupedByDate {
        date
        duration
        workHours {
          id
          duration
          user {
            name
          }
          task {
            title
          }
        }
      }
      groupedByTask {
        task {
          id
          title
        }
        duration
      }
      groupedByUser @include(if: $groupByUser) {
        user {
          id
          name
        }
        duration
      }
    }
  }
`)

export const ReportForm = () => {
  const router = useRouter()
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>()
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>()
  const [date, setDate] = useState(new Date())
  const from = startOfMonth(date)
  const to = endOfMonth(date)
  const fromString = formatISO(from, { representation: 'date' })
  const endString = formatISO(to, { representation: 'date' })

  const [{ data: projectsData }] = useQuery({
    query: ReportProjectsQueryDocument,
    variables: { from: fromString, filter: ProjectFilter.All },
  })
  const projects = useFragment(ReportProjectFragment, projectsData?.projects)

  const [{ data: reportGroupedData }] = useQuery({
    query: ReportQueryDocument,
    variables: {
      projectId: selectedProjectId ?? '',
      from: fromString,
      to: endString,
      userId: selectedUserId,
      groupByUser: !selectedUserId,
    },
    pause: !router.isReady || !selectedProjectId,
  })

  const selectedProject = projects?.find((project) => project.id === selectedProjectId)

  const handleChange = (selectedProjectId: string | null) => {
    setSelectedProjectId(selectedProjectId ?? undefined)
  }

  return (
    <>
      <div>
        <h1 className="my-4 font-bold">
          Detailed time report: {fromString} - {endString}
        </h1>
        <h2>Select a project</h2>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-row gap-4">
            <ComboBox<ReportProjectFragmentType>
              value={selectedProject}
              displayValue={(project) => project.title}
              noOptionLabel="No Project"
              onChange={handleChange}
              options={projects ?? []}
            />
            {selectedProjectId && (
              <ReportUserSelect
                projectId={selectedProjectId}
                selectedUserId={selectedUserId}
                onUserChange={(newUserId) => setSelectedUserId(newUserId)}
                from={from}
                to={to}
              />
            )}
          </div>
          <div>
            <input
              className="rounded-lg border-none py-2 pl-3 text-sm leading-5  shadow-md dark:bg-slate-700"
              type="month"
              value={format(date, 'yyyy-MM')}
              onChange={(event) => {
                if (event.target.value) {
                  const newDate = parse(event.target.value, 'yyyy-MM', new Date())
                  setDate(newDate)
                }
              }}
            />
          </div>
        </div>
        {selectedProject && (
          <section className="mt-10 grid w-full grid-cols-3 gap-2 text-left">
            <article className="contents border-y text-lg">
              <hr className="col-span-3 -mb-2 h-0.5 bg-gray-600" />
              <strong>Tasks</strong>
              <strong>Person</strong>
              <strong>Hours</strong>
            </article>
            {reportGroupedData?.report.groupedByDate.map((group) => (
              <Fragment key={group.date}>
                <article className="contents">
                  <hr className="col-span-3 -mt-2 h-0.5 bg-gray-700 " />
                  <strong className="col-span-2">{group.date}</strong>
                  <FormattedDuration
                    title="Total work hours of the day"
                    minutes={group.workHours
                      .map((WorkHourDuration) => WorkHourDuration.duration)
                      .reduce((sum, duration) => duration + sum, 0)}
                  />
                </article>
                {group.workHours.map((workHour) => (
                  <article key={workHour.id} className="contents">
                    <h1>{workHour.task.title}</h1>
                    <span>{workHour.user?.name}</span>
                    <FormattedDuration title="Work duration" minutes={workHour.duration} />
                  </article>
                ))}
              </Fragment>
            ))}
            <article className="contents">
              <hr className="col-span-3 -mt-2 h-0.5 bg-gray-600" />
              <strong className="col-span-2">Total</strong>
              <FormattedDuration
                title="Total work hours of the selected project"
                minutes={reportGroupedData?.report.groupedByDate
                  .map((WorkHourDuration) => WorkHourDuration.duration)
                  .reduce((sum, duration) => duration + sum, 0)}
              />
            </article>
            <article className="contents">
              <hr className="col-span-3 my-8 h-0.5 border-0 bg-gray-600" />
              <strong className="col-span-3">Total by Task</strong>
              {reportGroupedData?.report.groupedByTask.map((entry) => (
                <div key={entry.task.id} className="grid grid-flow-row">
                  <span>{entry.task.title}</span>
                  <FormattedDuration title="Total by task" minutes={entry.duration} />
                </div>
              ))}
              <hr className="col-span-3 my-8 h-0.5 border-0 bg-gray-600" />
            </article>
            {reportGroupedData?.report.groupedByUser && (
              <article className="contents">
                <strong className="col-span-3">Total by Person</strong>
                {reportGroupedData.report.groupedByUser.map((group) => (
                  <div key={group.user.id} className="grid grid-flow-row">
                    <span>{group.user.name}</span>
                    <FormattedDuration title="Total by user" minutes={group.duration} />
                  </div>
                ))}
                <hr className="col-span-3 -mt-2 h-0.5 bg-gray-600" />
              </article>
            )}
          </section>
        )}
      </div>
    </>
  )
}
