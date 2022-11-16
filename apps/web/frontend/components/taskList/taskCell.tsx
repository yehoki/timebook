import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiTrash } from 'react-icons/bi'
import { CgSpinner } from 'react-icons/cg'

import { Button, InputField } from '@progwise/timebook-ui'

import { TaskFragment, useTaskUpdateMutation } from '../../generated/graphql'
import { DeleteTaskModal } from '../deleteTaskModal'
import { TaskFormData, taskInputSchema } from './taskList'

interface TaskCellProps {
  task: TaskFragment & { canModify: boolean }
}

export const TaskCell = ({ task }: TaskCellProps) => {
  const [{ fetching }, taskUpdate] = useTaskUpdateMutation()
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    mode: 'onChange',
    defaultValues: {
      title: task.title,
    },
    resolver: zodResolver(taskInputSchema),
  })

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const handleSubmitTask = async (taskData: TaskFormData) => {
    const result = await taskUpdate({
      id: task.id,
      data: {
        projectId: task.project.id,
        title: taskData.title,
      },
    })

    if (result.error) setError('title', { message: 'Network error' })
  }

  return (
    <>
      {task.canModify && (
        <Button ariaLabel="Delete Task" variant="danger" tooltip="Delete Task" onClick={() => setOpenDeleteModal(true)}>
          <BiTrash />
        </Button>
      )}

      <div className="flex flex-col ml-2">
        <span className="flex flex-row gap-2">
          <InputField
            variant="primary"
            {...register('title', { required: true })}
            onBlur={handleSubmit(handleSubmitTask)}
          />
          {fetching && <CgSpinner className="inline h-8 w-8 animate-spin dark:text-blue-600" />}
        </span>
        <br />

        <ErrorMessage errors={errors} name="title" as={<span role="alert" className="text-red-700" />} />
      </div>

      {openDeleteModal && <DeleteTaskModal open onClose={() => setOpenDeleteModal(false)} task={task} />}
    </>
  )
}