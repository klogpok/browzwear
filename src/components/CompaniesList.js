import React from 'react';
import Company from './Company';

class CompaniesList extends React.Component {
  renderCompanies = () => {
    return this.props.companies.map((company, index) => {
      return (
        <Company
          key={index}
          company={company}
          onSelectCompany={this.props.onSelectCompany}
        />
      );
    });
  };

  render() {
    return <ul className="box company">{this.renderCompanies()}</ul>;
  }
}

export default CompaniesList;
