import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Client, Provider } from 'urql'

import '../../mocks/mockServer'
import { ProjectForm } from './projectForm'

jest.mock('next/router', () => ({
  useRouter: () => ({
    isReady: true,
    query: {
      teamSlug: 'progwise',
    },
  }),
}))
const client = new Client({ url: '/api/team1/graphql' })
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider value={client}>{children}</Provider>
)

describe('projectForm', () => {
  it('should submit a new project', async () => {
    const onSubmit = jest.fn()
    render(<ProjectForm onSubmit={onSubmit} onCancel={jest.fn()} hasError={false} />, {
      wrapper,
    })
    const nameInput = screen.getByRole('textbox', { name: /name/i })
    const startInput = screen.getByRole('textbox', { name: /start/i })
    const endInput = screen.getByRole('textbox', { name: /end/i })
    const submitButton = screen.getByRole('button', { name: /save/i })

    await userEvent.type(nameInput, 'new project')
    await userEvent.type(startInput, '2022-04-12')
    await userEvent.type(endInput, '2022-04-13')
    expect(endInput).toHaveValue('2022-04-13')

    await userEvent.click(submitButton)

    expect(onSubmit).toHaveBeenNthCalledWith(1, { title: 'new project', start: '2022-04-12', end: '2022-04-13' })
  })

  it('should be possible to delete start and end date', async () => {
    const onSubmit = jest.fn()
    render(
      <ProjectForm
        project={{
          title: 'old project',
          __typename: 'Project',
          canModify: true,
          id: '1',
          startDate: '2022-03-21',
          endDate: '2023-03-21',
        }}
        onSubmit={onSubmit}
        onCancel={jest.fn()}
        hasError={false}
      />,
      { wrapper },
    )

    const startInput = screen.getByRole('textbox', { name: /start/i })
    const endInput = screen.getByRole('textbox', { name: /end/i })
    const submitButton = screen.getByRole('button', { name: /save/i })

    await userEvent.clear(startInput)
    await userEvent.clear(endInput)
    await userEvent.click(submitButton)

    // eslint-disable-next-line unicorn/no-null
    expect(onSubmit).toHaveBeenNthCalledWith(1, { title: 'old project', start: null, end: null })
  })
  it('should not be possible to enter an end date earlier as the start', async () => {
    const onSubmit = jest.fn()
    render(
      <ProjectForm
        project={{
          title: 'test project',
          __typename: 'Project',
          canModify: true,
          id: '1',
          startDate: '2022-04-12',
          endDate: '',
        }}
        onSubmit={onSubmit}
        onCancel={jest.fn()}
        hasError={false}
      />,
      { wrapper },
    )

    const endInput = screen.getByRole('textbox', { name: /end/i })
    const submitButton = screen.getByRole('button', { name: /save/i })

    await userEvent.type(endInput, '2022-04-10')
    await userEvent.click(submitButton)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
