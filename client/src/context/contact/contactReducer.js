import {
    ADD_CONTACT,
    GET_CONTACTS,
    DELETE_CONTACT,
    FILTER_CONTACT,
    CONTACT_ERROR,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT,
    UPDATE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_CONTACT

} from './../Types'

export default (state, action) => {
    console.log("Calling reducer...");
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => (contact._id !== action.payload)),
                loading: false
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
                loading: false
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
                loading: false
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) => (contact._id === action.payload._id ? action.payload : contact)),
                loading: false
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regx = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regx) || contact.email.match(regx) || contact.phone.match(regx);
                }),

            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,

            }
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,


            }
        case CLEAR_CONTACT:
            return {
                ...state,
                contact: null,
                contacts: null,
                filtered: null,
                error: null
                , current: null
            }

        default:
            return state;

    }

}