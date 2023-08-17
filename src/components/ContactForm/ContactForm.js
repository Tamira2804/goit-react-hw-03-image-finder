import React, { Component } from 'react';
import shortid from 'shortid';
import './ContactForm.scss';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.name.trim() !== '') {
      const newContact = {
        id: shortid.generate(),
        name: this.state.name,
        number: this.state.number,
      };

      this.props.onAddContact(newContact);

      this.setState({ name: '', number: '' });
    }
  };

  // reset = () => {
  //   this.setState({ name: '', number: '' });
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="Form__container">
        <label htmlFor="nameId" className="Form__label">
          Name
        </label>
        <input
          className="Form__input"
          type="text"
          name="name"
          id="nameId"
          pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          value={this.state.name}
          onChange={this.handleChange}
        />

        <label htmlFor="numberId" className="Form__label">
          Number
        </label>
        <input
          className="Form__input"
          type="tel"
          name="number"
          id="numberId"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.handleChange}
        />

        <button type="submit" className="AddContact__btn">
          Add Contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
