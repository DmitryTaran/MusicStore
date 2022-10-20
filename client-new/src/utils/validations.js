import {EMAIL_REGEX} from "./consts";

export const validateEmptiness = (value) => value.length === 0
export const validateMinLength = (value, minLength) => value.length < minLength
export const validateMaxLength = (value, maxLength) => value.length > maxLength
export const validateEmail = (email) => !String(email).toLowerCase().match(EMAIL_REGEX);
export const validatePositiveness = (value) => value < 0
export const validateIntegrity = (value) => !Number.isInteger(parseFloat(value))