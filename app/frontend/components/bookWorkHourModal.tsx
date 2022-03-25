import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import {
  useWorkHourCreateMutation,
  useWorkHourUpdateMutation,
  useProjectsQuery,
  useWorkHourDeleteMutation,
} from '../generated/graphql'
import { Button } from './button/button'
import { InputField } from './inputField/inputField'
import { Modal } from './modal'
import { ErrorMessage } from '@hookform/error-message'

interface BookWorkHourModalProps {
  workHourItem: WorkHourItem
  onClose: () => void
}

export interface WorkHourItem {
  workHourId?: number
  date: Date
  duration: number
  projectId?: string
  taskId?: string
  comment?: string
}

export const BookWorkHourModal = (props: BookWorkHourModalProps): JSX.Element => {
  const { onClose, workHourItem } = props
  const [{ data }] = useProjectsQuery()
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<WorkHourItem>({ defaultValues: workHourItem, shouldUnregister: true })
  const [, createWorkHour] = useWorkHourCreateMutation()
  const [, updateWorkHour] = useWorkHourUpdateMutation()
  const [, deleteWorkHour] = useWorkHourDeleteMutation()

  if (!data?.projects) {
    return <div>Loading...</div>
  }

  const handleSubmitHelper = async (data: WorkHourItem) => {
    if (!data.taskId) {
      throw new Error('no Task selected')
    }

    const workHourInput = {
      duration: data.duration,
      taskId: data.taskId,
      date: format(data.date, 'yyyy-MM-dd'),
      comment: data.comment,
    }
    const result = await (!data.workHourId
      ? createWorkHour({ data: workHourInput })
      : updateWorkHour({
          id: data.workHourId.toString(),
          data: workHourInput,
        }))

    if (!result.error) {
      onClose()
    }
  }

  watch('projectId', workHourItem.projectId)
  const currentValues = getValues()
  const selectedProject = data?.projects.find((project) => project.id === currentValues.projectId)
  if (!selectedProject?.tasks.some((task) => task.id === currentValues.taskId)) {
    // eslint-disable-next-line unicorn/no-useless-undefined
    setValue('taskId', undefined)
  }

  const handleDelete = async () => {
    if (!workHourItem.workHourId?.toString) {
      throw new Error('No workHour item id')
    }
    await deleteWorkHour({ id: workHourItem.workHourId.toString() })
    onClose()
  }

  return (
    <Modal
      autoShowHide={false}
      title={workHourItem.workHourId ? 'Edit entry ' + workHourItem.workHourId : 'New entry'}
      actions={
        <>
          <Button variant="primary" form="book-work-hour" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          <Button variant="secondary" disabled={isSubmitting} onClick={onClose}>
            Cancel
          </Button>
          {workHourItem.workHourId && (
            <Button variant="tertiary" disabled={isSubmitting} onClick={handleDelete}>
              Delete
            </Button>
          )}
        </>
      }
    >
      <form className="w-full" id="book-work-hour" onSubmit={handleSubmit(handleSubmitHelper)}>
        <input type="hidden" {...register('date')} />
        <input type="hidden" {...register('workHourId')} />
        <div className="mb-4 flex flex-col">
          <label htmlFor="projectId" className="mb-2">
            Project
          </label>
          <select
            className="w-72 rounded-md"
            id="projectId"
            {...register('projectId', { required: 'Project is required' })}
          >
            <option value="">Please Select</option>
            {data?.projects.map((project) => {
              return (
                <option value={project.id} key={project.id}>
                  {project.title}
                </option>
              )
            })}
          </select>
          <ErrorMessage errors={errors} name="projectId" as={<span className="text-red-700" />} />
        </div>
        <div className="mb-4 flex flex-col">
          <label>
            <select className="w-72 rounded-md" {...register('taskId', { required: 'Task is required' })}>
              <option value="">Please Select</option>
              {selectedProject?.tasks.map((task) => {
                return (
                  <option value={task.id} key={task.id}>
                    {task.title}
                  </option>
                )
              })}
            </select>
          </label>
          <ErrorMessage errors={errors} name="taskId" as={<span className="text-red-700" />} />
        </div>
        <div className="flex flex-col gap-y-4">
          <InputField
            variant="primary"
            placeholder="Enter Work Duration"
            {...register('duration', { valueAsNumber: true, required: 'Duration is required' })}
          />
          <ErrorMessage errors={errors} name="duration" as={<span className="text-red-700" />} />
          <InputField variant="primary" placeholder="Notes (Optional)" {...register('comment')} />
        </div>
      </form>
    </Modal>
  )
}
