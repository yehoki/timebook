import { useForm } from 'react-hook-form'
import { InputField } from './inputField/inputField'
import { TaskFragment, TaskInput, useTaskUpdateMutation } from '../generated/graphql'
import { Button } from './button/button'
import { Modal } from './modal'

interface TaskDetailsModalProps {
  open: boolean
  onClose: () => void
  task: TaskFragment
}

export const TaskDetailsModal = (props: TaskDetailsModalProps): JSX.Element => {
  const { open, onClose, task } = props
  const [{ fetching }, taskUpdate] = useTaskUpdateMutation()
  const { register, handleSubmit, reset } = useForm<TaskInput>({
    defaultValues: {
      title: task.title,
      projectId: task.project.id,
    },
  })

  const handleSubmitTask = async (taskData: TaskInput) => {
    try {
      const result = await taskUpdate({
        id: task.id,
        data: {
          projectId: taskData.projectId,
          title: taskData.title,
        },
      })
      if (result.error) {
        throw new Error(`GraphQL Error ${result.error}`)
      }
      reset()
    } catch {}
    onClose()
  }

  return (
    <Modal
      open={open}
      title="Task Details"
      actions={
        <>
          <Button variant="secondarySlim" onClick={onClose} tooltip="Cancel the changes" disabled={fetching}>
            Cancel
          </Button>
          <Button
            form="task-details"
            type="submit"
            variant="primarySlim"
            tooltip="Submit the changes"
            disabled={fetching}
          >
            Save
          </Button>
        </>
      }
    >
      <form className="w-full" onSubmit={handleSubmit(handleSubmitTask)} id="task-details">
        <div className="mt-4 flex flex-col gap-5">
          <label>
            <span className="mr-2 whitespace-nowrap">Task Title</span>
            <InputField variant="primary" {...register('title', { required: true })} />
          </label>
          <label>
            <span className="mr-1 whitespace-nowrap">Project ID</span>
            <InputField variant="primary" {...register('projectId', { required: true })} readonly={true} />
          </label>
        </div>
      </form>
    </Modal>
  )
}
