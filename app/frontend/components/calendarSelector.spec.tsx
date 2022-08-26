import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { CalendarSelector } from './calendarSelector'

const waitForPopupToBeClosedAndOpenItAgain = async () => {
  const calendarPopover = screen.getByTestId('calendar-popover')
  await waitForElementToBeRemoved(calendarPopover)
  await userEvent.click(screen.getByRole('button', { name: /select date/i }))
}

describe('the custom calendar should ...', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<CalendarSelector />)
  })

  it('... a heading showing the current date', () => {
    const todayAsString = new Date().toLocaleDateString()
    expect(screen.getByText(todayAsString)).toBeInTheDocument()
  })

  describe('...if click on the field', () => {
    beforeEach(async () => {
      await userEvent.click(screen.getByTitle('Calendar icon'))
    })

    it('...it renders the current month', () => {
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const expectedMonthHeader = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
        currentMonth
      ]

      const header = screen.getByRole('heading', { name: `${expectedMonthHeader} ${currentYear}` })
      expect(header).toBeInTheDocument()
    })

    it('... expand button shows text from Mon to Sun', () => {
      expect(screen.getByText('Mon')).toBeInTheDocument()
      expect(screen.getByText('Tue')).toBeInTheDocument()
      expect(screen.getByText('Wed')).toBeInTheDocument()
      expect(screen.getByText('Thu')).toBeInTheDocument()
      expect(screen.getByText('Fri')).toBeInTheDocument()
      expect(screen.getByText('Sat')).toBeInTheDocument()
      expect(screen.getByText('Sun')).toBeInTheDocument()
    })
    it('... today is selected', () => {
      const today = new Date().getDate()
      const selectedDayElement = screen.getByTitle(/^Selected Day/)
      expect(selectedDayElement).toHaveTextContent(today.toString())
    })

    describe('...and select the 15th of the current month', () => {
      beforeEach(async () => {
        await userEvent.click(screen.getByText(/^15$/))
        await waitForPopupToBeClosedAndOpenItAgain()
      })

      it('...the 15th is selected', () => {
        const selectedDayElement = screen.getByTitle(/^selected day/i)
        expect(selectedDayElement).toHaveTextContent(/15/)
        const valueElement = screen.getByTitle(/display value/i)
        expect(valueElement).toHaveTextContent(/15/)
      })

      it('...and select the 14th of the current month', async () => {
        await userEvent.click(screen.getByText(/^14$/))
        await waitForPopupToBeClosedAndOpenItAgain()
        const selectedDayElement = screen.getByTitle(/^selected day/i)
        expect(selectedDayElement).toHaveTextContent(/14/)
        const valueElement = screen.getByTitle(/display value/i)
        expect(valueElement).toHaveTextContent(/14/)
      })

      it('...and click the goto today button', async () => {
        await userEvent.click(screen.getByText(/^16$/))
        await waitForPopupToBeClosedAndOpenItAgain()
        let selectedDayElement = screen.getByTitle(/^selected day/i)
        expect(selectedDayElement).toHaveTextContent(/16/)
        await userEvent.click(screen.getByTitle(/Goto today/))
        const today = new Date()
        const todayOfMonth = today.getDate()
        selectedDayElement = screen.getByTitle(/^selected day/i)
        expect(selectedDayElement).toHaveTextContent(todayOfMonth.toString())
      })
    })
  })
})
