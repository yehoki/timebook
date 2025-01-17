import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiTrash } from 'react-icons/bi'
import { useMutation } from 'urql'

import { Button, InputField, TableCell, TableRow } from '@progwise/timebook-ui'
import { taskInputValidations } from '@progwise/timebook-validations'

import { FragmentType, graphql, useFragment } from '../../generated/gql'
import { TaskUpdateInput } from '../../generated/gql/graphql'
import { DeleteTaskModal } from '../deleteTaskModal'
import { LockSwitch } from './lockSwitch'

export const TaskRowFragment = graphql(`
  fragment TaskRow on Task {
    id
    title
    canModify
    isLockedByAdmin
    ...DeleteTaskModal
  }
`)

const TaskUpdateMutationDocument = graphql(`
  mutation taskUpdate($id: ID!, $data: TaskUpdateInput!) {
    taskUpdate(id: $id, data: $data) {
      id
    }
  }
`)

interface TaskRowProps {
  task: FragmentType<typeof TaskRowFragment>
}

export const TaskRow = ({ task: taskFragment }: TaskRowProps) => {
  const task = useFragment(TaskRowFragment, taskFragment)
  const [{ fetching: fetchingTitle }, updateTaskTitle] = useMutation(TaskUpdateMutationDocument)
  const [{ fetching: fetchingIsLocked }, updateIsLocked] = useMutation(TaskUpdateMutationDocument)
  const {
    setError,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields, isSubmitSuccessful },
  } = useForm<Pick<TaskUpdateInput, 'title'>>({
    mode: 'onChange',
    defaultValues: {
      title: task.title,
    },
    resolver: zodResolver(taskInputValidations.pick({ title: true })),
  })

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const handleTitleSubmit = async (taskData: Pick<TaskUpdateInput, 'title'>) => {
    const result = await updateTaskTitle({
      id: task.id,
      data: {
        title: taskData.title,
      },
    })

    if (result.error) setError('title', { message: 'Network error' })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({}, { keepValues: true })
    }
  }, [isSubmitSuccessful, reset])

  const handleLockChange = async (isLocked: boolean) => {
    await updateIsLocked({ id: task.id, data: { isLocked } })
  }

  return (
    <TableRow>
      <TableCell className="flex items-center">
        <InputField
          variant="primary"
          {...register('title', { required: true })}
          onBlur={handleSubmit(handleTitleSubmit)}
          loading={fetchingTitle}
          errorMessage={errors.title?.message}
          disabled={!task.canModify}
          isDirty={isDirty && dirtyFields.title}
        />
      </TableCell>
      {task.canModify && (
        <>
          <TableCell>
            <LockSwitch locked={task.isLockedByAdmin} onChange={handleLockChange} loading={fetchingIsLocked} />
          </TableCell>
          <TableCell>
            <Button
              ariaLabel="Delete Task"
              variant="danger"
              tooltip="Delete Task"
              onClick={() => setOpenDeleteModal(true)}
            >
              <BiTrash />
            </Button>
            {openDeleteModal && <DeleteTaskModal open onClose={() => setOpenDeleteModal(false)} task={task} />}
          </TableCell>
        </>
      )}
    </TableRow>
  )
}
