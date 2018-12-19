import React from 'react';
import City from './City';

class CitiesList extends React.Component {
  renderCities = () => {
    return this.props.cities.map((city, index) => {
      return (
        <City key={index} city={city} onSelectCity={this.props.onSelectCity} />
      );
    });
  };

  render() {
    //console.log(this.props.cities);
    return <ul className="box">{this.renderCities()}</ul>;
  }
}

export default CitiesList;
