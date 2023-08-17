import React from 'react';
import './Filter.scss';

const Filter = ({ value, onChange }) => (
  <div className="Filter__container">
    <label htmlFor="filterId" className="Filter__label">
      {' '}
      Find contacts by name{' '}
    </label>
    <input
      type="text"
      value={value}
      id="filterId"
      onChange={onChange}
      className="Filter__input"
    />
  </div>
);

export default Filter;
