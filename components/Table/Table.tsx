import * as React from 'react'

export interface ITableProps {
   columns: string[]
   rows?: any[]
   mappedRows?: any[]
   children?: React.ReactNode
}

export function Table({ columns, children }: ITableProps) {
   return (
      <>
         <table className="table">
            <thead>
               <tr>
                  {columns.map(column => (
                     <th key={column}>{column}</th>
                  ))}
               </tr>
            </thead>
            {children && <tbody>{children}</tbody>}
         </table>
      </>
   )
}
