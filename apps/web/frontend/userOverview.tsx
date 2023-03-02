import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { Button, InputField } from '@progwise/timebook-ui'

import {
  Role,
  useMeQuery,
  useUserCapacityUpdateMutation,
  useUserRoleUpdateMutation,
  UserFragment,
} from './generated/graphql'

interface UserDetailsForm {
  availableMinutesPerWeek: string
}
interface UserOverviewProps {
  user: UserFragment
}

export const UserOverview = ({ user }: UserOverviewProps): JSX.Element => {
  const router = useRouter()
  const teamSlug = router.query.teamSlug?.toString() ?? ''
  const [{ data: meData }] = useMeQuery({ variables: { teamSlug } })
  const isAdmin = meData?.user.role === Role.Admin

  const [{ error, fetching }, userRoleUpdate] = useUserRoleUpdateMutation()
  const [, updateUserCapacity] = useUserCapacityUpdateMutation()

  const submitHandler = async (data: UserDetailsForm) => {
    const response = await updateUserCapacity({
      // eslint-disable-next-line unicorn/no-null
      availableMinutesPerWeek: data.availableMinutesPerWeek.length > 0 ? +data.availableMinutesPerWeek : null,
      userId: user.id,
      teamSlug,
    })

    if (response.error) setError('availableMinutesPerWeek', { message: response.error.message })
  }

  const handleUpgradeClick = () => {
    userRoleUpdate({ role: Role.Admin, userId: user.id, teamSlug })
  }

  const handleDowngradeClick = () => {
    userRoleUpdate({ role: Role.Member, userId: user.id, teamSlug })
  }

  const {
    register,
    formState: { errors: fieldsErrors },
    setError,
    handleSubmit,
  } = useForm<UserDetailsForm>({
    mode: 'onChange',
    defaultValues: { availableMinutesPerWeek: user.availableMinutesPerWeek?.toString() },
  })

  return (
    <>
      <article>
        <div className="flex justify-start pt-10">
          <span className="pr-8 ">
            {user.image ? <Image width={40} height={40} src={user.image} alt={user.id} /> : undefined}
          </span>
          <div className="w-full">
            <h1 className="text-4xl dark:text-blue-400">{user.name}</h1>

            <div className="my-1  border border-gray-400 dark:border-blue-400 " />

            <div className="flex justify-between">
              <h1 className="text-xl font-semibold text-gray-400">Team member</h1>

              <div className="flex">
                {isAdmin && meData?.user.id !== user.id && (
                  <>
                    {user.role === Role.Member ? (
                      <Button className="mr-4" variant="secondary" onClick={handleUpgradeClick}>
                        Promote to admin
                      </Button>
                    ) : (
                      <Button className="mr-4" variant="secondary" onClick={handleDowngradeClick}>
                        Demote to member
                      </Button>
                    )}
                  </>
                )}

                <Button variant="danger">Remove from team</Button>
              </div>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="flex justify-between">
            <div className="mt-1 w-[250px]">
              <h1 className="text-start text-xl font-semibold text-gray-400">Capacity minutes/week</h1>
              <InputField
                variant="primary"
                className="w-full dark:border-white dark:bg-slate-800 dark:text-white"
                placeholder="Minutes"
                // 10080 max minutes in a week
                {...register('availableMinutesPerWeek', { max: 10_080 })}
                onKeyPress={(event) => {
                  if (!/^\d+$/.test(event.key)) {
                    event.preventDefault()
                  }
                }}
                onBlur={handleSubmit(submitHandler)}
              />
              {fieldsErrors.availableMinutesPerWeek && (
                <div aria-label="error field" className="text-red-600">
                  {fieldsErrors.availableMinutesPerWeek.message !== undefined &&
                  fieldsErrors.availableMinutesPerWeek.message.length > 0
                    ? fieldsErrors.availableMinutesPerWeek?.message
                    : 'Must be from 0 to 10080'}
                </div>
              )}
            </div>
          </div>
        )}
      </article>
      {fetching && <span>Loading...</span>}
      {error && <div className="text-center text-red-600">{error.message}!</div>}
    </>
  )
}
