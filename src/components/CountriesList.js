import React from 'react';
import Country from './Country';

class CountriesList extends React.Component {
  renderCountries = () => {
    return this.props.countries.map((country, index) => {
      return (
        <Country
          key={index}
          onSelectCountry={this.props.onSelectCountry}
          country={country}
        />
      );
    });
  };

  render() {
    //console.log(this.props.countries);
    return <ul className="box">{this.renderCountries()}</ul>;
  }
}

export default CountriesList;
