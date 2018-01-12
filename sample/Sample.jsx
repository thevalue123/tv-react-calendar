import React, { Component } from 'react';
import { render } from 'react-dom';
import Calendar from 'react-calendar';

import './Sample.less';

export default class Sample extends Component {
  state = {
    value: new Date(),
  }

  onChange = value => this.setState({ value })

  render() {
    const { value } = this.state;

    let viewingDates = ["2019-01-03","2018-01-04","2018-01-05","2018-01-06","2018-01-07"]
    let auctionDates = ["2018-01-06","2018-01-07"]

    let saleDates = {
      viewingDates: viewingDates,
      auctionDates: auctionDates
    }

    let legend = {
      preview: 'Preview1',
      auction: 'Auction2'
    }

    return (
      <div className="Sample">
        <header>
          <h1>react-calendar sample page</h1>
        </header>
        <div className="Sample__container">
          <main className="Sample__container__content">
            <Calendar
              onChange={this.onChange}
              showWeekNumbers
              value={value}
              saleDates={saleDates}
              legend={legend}
            />
          </main>
        </div>
      </div>
    );
  }
}

render(<Sample />, document.getElementById('react-container'));
