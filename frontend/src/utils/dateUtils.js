import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 'yyyy년 MM월 dd일' 형식으로 포맷
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
    return format(date, 'yyyy년 MM월 dd일', { locale: ko });
};

/**
 * 두 날짜가 같은 날인지 비교 (시간 무시)
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean}
 */
export const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
};

/**
 * 한국 시간 기준 자정으로 설정 (오전 9시)
 * @param {Date} date
 * @returns {Date}
 */
export const setKoreanMidnight = (date) => {
    const koreanDate = new Date(date);
    koreanDate.setHours(9, 0, 0, 0);
    return koreanDate;
};
