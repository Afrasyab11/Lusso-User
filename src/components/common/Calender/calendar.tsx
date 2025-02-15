'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'
import { ICON_ENUM } from '../../../constants/icons.constant'
import { buttonVariants } from './button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps): JSX.Element {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={'p-3'}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: (
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2 rounded-lg overflow-hidden',
        cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
        day: (
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_selected:
          'bg-[#30238F] hover:bg-[#30238F] focus:bg-[#30238F] text-white rounded',
        day_today: 'border-b border-[#2F2386] text-accent-foreground',
        day_outside: 'text-muted-foreground opacity-40 invisible',
        day_disabled: 'text-muted-foreground opacity-40',
        day_range_middle:
          'aria-selected:bg-[#464070] aria-selected:text-white rounded-none',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: ({ ...props }) => <img src={ICON_ENUM?.LEFT?.icon} alt='left arrow' className="" />,
        IconRight: ({ ...props }) => <img src={ICON_ENUM?.RIGHT?.icon} alt='right arrow' className="" />
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }

