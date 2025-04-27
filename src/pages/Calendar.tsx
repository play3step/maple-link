import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin from '@fullcalendar/interaction'
import { useNexonNotice } from '../hooks/Calendar/useNexonNotice'
import { useMemo, useState } from 'react'
import { useModalStore } from '../store/modalStore'
import { EventListModal } from '../components/modal/EventListModal'
import { useUserNotice } from '../hooks/Calendar/useUserNotice'

const Calendar = () => {
  const { data, createUserNotice } = useUserNotice()

  const { events } = useNexonNotice()

  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const totalEvent = useMemo(() => {
    return [...data, ...events]
  }, [data, events])

  const selectEvent = useMemo(() => {
    if (!selectedDate) return []
    return totalEvent.filter(e => e.start === selectedDate) ?? []
  }, [selectedDate, totalEvent])

  const { activeModal, openModal } = useModalStore()

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={koLocale}
        key={totalEvent.length}
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
        // dayMaxEventRows={4}
        events={totalEvent}
        eventClick={async info => {
          await setSelectedDate(info.event.startStr)
          openModal('eventList')
        }}
        dateClick={async info => {
          await setSelectedDate(info.dateStr)
          openModal('eventList')
        }}
      />
      {activeModal === 'eventList' && selectEvent && selectedDate && (
        <EventListModal
          list={selectEvent}
          selectedDate={selectedDate}
          createUserNotice={createUserNotice}
        />
      )}
    </div>
  )
}

export default Calendar
