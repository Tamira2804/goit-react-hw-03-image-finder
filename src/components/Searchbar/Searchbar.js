import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Formik } from 'formik';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormInput,
  SearchFormBtn,
} from './Searchbar.styled';

// https://pixabay.com/api/?q=cat&page=1&key=37970704-9a867c05051ad7b7bfc1fb55a&image_type=photo&orientation=horizontal&per_page=12

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
