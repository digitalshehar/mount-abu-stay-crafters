
import React, { useState } from 'react';
import { DayPicker, SelectMultipleEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface RoomAvailabilityCalendarProps {
  availableDates: Date[];
  selectedDays: Date[];
  onDayClick: (day: Date[]) => void;
}

const RoomAvailabilityCalendar: React.FC<RoomAvailabilityCalendarProps> = ({
  availableDates,
  selectedDays,
  onDayClick,
}) => {
  const modifiers = {
    available: availableDates,
    selected: selectedDays,
  };

  const modifiersStyles = {
    available: {
      color: '#fff',
      backgroundColor: '#4CAF50',
    },
    selected: {
      color: '#fff',
      backgroundColor: '#2196F3',
    },
  };

  const renderDay = (day: Date, _: unknown, props: React.HTMLProps<HTMLDivElement>) => {
    const isSelected = props.className?.includes('selected');
    const isAvailable = availableDates.some(date =>
      date.getDate() === day.getDate() &&
      date.getMonth() === day.getMonth() &&
      date.getFullYear() === day.getFullYear()
    );
  
    let dayStyle = {};
  
    if (isSelected) {
      dayStyle = {
        color: '#fff',
        backgroundColor: '#2196F3',
        borderRadius: '50%',
      };
    } else if (isAvailable) {
      dayStyle = {
        color: '#fff',
        backgroundColor: '#4CAF50',
        borderRadius: '50%',
      };
    }
  
    return (
      <div style={dayStyle}>
        {day.getDate()}
      </div>
    );
  };

  // Fix the onSelect handler to properly handle Date[] from DayPicker
  const handleSelect: SelectMultipleEventHandler = (days) => {
    if (days) {
      onDayClick(days);
    }
  };

  return (
    <DayPicker
      mode="multiple"
      selected={selectedDays}
      onSelect={handleSelect}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      renderDay={renderDay}
    />
  );
};

export default RoomAvailabilityCalendar;
