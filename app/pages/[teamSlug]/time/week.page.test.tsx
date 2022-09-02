import { render, screen } from '@testing-library/react'
import '../../../frontend/mocks/mockServer'
import { Client, Provider } from 'urql'
import WeekPage from './week.page'
import userEvent from '@testing-library/user-event'

jest.mock('next-auth/react', () => ({
  useSession: () => ({ status: 'authenticated' }),
}))

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { teamSlug: 'progwise' },
    }
  },
}))

const client = new Client({ url: '/api/team1/graphql' })
const wrapper: React.FC = ({ children }) => <Provider value={client}>{children}</Provider>
describe('The workhours week page', () => {
  it('should create a new table row when clicking on add Button', async () => {
    render(<WeekPage />, { wrapper })
    const addButton = screen.getByRole('button', {
      name: /add row/i,
    })
    await userEvent.click(addButton)

    const projectSelect = await screen.findByRole('combobox', {
      name: /project/i,
    })
    const taskSelect = screen.getByRole('combobox', {
      name: /task/i,
    })
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
    })

    await userEvent.selectOptions(projectSelect, 'Project 1')
    await userEvent.selectOptions(taskSelect, 'Task 2')
    await userEvent.click(submitButton)
    const task2Cell = await screen.findByRole('cell', {
      name: /task 2/i,
    })
    expect(task2Cell).toBeInTheDocument()
  })
})
