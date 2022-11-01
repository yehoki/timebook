import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { FiCopy } from 'react-icons/fi'
import * as yup from 'yup'

import { Button, InputField } from '@progwise/timebook-ui'

import { TeamFragment, TeamInput, Theme, useTeamCreateMutation, useTeamUpdateMutation } from '../../generated/graphql'

interface TeamFormProps {
  team?: TeamFragment
}

const teamInputSchema: yup.SchemaOf<TeamInput> = yup.object({
  slug: yup
    .string()
    .trim()
    .required()
    .min(1)
    .max(50)
    .matches(/^[\w\-]+$/, 'You are only allowed to use digits, characters, -, _'),
  theme: yup.mixed<Theme>().oneOf(Object.values(Theme)),
  title: yup.string().trim().required().min(1).max(50),
})

const FormField: React.FC<{ className?: string; children: ReactNode }> = ({ children, className }) => (
  <label className={`flex flex-row flex-wrap gap-2 ${className}`}>{children}</label>
)

export const TeamForm = (props: TeamFormProps): JSX.Element => {
  const { team } = props
  const { register, handleSubmit, formState } = useForm<TeamInput>({
    defaultValues: {
      title: team?.title,
      slug: team?.slug,
      theme: team?.theme,
    },
    resolver: yupResolver(teamInputSchema),
  })
  const router = useRouter()
  const [updateTeamResult, updateTeam] = useTeamUpdateMutation()
  const [createTeamResult, createTeam] = useTeamCreateMutation()

  const handleTeamSave = async (data: TeamInput) => {
    const { error } = await (team ? updateTeam({ data, id: team.id }) : createTeam({ data }))

    if (!error) {
      router.push(`/${data.slug}/team`)
    }
  }

  const handleDismiss = () => {
    router.push(`/teams`)
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${process.env.NEXTAUTH_URL}/${team?.slug}/team/invite/${team?.inviteKey}`)
  }

  return (
    <form className="flex flex-col gap-2 pt-4" onSubmit={handleSubmit(handleTeamSave)}>
      <FormField>
        <InputField
          label="Team name"
          className="w-full dark:border-white dark:bg-slate-800 dark:text-white"
          variant="primary"
          placeholder="Please enter the team name"
          {...register('title')}
          errorMessage={formState.errors.title?.message}
        />
      </FormField>

      <FormField>
        <InputField
          label="Slug"
          variant="primary"
          className="w-full dark:border-white dark:bg-slate-800 dark:text-white"
          placeholder="This team is accessible on https://tb.com/[slug]"
          disabled={formState.isSubmitting}
          {...register('slug')}
          errorMessage={formState.errors.slug?.message}
        />
      </FormField>
      {team && (
        <>
          <FormField>
            <InputField
              label="Invitation link"
              className="flex-1"
              readOnly
              variant="primary"
              name="tbInvitationLink"
              value={`${process.env.NEXTAUTH_URL}/${team.slug}/team/invite/${team.inviteKey}`}
            />
            <FiCopy className="right-0 cursor-pointer text-2xl text-gray-500" onClick={handleCopyClick} />
          </FormField>
        </>
      )}

      <div className="start mt-4 flex flex-row justify-between gap-2 sm:justify-end">
        {/* Dismiss button available only during the creation of a new team */}
        {!team ? (
          <Button variant="secondary" onClick={handleDismiss}>
            Dismiss
          </Button>
        ) : undefined}
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>

      {(createTeamResult.error || updateTeamResult.error) && (
        <div role="alert" className="text-center text-red-600">
          {createTeamResult.error?.message ?? updateTeamResult.error?.message ?? 'Server error, try again later'}
        </div>
      )}
    </form>
  )
}
