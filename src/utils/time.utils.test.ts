import { getDateArray, Today } from './time.utils'

it('should return the name of the day', async () => {
	const today = Today(new Date(2022, 8, 21))
	expect(today).toEqual('Today is a Wednesday')
})

it('should return dates between two dates', async () => {
   const start = new Date('2022-09-21')
   const end = new Date('2022-09-23')
   const dates = getDateArray(start, end)
   expect(dates).toEqual([
      new Date('2022-09-21'),
      new Date('2022-09-22'),
      new Date('2022-09-23'),
   ])
})

