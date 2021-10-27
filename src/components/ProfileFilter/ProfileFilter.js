import moment from 'moment';
import { DatePicker } from 'antd';
import { Select } from 'antd';
import { useState } from 'react'

import './profileFilter.less';
import profilePhoto from '../../assets/img/profilePhoto.png'

export const ProfileFilter = ({ setUserData, username }) => {
    const { Option } = Select;

    const [datePickerState, setDatePickerState] = useState('week')

    const onDateChange = (date, dateString) => {
        let dateFormat = 'YYYY.wo'
        if (datePickerState === 'month') {
            dateFormat = 'YYYY.MM'
        } else if (datePickerState === 'year') {
            dateFormat = 'YYYY'
        }
        const startDate = moment(dateString).startOf(datePickerState).format('YYYY-MM-DD');
        const endDate = moment(dateString).endOf(datePickerState).format('YYYY-MM-DD');
        const filterDate = {date: moment(dateString).format(dateFormat), format: dateFormat};
        setUserData(filterDate, { start_date: startDate, end_date: endDate })
    }

    const onSelectChange = (value) => {
        setDatePickerState(value);
    }

    return( <>
        <div className="profileBlock">
            <img src={profilePhoto} alt="profile"/>
            <h1 title={username}>Hi, {username}</h1>
        </div>

        <div className="calendar">
            <span className="calendar__title">Data Filter</span>

            <Select defaultValue="week" onChange={onSelectChange}>
                <Option value="week">week</Option>
                <Option value="month">month</Option>
                <Option value="year">year</Option>
            </Select>

            <DatePicker
            onChange={onDateChange} 
            value={false} 
            picker={datePickerState} 
            open={true}
            format={'YYYY-MM-DD'}
            getPopupContainer={trigger => trigger.parentElement}
            />
        </div>
    </>)
}