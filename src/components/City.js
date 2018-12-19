import React, { Component } from 'react';

class City extends Component {
  render() {
    const classes = [];
    const { city, onSelectCity } = this.props;

    if (city.selected) {
      classes.push('selected');
    }
    // console.log(city);

    return (
      <li className={classes.join(' ')} onClick={() => onSelectCity(city)}>
        {city.name}
      </li>
    );
  }
}

export default City;
