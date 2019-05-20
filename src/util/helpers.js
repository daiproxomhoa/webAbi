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
export function isTime (time) {
  const timeReg = /^\d{1,4}:\d{2}$/
  return timeReg.test(time)
}
export function isTimewindow_partner (time) {
  const timewindowReg = /^\d{1,2}(:\d{2})?\s*-\s*\d{1,2}:\d{2}$/
  return timewindowReg.test(time)
}
export function isTimewindow (time) {
  const timewindowReg = /^(\d{1,2}(:\d{2})?\s*-\s*\d{1,2}(:\d{2})?){1}(;\d{1,2}(:\d{2})?\s*-\s*\d{1,2}(:\d{2})?)*$/;
  return timewindowReg.test(time)
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

export function getCenter(a) {
  var arr =a.filter(v=>v!=null||v!=undefined)
  let l = []
  for (let i = 0; i < arr.length; i++) {
    var distance = 0;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i].latitude != 0 && arr[i] != 0)
        distance += getDistance(arr[i], arr[j])
      else
        distance += 40000
    }
    l.push(distance)

  }
  var min = Math.min(...l)
  for (let i = 0; i < l.length; i++) {
    if (l[i] == min) {

      return {lat: arr[i].latitude, lng: arr[i].longitude}
    }
  }
  return {lat: 0, lng: 0}

}

function rad(x) {
  return x * Math.PI / 180;
};

function getDistance(p1, p2) {
  var R = 6371; // Earth’s mean radius in meter
  var dLat = rad(p2.latitude - p1.latitude);
  var dLong = rad(p2.longitude - p1.longitude);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

export  function getUnique(arr, comp) {

  const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

  return unique;
}