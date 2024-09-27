import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './eventModal';

const localizer = momentLocalizer(moment);

export default function CalendarDashModal() {
    const [events, setEvents] = useState([]);
    const [empBirthdays, setEmpBirthdays] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState({ start: null, end: null });
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);

        const empData = JSON.parse(localStorage.getItem('employeeData')) || [];

        const currentYear = new Date().getFullYear();
        const empBirthdays = empData.map((emp) => {
            const birthDate = new Date(emp.birthDate);
            const start = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
            return {
                title: `${emp.firstName} ${emp.lastName} - Birthday`,
                start,
                end: start,
                allDay: true, // To make it an all-day event
            };
        });
        setEmpBirthdays(empBirthdays);
    }, []);

    const handleSelectDate = ({ start, end }) => {
        setSelectedDateRange({ start, end });
        setModalMode('create');
        setModalOpen(true);
    };

    const handleEventChanges = (event) => {
        const index = events.findIndex(
            (evt) =>
                new Date(evt.start).toISOString() === new Date(event.start).toISOString() &&
                new Date(evt.end).toISOString() === new Date(event.end).toISOString()
        );
        setSelectedIndex(index);
        setSelectedEvent(event);
        setModalMode('edit');
        setModalOpen(true);
    };

    const handleSaveEvent = (title, description) => {
        if (modalMode === 'create') {
            const newEvent = { title, start: selectedDateRange.start, end: selectedDateRange.end, description };
            const updatedEvents = [...events, newEvent];
            setEvents(updatedEvents);
            localStorage.setItem('events', JSON.stringify(updatedEvents));
        } else if (modalMode === 'edit' && selectedEvent !== null) {
            const updatedEvents = [...events];
            updatedEvents[selectedIndex] = { ...updatedEvents[selectedIndex], title, description };
            setEvents(updatedEvents);
            localStorage.setItem('events', JSON.stringify(updatedEvents));
        }
    };

    const combinedEvents = [...events, ...empBirthdays];

    return (
        <div className="container mx-auto p-4">
            <div className="mb-10">
                <div className="w-full sm:w-3/4 md:w-4/5 lg:w-3/4 xl:max-w-screen-xl mx-auto">
                    <Calendar
                        localizer={localizer}
                        events={combinedEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '550px', minHeight: '400px' }}
                        selectable
                        onSelectSlot={handleSelectDate}
                        onSelectEvent={handleEventChanges}
                        className="w-full"
                    />
                </div>
            </div>
            <EventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveEvent}
                initialTitle={modalMode === 'edit' ? selectedEvent?.title : ''}
                initialDescription={modalMode === 'edit' ? selectedEvent?.description : ''}
            />
        </div>
    );
};

