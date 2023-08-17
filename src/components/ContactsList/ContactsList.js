import React from 'react';
import './ContactsList.scss';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className="ContactList">
      {contacts.map(({ id, name, number }) => (
        <li key={id} className="ContactList__item">
          {name}: {number}
          <button
            type="button"
            className="ContactList__btn"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;
