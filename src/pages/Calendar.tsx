import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import koLocale from '@fullcalendar/core/locales/ko'
import interactionPlugin from '@fullcalendar/interaction'
import { useNexonNotice } from '../hooks/calendar/useNexonNotice'
import { useMemo, useState } from 'react'
import { useModalStore } from '../store/modalStore'
import { EventListModal } from '../components/modal/calendar/EventListModal'
import { useUserNotice } from '../hooks/calendar/useUserNotice'
import { EventContentArg } from '@fullcalendar/core'
import { FiUsers } from 'react-icons/fi'

const Calendar = () => {
  const {
    data,
    createCalendar,
    deleteCalendarHandler,
    updateCalendarHandler,
    inviteGroupCalendar
  } = useUserNotice()
  const { events } = useNexonNotice()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const totalEvent = useMemo(() => {
    const userEvents = data.map(event => ({
      ...event,
      id: event.id?.toString(),
      color: '#E3F2FD'
    }))
    return [...userEvents, ...events]
  }, [data, events])

  const selectEvent = useMemo(() => {
    if (!selectedDate) return []
    return totalEvent.filter(e => e.start === selectedDate) ?? []
  }, [selectedDate, totalEvent])

  const { activeModal, openModal } = useModalStore()

  const renderEventContent = (eventInfo: EventContentArg) => {
    const isNexonEvent = eventInfo.event.extendedProps.type === 'nexon'
    const isStartEvent = eventInfo.event.title.includes('[시작]')
    const isGroupEvent = eventInfo.event.extendedProps.type === 'GROUP'

    return (
      <div
        className={`
        flex items-center gap-2 px-2 py-1 rounded-md w-full
        ${
          isNexonEvent
            ? isStartEvent
              ? 'bg-emerald-500 text-white'
              : 'bg-red-500 text-white'
            : 'bg-white border border-blue-300 text-slate-700'
        }
      `}>
        {isNexonEvent ? (
          <span
            className={`
            w-2 h-2 rounded-full
            ${isStartEvent ? 'bg-emerald-200' : 'bg-red-200'}
          `}
          />
        ) : isGroupEvent ? (
          <FiUsers className="w-3 h-3 text-blue-500" />
        ) : null}
        <p className="text-sm truncate">{eventInfo.event.title}</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        locale={koLocale}
        key={totalEvent.length}
        eventContent={renderEventContent}
        dayCellClassNames={() => [
          'hover:ring-2',
          'hover:ring-blue-400',
          'rounded-md',
          'transition'
        ]}
        eventClassNames={() => ['px-1', 'py-0.5']}
        initialView="dayGridMonth"
        height={650}
        dayMaxEvents={3}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today'
        }}
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
          createUserNotice={createCalendar}
          deleteCalendarHandler={deleteCalendarHandler}
          updateCalendarHandler={updateCalendarHandler}
          inviteGroupCalendar={inviteGroupCalendar}
        />
      )}
    </div>
  )
}

export default Calendar
