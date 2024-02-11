import { add, format, sub } from 'date-fns'

export const fromIOTTimeToDate = (val: string) => {
  // time format: ss-mm-hh-dd-MM-yy
  const [sec, min, hr, day, mon, yr] = val.split('-').map(v => +v)
  const time = new Date(yr + 2000, mon - 1, day, hr, min, sec)
  return sub(time, { hours: 6 })
}

export const fromDateToIOTTime = (time: Date) => {
  const localTime = add(time, { hours: 6 })
  return format(localTime, 'mm-HH-dd-MM-yy')
}
