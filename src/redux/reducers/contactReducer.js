const initalState = [
    {
        id:0,
        name:'Azfar',
        number:12343222,
        email:"azf@gmail.com"
    },
    {
        id:1,
        name:'Akbar',
        number:343451213,
        email:"Akb@yahoo.com"
    }
];

const contactReducer = (state = initalState, action) => {
    switch (action.type) {
      case "ADD_CONTACT":
        state = [...state , action.payload];
        return state;
      case "UPDATE_CONTACT":
        const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
        state = updateState
        return state;
      case "DELETE_CONTACT":
        const filerContacts = state.filter(contact=> contact.id !== action.payload && contact) 
        state = filerContacts
        return state;
        default: 
            return state;   
    }
};

export default contactReducer