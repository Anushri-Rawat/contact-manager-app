const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER": {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };
    }
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_ALL_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_ALL_CONTACTS":
      return { ...state, contacts: action.payload };
    case "UPDATE_CONTACTS_CATEGORY":
      return { ...state, contactsCategory: action.payload };
    case "DELETE_USER_BY_ADMIN":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case "DELETE_CONTACT_BY_ADMIN":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case "UPDATE_USERINFO_BY_ADMIN":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? { ...action.payload } : user
        ),
      };
    case "UPDATE_CONTACTINFO_BY_ADMIN":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? { ...action.payload } : contact
        ),
      };
    case "ADDED_A_NEW_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "OPEN_UPDATE_FORM":
      return { ...state, updateForm: true };
    default:
      throw new Error("No matched action");
  }
};
export default reducer;
