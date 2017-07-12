export const users = (state, {type, modals, payload}) => {
  if(type === "PAINT_DATA") {
    modals.loader.closePopUp();
    return { ...state, data: payload.data };
  } else if(type === "LOADER") {
    modals.confirm.closePopUp();
    modals.loader.openPopUp();
    return { ...state };
  } else if(type === "CREATED_DATA") {
    modals.loader.closePopUp();
    let data = state.data.map(data => Object.assign({}, data));
    data.push(payload.data);
    return {...state, data };
  } else if(type === "ERROR_UI") {
    return { ...state };
  } else if(type === "UNEXPECTED_RESPONSE") {
    return { ...state };
  } else {
    return { ...state };
  }
}//end user

