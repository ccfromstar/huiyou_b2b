/**
 * Created by teng on 21.07.2014.
 */

function htmlEscape(str){
    if (str) return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function htmlUnescape(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

/**
 *
 * @returns {string of formatted date yyyy-MM-dd hh:mm}
 */
function getCurrentDateString() {
    var date = new Date();
    var month = date.getMonth()+1;
    month = month < 10 ? ('0'+month) : month;
    var day = date.getDate();
    day = day < 10 ? ('0'+day) : day;
    var hours = date.getHours();
    hours = hours < 10 ? ('0'+hours) : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? ('0'+minutes) : minutes;
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}

/**
 *
 * @param dateString format: yyyy-MM-dd hh:mm:ss
 * @returns {string|*}
 */
function getYear(dateString) {
    return dateString.substring(0, 4);
}

function getMonth(dateString){
    return dateString.substring(5, 7);
}

function getDay(dateString) {
    return dateString.substring(8, 10);
}

function getTime(dateString) {
    return dateString.substring(11, 16);
}

/**
 *
 * @param timestamp
 * @param format 比如"yyyy-MM-dd hh:mm:ss"
 * @returns {*}
 */
function formatTimestamp(timestamp, format) {
    return (new Date(timestamp)).Format(format);
}

function isEmpty(object) {
    var obj;
    for (obj in object) {
        return false;
    }
    return true;
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

function isPrice(value)   
{   
    var decimal=  /^[]?[0-9]+\.[0-9]+$/;  
    var int =  /^[]?[0-9]+$/;  
    return (value.match(decimal) || value.match(int));    
} 
