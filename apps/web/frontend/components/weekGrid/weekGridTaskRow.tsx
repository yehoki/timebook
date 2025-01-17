import { parseISO } from 'date-fns'

import { FormattedDuration } from '@progwise/timebook-ui'

import { FragmentType, graphql, useFragment } from '../../generated/gql'
import { TrackingButtons } from '../trackingButtons/trackingButtons'
import { TaskLockButton } from './taskLockButton'
import { WeekGridTaskDayCell } from './weekGridTaskDayCell'

const WeekGridTaskRowFragment = graphql(`
  fragment WeekGridTaskRow on Task {
    id
    title
    project {
      startDate
      endDate
    }
    workHourOfDays(from: $from, to: $to) {
      date
      workHour {
        duration
      }
      isLocked
    }
    project {
      id
      isProjectMember
      isArchived
    }
    tracking {
      ...TrackingButtonsTracking
    }
    isLockedByAdmin
    ...TrackingButtonsTask
    ...TaskLockButton
  }
`)

interface WeekGridTaskRowProps {
  task: FragmentType<typeof WeekGridTaskRowFragment>
}

export const WeekGridTaskRow = ({ task: taskFragment }: WeekGridTaskRowProps) => {
  const task = useFragment(WeekGridTaskRowFragment, taskFragment)
  const taskDurations = task.workHourOfDays
    .map((workHour) => workHour.workHour?.duration ?? 0)
    .reduce((previous, current) => previous + current, 0)

  return (
    <div className="contents" role="row">
      <div className="pl-2" role="cell">
        {!task.isLockedByAdmin && !task.project.isArchived && (
          <TrackingButtons tracking={task.tracking} taskToTrack={task} />
        )}
      </div>
      <div className="px-2" role="cell">
        {task.title}
      </div>
      {task.workHourOfDays.map((workHourOfDay) => (
        <WeekGridTaskDayCell
          day={parseISO(workHourOfDay.date)}
          disabled={workHourOfDay.isLocked}
          taskId={task.id}
          duration={workHourOfDay.workHour?.duration ?? 0}
          key={workHourOfDay.date}
        />
      ))}
      <div className="text-center" role="cell">
        <FormattedDuration minutes={taskDurations} title="" />
      </div>
      <div className="px-2" role="cell">
        {task.project.isProjectMember && !task.isLockedByAdmin && !task.project.isArchived && (
          <TaskLockButton task={task} />
        )}
      </div>
    </div>
  )
}
