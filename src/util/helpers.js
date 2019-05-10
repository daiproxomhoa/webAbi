/**
 * Helpers Functions
 */
import moment from 'moment'

/**
 * Function to convert hex to rgba
 */
export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
export function setCookie(name,value,days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
export function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export function isEmail (email) {
  const mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return mailReg.test(email)
}
export function isPhoneNumber (phone) {
  const phoneReg = /^(\(?[+]?[0-9]{0,3}\)?)(\s?)([0-9]{2,5})(\s?)([0-9]{3,5})(\s?)([0-9]{3,5})$/
  return phoneReg.test(phone)
}

export function hexToRgbA (hex, alpha) {
  var c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      ',' +
      alpha +
      ')'
    )
  }
  throw new Error('Bad Hex')
}

/**
 * Text Truncate
 */
export function textTruncate (str, length, ending) {
  if (length == null) {
    length = 100
  }
  if (ending == null) {
    ending = '...'
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  } else {
    return str
  }
}

/**
 * Get Date
 */
export function getTheDate (date, format) {
  let formatDate = format || 'YYYY-MM-DD'
  return moment(date).format(formatDate)
}

/**
 * Convert Date To Timestamp
 */
export function convertDateToTimeStamp (date, format) {
  let formatDate = format || 'YYYY-MM-DD'
  return moment(date, formatDate).unix()
}

/**
 * Function to return current app layout
 */
export function getAppLayout (url) {
  let location = url.pathname
  let path = location.split('/')
  return path[1]
}
