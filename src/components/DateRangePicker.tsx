import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'

export interface IDateRangePickerProps {
   onChange: (date: [Date | null, Date | null]) => void
}

export function DateRangePicker(props: IDateRangePickerProps) {
   const [dateRange, setDateRange] = useState<any>([null, null])
   const [startDate, endDate] = dateRange

   const handleChange = (range: [Date | null, Date | null]) => {
      setDateRange(range)
      props.onChange(range)
   }

   return (
      <>
         <div className="mb-4" style={{ maxWidth: '15rem' }}>
            <ReactDatePicker
               selectsRange={true}
               startDate={startDate}
               endDate={endDate}
               onChange={handleChange}
               showPopperArrow={false}
               className="form-control"
               customInput={
                  <button className="btn btn-primary">
                     {startDate && endDate
                        ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                        : 'Select a date'}
                  </button>
               }
               withPortal
            />
         </div>
      </>
   )
}
