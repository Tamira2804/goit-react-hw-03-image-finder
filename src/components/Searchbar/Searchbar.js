import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Formik } from 'formik';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormInput,
  SearchFormBtn,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <SearchbarWrapper>
        <Formik>
          <SearchForm onSubmit={this.handleSubmit}>
            <SearchFormBtn type="submit">
              <FaSearch />
            </SearchFormBtn>

            <SearchFormInput
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </SearchForm>
        </Formik>
      </SearchbarWrapper>
    );
  }
}

export default Searchbar;
