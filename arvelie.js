/* arvelie.js ****************************************
 * An library for the Arvelie alpabetic              *
 * date format.                                      *
 * (c)2025 graefchen                                 *
 * The date format was created by Devine Lu Linvega  *
 * Documentation for the date format can be found    *
 * under the following link:                         *
 * https://wiki.xxiivv.com/site/arvelie.html         *
 *****************************************************
 * A library that translates dates into and from the *
 * "Arvelie" calender format.                        *
 * It shall be noted that this library does not use  *
 * the JavaScript Date Object or the Temporal API    *
 * and implements its own Data Structure to handle   *
 * dates, BUT this library has the ability to        *
 * transform the current Arvelie date to the equal   *
 * JavaScript Date Object.                           *
 * Furthermore it shall be noted that the Arvelie    *
 * date format is ONLY A DATE FORMAT and does not    *
 * handle hours, seconds and milliseconds.           *
 *****************************************************
 * v1.0 - First release (2025-06-16 / 2025K14)       *
 *        Mainly uses the Date JavaScript Object to  *
 *        achieve some underlying functionality      *
 *        like getting the current date.             *
 *****************************************************
 * Copyright (c) 2025 graefchen                      *
 * Permission is hereby granted, free of charge, to  *
 * any person obtaining a copy of this software and  *
 * associated documentation files (the "Software"),  *
 * to deal in the Software without restriction,      *
 * including without limitation the rights to use,   *
 * copy, modify, merge, publish, distribute,         *
 * sublicense, and/or sell copies of the Software,   *
 * and to permit persons to whom the Software is     *
 * furnished to do so, subject to the following      *
 * conditions:                                       *
 *                                                   *
 * The above copyright notice and this permission    *
 * notice shall be included in all copies or         *
 * substantial portions of the Software.             *
 *                                                   *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT         *
 * WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,         *
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES       *
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR      *
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL    *
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR    *
 * ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER    *
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,      *
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE    *
 * SOFTWARE OR THE USE OR OTHER DEALINGS             *
 * IN THE SOFTWARE.                                  *
 *****************************************************
 * Usage:                                            *
 *                                                   *
 * To create a Arvelie Date you need to call the     *
 * arvelie function.                                 *
 * This function takes in either                     *
 * - an Arvelie Date                                 *
 * - a Date Object                                   *
 * - a String with the format of "YYYY-MM-DD"        *
 * - no argument (it takes the current day)          *
 *                                                   *
 * You can then call multiple other functions:       *
 *                                                   *
 * addYears(years)                                   *
 *  - adding years to the current existing years     *
 *    NOTE: There is still a bug in it with adding   *
 *    years while the current year is a leap year.   *
 *                                                   *
 * setYear(year)                                     *
 *  - set the year to year                           *
 *                                                   *
 * setMonth(month)                                   *
 *  - set the month to month                         *
 *                                                   *
 * setDay(day)                                       *
 *  - set the day to day                             *
 *                                                   *
 * getDayOfYear()                                    *
 *  - get the day of the Arvelie year                *
 *                                                   *
 * isLeapYear()                                      *
 *  - checks if the current year is a leap year      *
 *                                                   *
 * toDate()                                          *
 *  - return a JavaScript Data Object                *
 *                                                   *
 * toDateString()                                    *
 *   - returns the String representation in a        *
 *     modified ISO 8601 format.                     *
 *                                                   *
 * toString()                                        *
 *   - return the String representation              *
 *                                                   *
 ****************************************************/

const arvelie = function (date) {
  return new Arvelie(date)
}

/* K&R Leap Year function */
const isLeapYear = (year) => {
  return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
}

const dayArray = (year) => {
  const dcnl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  const dcly = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
  return (isLeapYear(year) ? dcly : dcnl);
}

const parseArvelie = (date) => {
  if (date === undefined) return parseArvelie(new Date())
  if (date instanceof Date) {
    /* dc = day count (days after months) */
    const dc   = dayArray(date.getFullYear)
    const doty = dc[date.getMonth()] + date.getDay()
    const month = Math.floor(doty / 14)
    const day = (doty % 14) + 1
    return { year: date.getFullYear(), doty: doty, month: month, day: day }
  }
  if (/^[0-9]{0,4}-?[0-9]{1,2}-?[0-9]{1,2}$/.test(date)) {
    /* TODO: Rework this a little bit to not just call parseArvelie again */
    return parseArvelie(new Date(date));
  }
  if (/[0-9]{2}([A-Z]|\+){1}[0-9]{2}/.test(date)) {
    const m = date.match(/([0-9]{2})([A-Z]|\+){1}([0-9]{2})/)
    const doty = (m[2] === "+" ? 365 : (m[2].charCodeAt(0) - 65) * 14) + Number(m[3])
    return { year: Number(m[1]), doty: doty, month: Math.floor(doty / 14), day: Number(m[3])}
  }

  return { year: 0, doty: 0, month: 0, day: 0 }
}

class Arvelie {
  /* Arvelie num format of calender */
  #date = { year: 0, doty: 0, month: 0, day: 0 }
  constructor(date) {
    this.#parse(date)
  }
  #parse(date) {
    this.#date = parseArvelie(date)
  }
  addYears(years) {
    this.#date.year += (years > 0) ? years : 0
    return this
  }
  /* only accepts values between 0 and 9999 */
  setYear(year) {
    this.#date.year = (year >= 0 && year <= 9990) ? year : this.#date.year
    return this
  }
  /* only accepts values between 0 and 25 */
  setMonth(month) {
    const nm = (month >= 0 && month <= 25) ? month : this.#date.month
    const diff = this.#date.month - nm
    this.#date.month = nm
    this.#date.doty = this.#date.doty + diff
    return this
  }
  /* only acccepts values between 1 and 14 */
  setDay(day) {
    const nd = (day >= 0 && day <= 25) ? day : this.#date.day
    const diff = this.#date.day - nd
    this.#date.day = nd
    this.#date.doty = this.#date.doty + diff
    return this
  }
  /* private getters */
  #getYear() { return this.#date.year }
  #getMonth() { return String.fromCharCode(this.#date.month + 65) }
  #getDay() { return this.#date.day }
  getDayOfYear() { return this.#date.doty }
  isLeapYear() { return isLeapYear(this.#date.year) }
  toDate() { return new Date(String(this.toDateString())) }
  /* Similar to the equivalent method of the JavaScript Date Object.
   * Uses a modified form of the ISO 8601 standard.
   * Output: YYYY-MM-DD
   * TODO: Fix bug of DD being negative.
   */
  toDateString() {
    console.log(this.#date.doty)
    let   i = 0;
    const dc   = dayArray(this.#date.year)
    while (this.#date.doty > dc[i]) i++
    const year  = String(this.#date.year).padStart(4, "0")
    const month = String(i).padStart(2, "0")
    const day   = String(this.#date.day - dc[i - 1]).padStart(2, "0")
    console.log(this.#date)
    return `${year}-${month}-${day}`
  }
  toString() {
    if (this.#date.doty == 365) return `${this.#date.year}+00`
    if (this.#date.doty == 366) return `${this.#date.year}+01`
    const year = String(this.#getYear()).padStart(2, "0")
    const day  = String(this.#getDay()).padStart(2, "0")
    return `${year}${this.#getMonth()}${day}`
  }
}

export default arvelie
