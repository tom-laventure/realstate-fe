import React, { useState } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import classes from './inputs.module.scss';

interface datePickerProps {
    handleChange: (date: Dayjs | null) => void,
    label: string,
    value: Dayjs | null

}

const DatePicker = ({ value, handleChange, label }: datePickerProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className={classes["date-picker"]}>
                <DesktopDatePicker
                    label={label}
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
            <div className={classes["date-picker--mobile"]}>
                <MobileDatePicker
                    label={label}
                    inputFormat="MM/DD/YYYY"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>
        </LocalizationProvider>
    )
}

export default DatePicker