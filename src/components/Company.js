import React, { Component } from 'react';

class Company extends Component {
  render() {
    const classes = [];
    const { company, onSelectCompany } = this.props;

    if (company.selected) {
      classes.push('selected');
    }

    return (
      <li
        className={classes.join(' ')}
        onClick={() => onSelectCompany(company)}
      >
        {company.name}
      </li>
    );
  }
}

export default Company;
