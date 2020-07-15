import React, { useReducer } from 'react'
import ContactContext from './ContactContext'
import axios from 'axios'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    FILTER_CONTACT,
    SET_ALERT,
    REMOVE_ALERT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACT,
    CLEAR_ERRORS

} from './../Types'


const ContactState = props => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null

    }
    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('api/contacts');

            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (error) {

            dispatch({ type: CONTACT_ERROR, payload: error.data });

        }

    }

    //Add contact 
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/contacts', contact, config);

            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (error) {

            dispatch({ type: CONTACT_ERROR, payload: error.response.data });

        }

    }
    //Delete Contact
    const deleteContact = async (id) => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);

            dispatch({ type: DELETE_CONTACT, payload: id });

        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg });

        }


    }

    //Update Contact
    const updateContact = async contacts => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/contacts/${contacts._id}`, contacts, config);

            dispatch({ type: UPDATE_CONTACT, payload: res.data });

        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response });

        }
    }
    //clear Contact
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACT });
    }
    //Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    }


    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    }

    // Filter Contact
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACT, payload: text })
    }
    //Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    //clear error

    const clearError = () => {
        dispatch({ type: CLEAR_ERRORS });
    }
    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filterd: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                clearFilter,
                filterContact,
                getContacts,
                clearContacts,
                clearError
            }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;