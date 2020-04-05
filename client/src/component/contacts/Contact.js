import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from './../../context/contact/ContactContext'
import ContactItem from './ContactItem';
import Spinner from './../spinner/Spinner';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
const Contacts = () => {

    const contactContext = useContext(ContactContext);
    const { contacts, filterd, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Add contact</h4>
    }
    return (
        <Fragment>
            {contacts !== null && !loading ? (<TransitionGroup>
                {filterd !== null ? filterd.map(contact => (
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>
                ))
                    :
                    contacts.map(contact => (<CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>))}
            </TransitionGroup>) : <Spinner />}

        </Fragment>
    )
}
export default Contacts;


/*

{contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact} />
            ))}

*/