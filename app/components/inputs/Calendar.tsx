import React from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, Range, RangeKeyDict } from 'react-date-range'

interface CalendarProps{
  value: Range;
  onChange: (Value: RangeKeyDict) => void;
  disabledDates?: Date[]
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  return (
    <DateRange 
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChange}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default Calendar