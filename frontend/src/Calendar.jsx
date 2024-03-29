import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import './Calendar.css';

export default function AddWeekNumber() {
    return (
        <div className="Calendar">
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{
                    calendarWeekNumberHeaderText: '#',
                    calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
                }}
            >
                <DateCalendar displayWeekNumber />
            </LocalizationProvider>
        </div>
    );
}