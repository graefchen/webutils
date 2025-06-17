/* arvelie.js ****************************************
 * An smll library for the Arvelie alpabetic         *
 * date format.                                      *
 * (c)2025 graefchen (https://github.com/graefchen)  *
 * The date format was created by Devine Lu Linvega  *
 * Documentation for the date format can be found    *
 * under the following link:                         *
 * https://wiki.xxiivv.com/site/arvelie.html         *
 * Other ressources / librarys are commented         *
 * on the bottom of this file.                       *
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
 *                                                   *
 * This library also "allowes" dates that are iffy   *
 * and should NOT work like "14+01" that can not be  *
 * a leap year by itself but does have exist in the  *
 * context of having an offset of 6 years, making it *
 * technically "20+01" which is leap year.           *
 *****************************************************
 * v1.0 - First release ( / )                        *
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
 ****************************************************/

const arvelie = function (date, offset = 2000) {
  return new Arvelie(date, offset)
}

/* K&R Leap Year function */
const isLeapYear = (year) => {
  return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
}

/* TODO: Use the offset to get an correct offset */
const parseArvelie = (date, offset) => {
  if (date === undefined) return parseArvelie(new Date(), offset)
  if (date instanceof Date) {
    /* dc = day count (days after months) */
    const dcnl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const dcly = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    const dc   = (isLeapYear(date.getFullYear()) ? dcly : dcnl);
    const doty = dc[date.getMonth()] + date.getDay()
    return { year: date.getFullYear() + offset, doty: doty }
  }
  if (/^[0-9]{0,4}-?[0-9]{1,2}-?[0-9]{1,2}$/.test(date)) {
    /* TODO: Rework this a little bit to not just call parseArvelie again */
    return parseArvelie(new Date(date), offset);
  }
  if (/[0-9]{2}([A-Z]|\+){1}[0-9]{2}/.test(date)) {
    const m = date.match(/([0-9]{2})([A-Z]|\+){1}([0-9]{2})/)
    const doty = (m[2] === "+" ? 365 : (m[2].charCodeAt(0) - 65) * 14) + Number(m[3])
    return { year: Number(m[1]) + offset, doty: doty }
  }

  return { year: 0, doty: 0 }
}

class Arvelie {
  /* Arvelie num format of calender */
  #date = { year: 0, doty: 0 }

  constructor(date) {
    this.#parse(date)
  }

  #parse(date) {
    this.#date = parseArvelie(date)
  }

  clone() {
    return new Arvelie(this.toString())
  }

  /* only accepts values greater than 0 */
  setYear(year) {
    this.#date.year = (0 <= year) ? year : this.#date.year
    return this
  }

  /* only accepts values between 0 and 25 */
  setMonth(month) {
    const nm = (month >= 0 && month <= 25) ? month : this.getMonth()
    this.#date.doty = this.#date.doty - (this.getMonth() - nm)
    return this
  }

  /* only acccepts values between 0 and 13 */
  setDay(day) {
    const nd = (day >= 0 && day <= 13) ? day : this.#date.day
    this.#date.day = nd
    this.#date.doty = this.#date.doty - (this.#date.day - nd)
    return this
  }
  
  setDayOfYear(doty) {
    let ndoty = (doty >= 0 && doty <= 366) ? doty : this.#date.doty
    if (!this.isLeapYear() && doty == 366) ndoty -= 1
    this.#date.doty = this.#date.doty - (this.#date.doty - ndoty)
    return this
  }

  getYear() { return this.#date.year }

  getMonth() {
    const dcnl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
    const dcly = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
    const dc   = this.isLeapYear() ? dcly : dcnl;
    let n = 0;
    while (dc[n] < this.#date.doty) n++
    return (n - 1)
  }

  getDay() { return this.#date.day }

  getDayOfYear() { return this.#date.doty }

  isLeapYear() { return isLeapYear(this.#date.year) }

  toDate() { return new Date(String(this.toDateString())) }

  /* Similar to the equivalent method of the JavaScript Date Object.
   * Uses a modified form of the ISO 8601 standard.
   * Output: YYYY-MM-DD
   * TODO: Fix bug of DD being negative.
   */
  toDateString() {
    let   i = 0;
    const dcnl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const dcly = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    const dc   = this.isLeapYear() ? dcly : dcnl;
    while (this.#date.doty >= (dc[i])) i++
    const year  = String(this.#date.year).padStart(4, "0")
    const month = String(i).padStart(2, "0")
    const day   = String(this.#date.doty - dc[i - 1]).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  /* Format: YY(M|+)DD */
  toString() {
    /* year day + leap day */
    if (this.#date.doty == 365) return `${this.#date.year}+00`
    if (this.#date.doty == 366) return `${this.#date.year}+01`
    const year  = String(this.getYear()).padStart(2, "0")
    const month = String.fromCharCode(this.getMonth() + 65)
    const day   = String(this.getDay() + 1).padStart(2, "0")
    return `${year}${month}${day}`
  }
}

const proto = Arvelie.prototype
arvelie.prototype = proto

export default arvelie

/**
 * At the end if the file because I liked the 53 wide header to much.
 * Sorted after how usefull they are.
 * The other sources used for this library:
 * 1. https://github.com/XXIIVV/oscean/tree/edc4de3b16908f1c09089b9756630b067eceec09/src/projects/arvelie
 * 2. https://github.com/MiguelBel/arvelie-scheme/tree/bece2350dd280d5d39f34993421feb3ebca90f8d
 * 3. https://github.com/XXIIVV/oscean/blob/d04cb4d83048660cd4ef7d9a668d8f19e6416970/scripts/lib/arvelie.js
 */
