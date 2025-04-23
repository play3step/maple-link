import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => {
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
        events={[
          { title: '길드 모임', date: '2025-05-01' },
          { title: '보스 트라이', date: '2025-05-03' }
        ]}
      />
    </div>
  )
}

export default Calendar
