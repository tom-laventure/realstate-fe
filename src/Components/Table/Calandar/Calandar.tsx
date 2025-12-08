import React from 'react'
import { Calendar, momentLocalizer, View as CalendarView } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import classes from './Calandar.module.scss'

const localizer = momentLocalizer(moment)

export interface CalendarEvent {
    id: string | number
    title: string
    start: Date | string
    end?: Date | string
    description?: string
    color?: string
}

interface CalendarProps {
    events: CalendarEvent[]
    onEventClick?: (event: CalendarEvent) => void
    onDateClick?: (date: Date) => void
    defaultView?: keyof typeof CalendarView
    views?: (keyof typeof CalendarView)[]
}

const MyCalendar = ({
    events,
    onEventClick,
    onDateClick,
    defaultView = 'week',
    views = ['week', 'day']
}: CalendarProps) => {
    const formattedEvents = events.map(e => ({
        id: e.id,
        title: e.title,
        start: new Date(e.start),
        end: e.end ? new Date(e.end) : new Date(e.start),
        resource: {
            description: e.description,
            color: e.color || '#3b82f6'
        }
    }))

    const handleSelectEvent = (event: any) => {
        const original = events.find(e => e.id === event.id)
        if (original && onEventClick) {
            onEventClick(original)
        }
    }

    const handleSelectSlot = (slotInfo: { start: Date; end: Date; action: string }) => {
        if (onDateClick && slotInfo.action === 'select') {
            onDateClick(slotInfo.start)
        }
    }
  
    const eventStyleGetter = (event: any) => {
        const backgroundColor = event.resource?.color || '#3b82f6'
        return {
            style: {
                backgroundColor,
                borderRadius: '4px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                display: 'block'
            }
        }
    }

    return (
        <div className={classes['calendar']}>
            <Calendar
                localizer={localizer}
                events={formattedEvents}
                startAccessor="start"
                endAccessor="end"
                // style={{ height: '100%', width: '100%' }}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                defaultView={defaultView}
                views={views}
                eventPropGetter={eventStyleGetter}
                popup
                tooltipAccessor={(event: any) => event.resource?.description || event.title}
            />
        </div>
    )
}

export default MyCalendar