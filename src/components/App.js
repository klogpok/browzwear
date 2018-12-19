import React, { Component } from 'react';
import './App.css';
import CountriesList from './CountriesList';
import CitiesList from './CitiesList';
import CompaniesList from './CompaniesList';
import MapContainer from './MapContainer';
import Geocode from 'react-geocode';

class App extends Component {
  state = {
    customers: [],
    countries: [],
    cities: [],
    selectedCountry: '',
    selectedCity: '',
    selectedCompany: '',
    isInitial: true,
    center: {}
  };

  componentDidMount() {
    fetch('http://northwind.servicestack.net/customers.json')
      .then(res => res.json())
      .then(data =>
        this.setState({ customers: data.Customers }, () =>
          this.setState(
            { countries: this.sortCountries(this.state.customers) },
            () => this.onSelectCountry(this.state.countries[0])
          )
        )
      );
  }

  // Sorting array of countries by numbers cities

  sortCountries = customers => {
    const countries = customers.reduce((acc, curr) => {
      if (curr.Country in acc) {
        if (!acc[curr.Country].includes(curr.City)) {
          acc[curr.Country].push(curr.City);
        }
      } else {
        acc[curr.Country] = [curr.City];
      }
      return acc;
    }, {});

    const sortedCountries = Object.keys(countries).sort(
      (a, b) => countries[b].length - countries[a].length
    );

    return sortedCountries.map((country, index) => {
      return { name: country, selected: false };
    });
  };

  // Sorting and creating array of cities by numbers of companies

  sortCities = country => {
    const cities = this.state.customers.reduce((acc, curr) => {
      if (country === curr.Country) {
        if (curr.City in acc) {
          if (!acc[curr.City].includes(curr.CompanyName)) {
            acc[curr.City].push(curr.CompanyName);
          }
        } else {
          acc[curr.City] = [curr.CompanyName];
        }
      }
      return acc;
    }, {});

    const sortedCities = Object.keys(cities).sort(
      (a, b) => cities[b].length - cities[a].length
    );

    return sortedCities.map(city => {
      return { name: city, selected: false };
    });
  };

  // Sorting companies by alphabet

  sortCompanies = city => {
    const companies = this.state.customers.reduce((acc, curr) => {
      if (city.name === curr.City) {
        if (acc.indexOf(curr.CompanyName) === -1) acc.push(curr.CompanyName);
      }
      return acc;
    }, []);

    const sortedCompanies = companies.sort();

    return sortedCompanies.map(company => {
      return { name: company, selected: false };
    });
  };

  onSelectCountry = async country => {
    const updatedCountries = this.state.countries.map(item =>
      item.name === country.name
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );

    let selectedCity = this.state.selectedCity;
    let cities = this.sortCities(country.name);

    if (!this.state.selectedCity && this.state.isInitial) {
      selectedCity = cities[0];
    } else if (this.state.selectedCity && !this.state.isInitial) {
      selectedCity = '';
    }

    this.setState(
      {
        countries: updatedCountries,
        selectedCountry: country,
        cities,
        selectedCity
      },
      () => this.onSelectCity(selectedCity)
    );
  };

  onSelectCity = city => {
    const updatedCities = this.state.cities.map(item =>
      item.name === city.name
        ? { ...item, selected: true }
        : { ...item, selected: false }
    );

    let selectedCompany = this.state.selectedCompany;
    let companies = this.sortCompanies(city);

    if (!this.state.selectedCompany && this.state.isInitial) {
      selectedCompany = companies[0];

      this.setState(
        {
          cities: updatedCities,
          selectedCity: city,
          companies,
          selectedCompany,
          isInitial: false
        },
        () => this.onSelectCompany(selectedCompany)
      );
    }

    this.setState({
      cities: updatedCities,
      selectedCity: city,
      companies
    });
  };

  onSelectCompany = async company => {
    const selectedCompany = this.state.customers.find(
      item => item.CompanyName === company.name
    );

    const address = `${selectedCompany.Country} ${selectedCompany.City} ${
      selectedCompany.Address
    }`;

    const center = await this.getLocation(address);

    const updatedCompanies = this.state.companies.map(item => {
      return item.name === company.name
        ? { ...item, selected: true }
        : { ...item, selected: false };
    });

    this.setState({
      companies: updatedCompanies,
      selectedCompany: { ...company, selected: true },
      center
    });
  };

  getLocation = address => {
    Geocode.setApiKey('AIzaSyA0ZHLcOBxzpUPL4MIWdiULswTOwNx774g');

    return Geocode.fromAddress(address).then(
      response => response.results[0].geometry.location
    );
  };

  render() {
    return (
      <div className="container">
        <div className="app">
          <header>
            <ul className="header">
              <li>Countries</li>
              <li>Cities</li>
              <li>Company</li>
              <li>Map</li>
            </ul>
          </header>
          <div className="wrapper">
            {this.state.countries && (
              <CountriesList
                countries={this.state.countries}
                onSelectCountry={this.onSelectCountry}
              />
            )}
            {this.state.selectedCountry && (
              <CitiesList
                onSelectCity={this.onSelectCity}
                cities={this.state.cities}
              />
            )}
            {this.state.companies && (
              <CompaniesList
                onSelectCompany={this.onSelectCompany}
                companies={this.state.companies}
              />
            )}
            {this.state.selectedCompany && (
              <MapContainer
                center={this.state.center}
                title={this.state.selectedCompany.name}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
