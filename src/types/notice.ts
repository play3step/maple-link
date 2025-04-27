export interface NoticeEvent {
  event_notice: Notice[]
}

export interface Notice {
  date_event_start: string
  date_event_end: string
  title: string
  url: string
}

export interface CalendarType {
  title: string
  start: string
  color: string
  nexonUrl?: string
  type: string
}
