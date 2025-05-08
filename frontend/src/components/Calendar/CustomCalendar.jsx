import React, { useState } from 'react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

// 전체 달력 컴포넌트를 감싸는 컨테이너
const CustomCalendar = styled.div`
    width: 100%;
    font-family: 'Pretendard', sans-serif;
    background-color: #fff;
    border-radius: 12px;
    padding: 1.4rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
`;

// 달력 상단 (월/년 텍스트 및 네비게이션 버튼 포함) 컨테이너
const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
`;

// 현재 월/년 텍스트 표시
const MonthYearText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

// 네비게이션 버튼 그룹 (이전/다음)
const NavButtonGroup = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;
    z-index: 1;
`;

// 네비게이션 버튼 스타일
const NavButton = styled.button`
    background: #fff;
    border: none;
    font-size: 1.2rem;
    color: #9370db;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    &:hover {
        color: #8a2be2;
    }
`;

// 요일 표시 영역 컨테이너
const Weekdays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: bold;
    color: #666;
    margin-bottom: 0.5rem;
`;

// 각 요일 텍스트 스타일
const Weekday = styled.div`
    padding: 0.5rem;
    color: ${props => props.isWeekend ? '#ff3b30' : '#666'};
    font-size: 1.1rem;
    font-weight: bold;
`;

// 달력 날짜 셀 그리드
const Days = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
`;

// 날짜 셀 버튼 스타일
const Day = styled.button`
    padding: 1.2rem 0.5rem;
    position: relative;
    border-radius: 12px;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
    color: ${props => props.isWeekend ? '#ff3b30' : '#333'};
    min-height: 65px;
    font-size: 1.1rem;
    margin: 1px;

    &:hover {
        background-color: #e6e6fa;
    }

    &.selected {
        background-color: #9370db !important;
        color: white;
    }

    &.today {
        background: #fff;
        font-weight: bold;
        text-decoration: underline;
    }
`;

// 날짜 셀 우측 상단의 할 일 개수 표시 뱃지
const TodoCount = styled.div`
    position: absolute;
    top: 4px;
    right: 4px;
    background-color: ${props => props.isSelected ? '#8a2be2' : '#e6e6fa'};
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
    margin: 2px;
`;

function CustomCalendarComponent({ selectedDate, onDateChange, todos }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

    // 현재 날짜를 "yyyy년 MM월" 형식으로 반환
    const formatMonthYear = (date) => {
        return format(date, 'yyyy년 MM월', { locale: ko });
    };

    // 해당 월의 날짜 배열 생성 (빈 셀 포함)
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = new Date(year, month, i);
            days.push(day);
        }

        const firstDayOfWeek = firstDay.getDay();
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.unshift(null);
        }

        const lastDayOfWeek = lastDay.getDay();
        for (let i = lastDayOfWeek; i < 6; i++) {
            days.push(null);
        }

        return days;
    };

    // 특정 날짜에 해당하는 미완료 할 일 개수 계산
    const getTodoCount = (date) => {
        return todos.filter(todo => {
            if (!todo.dueDate || todo.completed) return false;
            const todoDate = new Date(todo.dueDate);
            return todoDate.toDateString() === date.toDateString();
        }).length;
    };

    // 이전 달로 이동
    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    // 다음 달로 이동
    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const days = getDaysInMonth(currentDate);
    const today = new Date();

    return (
        <CustomCalendar>
            <HeaderWrapper>
                <MonthYearText>{formatMonthYear(currentDate)}</MonthYearText>
                <NavButtonGroup>
                    <NavButton onClick={handlePrevMonth}>&lt;</NavButton>
                    <NavButton onClick={handleNextMonth}>&gt;</NavButton>
                </NavButtonGroup>
            </HeaderWrapper>

            <Weekdays>
                {weekdays.map((day, index) => (
                    <Weekday key={day} isWeekend={index === 0 || index === 6}>
                        {day}
                    </Weekday>
                ))}
            </Weekdays>

            <Days>
                {days.map((date, index) => {
                    if (date === null) {
                        return <Day key={index} style={{ visibility: 'hidden' }} />;
                    }

                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    const isToday = date.toDateString() === today.toDateString();
                    const todoCount = getTodoCount(date);

                    return (
                        <Day
                            key={index}
                            onClick={() => onDateChange(date)}
                            className={`${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                            isWeekend={isWeekend}
                        >
                            {date.getDate()}
                            {todoCount > 0 && (
                                <TodoCount isSelected={isSelected}>{todoCount}</TodoCount>
                            )}
                        </Day>
                    );
                })}
            </Days>
        </CustomCalendar>
    );
}

export default CustomCalendarComponent;
