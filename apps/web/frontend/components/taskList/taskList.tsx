import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  Button,
  InputField,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFootRow,
  TableHead,
  TableHeadCell,
  TableHeadRow,
  TableRow,
} from '@progwise/timebook-ui'

import { ProjectFragment, TaskFragment, TaskInput, useTaskCreateMutation } from '../../generated/graphql'
import { TaskCell } from './taskCell'

export type TaskFormData = Pick<TaskInput, 'title'>

export const taskInputSchema: yup.SchemaOf<TaskFormData> = yup.object({
  title: yup.string().trim().required().min(4).max(50),
})

export interface TaskListProps {
  tasks: (TaskFragment & { canModify: boolean })[]
  project: ProjectFragment & { canModify: boolean }
  className?: string
}

export const TaskList = (props: TaskListProps): JSX.Element => {
  const { tasks, project, className } = props
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TaskFormData>({ resolver: yupResolver(taskInputSchema) })
  const [, taskCreate] = useTaskCreateMutation()

  const handleAddTask = async (taskData: TaskFormData) => {
    try {
      const result = await taskCreate({
        data: {
          projectId: project.id,
          title: taskData.title,
        },
      })
      if (result.error) {
        throw new Error(`GraphQL Error ${result.error}`)
      }
      reset()
    } catch {}
  }

  return (
    <section className={className}>
      <Table className="min-w-full  dark:bg-slate-800">
        <TableHead>
          <TableHeadRow>
            <TableHeadCell>Tasks</TableHeadCell>
            <TableHeadCell className="text-center">Billable / Hourly rate</TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="mt-1 flex items-center">
                <TaskCell task={task} />
              </TableCell>
              <TableCell className="text-center">{task.hourlyRate ?? 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {project.canModify && (
          <TableFoot>
            <TableFootRow>
              <TableCell>
                <form className="flex items-start gap-4" onSubmit={handleSubmit(handleAddTask)}>
                  <InputField
                    variant="primary"
                    placeholder="Enter Taskname"
                    className=" dark:bg-slate-800 dark:text-white"
                    {...register('title')}
                    errorMessage={errors.title?.message}
                  />

                  <Button variant="secondary" type="submit" disabled={isSubmitting}>
                    Add task
                  </Button>
                </form>
              </TableCell>
            </TableFootRow>
          </TableFoot>
        )}
      </Table>
    </section>
  )
}
