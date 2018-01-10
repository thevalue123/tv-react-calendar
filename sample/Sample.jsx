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

    let saleDates = [1,2,3]

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
            />
          </main>
        </div>
      </div>
    );
  }
}

render(<Sample />, document.getElementById('react-container'));
