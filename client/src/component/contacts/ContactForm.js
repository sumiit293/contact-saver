import React, { useState, useContext, useEffect } from 'react';
import contactContext from './../../context/contact/ContactContext';
import AlertContext from './../../context/alert/alertContext';
const ContactForm = () => {

    const ContactContext = useContext(contactContext);

    const { addContact, updateContact, current, clearCurrent, error, clearError } = ContactContext;

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
        if (error === "Phone number all ready saved") {
            setAlert("Phone number all ready saved", "danger");
            clearError();
        }
    }, [ContactContext, current, error])

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });




    const onChange = (event) => {

        setContact({ ...contact, [event.target.name]: event.target.value })
    }



    const onSubmit = (event) => {

        event.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
            clearCurrent();
        }

        setContact({
            name: "",
            email: "",
            phone: "",
            type: "personal"
        })

    }
    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder='Name' name='name' value={contact.name} onChange={onChange} className="ip" required />
            <input type="email" placeholder='Email' name='email' value={contact.email} onChange={onChange} className="ip" required />
            <input type="text" placeholder='Phone' name='phone' value={contact.phone} onChange={onChange} className="ip" />
            <h5>Contact Type</h5>
            <input type="radio" name='type' value="personal" checked={contact.type === 'personal'} onChange={onChange} />
            Personal{' '}
            <input type="radio" name='type' value="professional" checked={contact.type === 'professional'} onChange={onChange} />
            Professional{' '}
            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
            </div>
            {current && (
                <div>
                    <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                </div>
            )}
        </form>
    )
}

export default ContactForm;