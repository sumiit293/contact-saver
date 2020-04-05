import React, { useContext, useRef, useEffect } from 'react';
import contactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
    const ContactContext = useContext(contactContext);
    const text = useRef('');

    const { filterContact, clearFilter, filtered } = ContactContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterContact(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type='text'
                placeholder='Filter Contacts...'
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;