import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'

export interface IDatePickerProps {}

export function DatePicker(props: IDatePickerProps) {
   const [startDate, setStartDate] = useState<Date | null>(new Date())

   return (
      <>
         <div className="mb-4" style={{ maxWidth: '15rem' }}>
            <ReactDatePicker
               selected={startDate}
               onChange={date => setStartDate(date)}
               showPopperArrow={false}
               className="form-control"
               isClearable
               placeholderText="Select a date"
               closeOnScroll
            />
         </div>
      </>
   )
}
