"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var defaultFormFunctions = { setOnSave: function () { } };
var FormContext = react_1.createContext(defaultFormFunctions);
FormContext.displayName = 'FormContext';
exports.default = FormContext;
