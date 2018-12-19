import React, { Component } from 'react';

class Country extends Component {
  state = {
    selected: false
  };

  render() {
    const classes = [];
    const { country, onSelectCountry } = this.props;

    if (country.selected) {
      classes.push('selected');
    }
    //console.log(country);

    return (
      <li
        className={classes.join(' ')}
        onClick={() => onSelectCountry(country)}
      >
        {country.name}
      </li>
    );
  }
}

export default Country;
