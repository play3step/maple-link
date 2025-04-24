import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNexonNotice } from '../hooks/Calendar/useNexonNotice'

const Calendar = () => {
  const { events } = useNexonNotice()

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
      />
    </div>
  )
}

export default Calendar
