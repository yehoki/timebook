import { hoursToMinutes } from 'date-fns'
import { KeyboardEventHandler, SyntheticEvent, useRef, useState } from 'react'

import { InputField } from '@progwise/timebook-ui'

import { convertDurationStringToMinutes } from './convertDurationStringToMinutes'

export interface IWorkDuration {
  hours: number
  minutes: number
}

export const getFormattedDuration = (duration: number): string => {
  if (duration === 0) {
    return ''
  }

  const hours = Math.floor(duration / 60)
  const minutes = (duration % 60).toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const HourInput = (props: {
  duration: number
  onChange?: (workHours: number) => void
  onBlur?: (workHours: number) => void
  disabled?: boolean
}): JSX.Element => {
  const [formattedDuration, setFormattedDuration] = useState<string>(getFormattedDuration(props.duration))
  const previousDuration = useRef(props.duration)

  const handleBlur = (event: SyntheticEvent<HTMLInputElement>) => {
    const newDuration = convertDurationStringToMinutes(event.currentTarget.value)
    if (newDuration === undefined) {
      setFormattedDuration(getFormattedDuration(previousDuration.current))
      return
    }

    if (newDuration > hoursToMinutes(24)) {
      setFormattedDuration(getFormattedDuration(previousDuration.current))
      return
    }

    if (previousDuration.current !== newDuration) {
      props.onChange?.(newDuration)
      props.onBlur?.(newDuration)
    }

    previousDuration.current = newDuration
    const newFormattedDuration = getFormattedDuration(newDuration)
    setFormattedDuration(newFormattedDuration)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter') {
      handleBlur(event)
    }
  }

  return (
    <InputField
      variant="primary"
      disabled={props.disabled}
      value={formattedDuration}
      onChange={(event) => setFormattedDuration(event.target.value)}
      onFocus={(event) => event.target.select()}
      size={4}
      onKeyDown={handleKeyDown}
      className="min-w-max items-center"
      inputClassName="text-center dark:bg-slate-600"
      onBlur={handleBlur}
      isDirty={formattedDuration !== getFormattedDuration(props.duration)}
    />
  )
}
