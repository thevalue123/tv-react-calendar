import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Days from './MonthView/Days';
import Weekdays from './MonthView/Weekdays';
import WeekNumbers from './MonthView/WeekNumbers';

import { getLocale } from './shared/locales';
import { isCalendarType, isMaxDate, isMinDate, isValue } from './shared/propTypes';

export default class MonthView extends PureComponent {
  get calendarType() {
    const { calendarType } = this.props;

    if (calendarType) {
      return calendarType;
    }

    switch (getLocale()) {
      case 'en-US':
        return 'US';
      default:
        return 'ISO 8601';
    }
  }

  renderWeekdays() {
    const { calendarType } = this;
    const { activeStartDate } = this.props;

    return (
      <Weekdays
        calendarType={calendarType}
        month={activeStartDate}
      />
    );
  }

  renderWeekNumbers() {
    const { showWeekNumbers } = this.props;

    if (!showWeekNumbers) {
      return null;
    }

    const { calendarType } = this;
    const { activeStartDate, onClickWeekNumber } = this.props;

    return (
      <WeekNumbers
        activeStartDate={activeStartDate}
        calendarType={calendarType}
        onClickWeekNumber={onClickWeekNumber}
      />
    );
  }

  renderDays() {
    const { calendarType, ...childProps } = this.props;

    return (
      <Days
        calendarType={this.calendarType}
        saleDates={this.props.saleDates}
        {...childProps}
      />
    );
  }

  render() {
    const { showWeekNumbers } = this.props;

    const className = 'react-calendar__month-view';

    return (
      <div
        className={[
          className,
          showWeekNumbers ? `${className}--weekNumbers` : '',
        ].join(' ')}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          {this.renderWeekNumbers()}
          <div style={{ flexGrow: 1 }}>
            {this.renderWeekdays()}
            {this.renderDays()}
          </div>
        </div>
        <div className="react-calendar__month-view__legend">
          <ul>
            <li><span className="react-calendar__month-view__legend-viewing-dot"></span> {this.props.legend.preview}</li>
            <li><span className="react-calendar__month-view__legend-auction-dot"></span> {this.props.legend.auction}</li>
            <li><span className="react-calendar__month-view__legend-event-dot"></span> {this.props.legend.event}</li>
          </ul>
        </div>
      </div>
    );
  }
}

MonthView.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date).isRequired,
  calendarType: isCalendarType,
  maxDate: isMaxDate,
  minDate: isMinDate,
  onChange: PropTypes.func,
  onClickWeekNumber: PropTypes.func,
  setActiveRange: PropTypes.func,
  showNeighboringMonth: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  value: isValue,
  valueType: PropTypes.string,
};
