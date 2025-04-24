import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin from '@fullcalendar/interaction'
import { useNexonNotice } from '../hooks/Calendar/useNexonNotice'
import { useMemo, useState } from 'react'
import { useModalStore } from '../store/modalStore'
import { EventListModal } from '../components/modal/EventListModal'

const Calendar = () => {
  const { events } = useNexonNotice()

  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const selectEvent = useMemo(() => {
    if (!selectedDate) return []
    return events.filter(e => e.start === selectedDate) ?? []
  }, [selectedDate, events])

  const { activeModal, openModal } = useModalStore()

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={koLocale}
        dayCellClassNames={() => [
          'hover:ring-2',
          'hover:ring-red-400',
          'rounded-md',
          'transition'
        ]}
        initialView="dayGridMonth"
        height="auto"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today'
        }}
        events={events}
        eventClick={async info => {
          await setSelectedDate(info.event.startStr)
          openModal('eventList')
        }}
        dateClick={async info => {
          await setSelectedDate(info.dateStr)
          openModal('eventList')
        }}
      />
      {activeModal === 'eventList' && selectEvent && (
        <EventListModal list={selectEvent} />
      )}
    </div>
  )
}

export default Calendar
