import { createContext } from 'react';
var defaultFormFunctions = { setOnSave: function () { } };
var FormContext = createContext(defaultFormFunctions);
FormContext.displayName = 'FormContext';
export default FormContext;
