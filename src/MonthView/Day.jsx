import React from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'merge-class-names';

import {
  getBeginOfDay,
  getDay,
  getEndOfDay,
  getISOLocalDate,
  isWeekend,
} from '../shared/dates';
import { tileProps } from '../shared/propTypes';

const className = 'react-calendar__month-view__days__day';

const Day = ({
  classes,
  currentMonthIndex,
  date,
  maxDate,
  minDate,
  onClick,
  onMouseOver,
  style,
  tileClassName,
  tileContent,
  salesDots,
}) => (
  <button
    className={mergeClassNames(
      className,
      ...classes,
      isWeekend(date) && `${className}--weekend`,
      date.getMonth() !== currentMonthIndex && `${className}--neighboringMonth`,
      tileClassName instanceof Function ? tileClassName({ date, view: 'month' }) : tileClassName,
    )}
    disabled={
      (minDate && getBeginOfDay(minDate) > date) ||
      (maxDate && getEndOfDay(maxDate) < date)
    }
    key={date}
    onClick={onClick && (() => onClick(date))}
    onMouseOver={onMouseOver && (() => onMouseOver(date))}
    onFocus={onMouseOver && (() => onMouseOver(date))}
    style={style}
    type="button"
  >
    <time dateTime={`${getISOLocalDate(date)}T00:00:00.000`}>
      {getDay(date)}
      {getDot(salesDots)}
    </time>
    {typeof tileContent === 'function' ? tileContent({ date, view: 'month' }) : tileContent}
  </button>
);

function getDot(salesDots) {

  if(salesDots.showPreviewDot || salesDots.showAuctionDot) {
    return ( 
      <div>
        {showDot('viewing', salesDots.showPreviewDot)}
        {showDot('auction', salesDots.showAuctionDot)}
      </div>
    )
  }
}

function showDot(type, show) {
  if(show) {
    let className = `react-calendar__month-view__days__day--${type}`
    return (
      <span className={className}></span>
    )
  }
}

Day.propTypes = {
  currentMonthIndex: PropTypes.number.isRequired,
  ...tileProps,
};

export default Day;
