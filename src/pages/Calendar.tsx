import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNexonNotice } from '../hooks/Calendar/useNexonNotice'
// import { useMemo, useState } from 'react'

const Calendar = () => {
  const { events } = useNexonNotice()

  // const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // const selectEvent = useMemo(() => {
  //   if (!selectedDate) return []
  //   return events.filter(e => e.start === selectedDate) ?? []
  // }, [selectedDate, events])

  // console.log(selectEvent)

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today'
        }}
        events={events}
        dayMaxEventRows={3}
        eventClick={info => {
          info.jsEvent.preventDefault()
          if (info.event.url) {
            window.open(info.event.url, '_blank')
          }
        }}
      />
    </div>
  )
}

export default Calendar
