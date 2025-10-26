/* arvelie.js ****************************************
 * An small library that translates dates into and   *
 * from the "Arvelie" date format.                   *
 * (c)2025 graefchen (https://github.com/graefchen)  *
 * The date format was created by Devine Lu Linvega. *
 * Documentation for the date format can be found    *
 * under the following link:                         *
 * https://wiki.xxiivv.com/site/arvelie.html         *
 *                                                   *
 * Other ressources / libraries can be found         *
 * on the bottom of this file.                       *
 *****************************************************
 * v1.0.0 - First release (2025-06-21/25M04)         *
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
 * To create a new date in Arvelie just use the      *
 * "arvelie" function without giving it any          *
 * arguments, like this:                             *
 * > const today = arvelie()                         *
 * The arvelie function also allowes to use other    *
 * representation like:                              *
 * The Arvelie Date Format in YYMDD where:           *
 *  - YY = between 00 and 99                         *
 *  - M  = between A and Z                           *
 *         and + for Year and Leap Day               *
 *  - D  = between 00 and 13                         *
 * The ISO 8601 Format in YYYYMMDD where:            *
 * - YYYY = between 0000 and 9999                    *
 * - MM   = between 01 and 12                        *
 * - DD   = between 01 and 31                        *
 * A Date Object                                     *
 *                                                   *
 * Alternatively to calling the "arvelie" function   *
 * it is possible to directly create a new Arvelie   *
 * Object with "new Arvelie()"                       *
 *                                                   *
 * To get the Year, Month, Day and Days of the Year  *
 * of the Arvelie format the functions:              *
 * - getYear()                                       *
 * - getMonth()                                      *
 * - getDay()                                        *
 * - getDaysOfYear()                                 *
 *                                                   *
 * To get a Date Object from a Arvelie use the       *
 * "toDate()" function, that return a Date Object    *
 * To get an representation of the ISO 8601          *
 * standard, use the "toDateString()" function.      *
 * To get the correct Arvelie Date format use the    *
 * "toString()" function.                            *
 *                                                   *
 * IMPORTANT: Currently arvelie.js does not validate *
 * given dates.                                      *
 ****************************************************/

const arvelie = function (date, offset = 2000) {
  return new Arvelie(date, offset)
}

/* K&R Leap Year function */
const isLeapYear = (year) => {
  return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
}

/* Takes in Date,ISO(YYYY-MM-DD),YY(M|+)DD, nothing */
const parseArvelie = (date, offset) => {
  if (date === undefined) return parseArvelie(new Date())
  if (date instanceof Date) {
    const dcnl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const dcly = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    const dc   = (isLeapYear(date.getFullYear()) ? dcly : dcnl)
    const doty = dc[date.getMonth()] + date.getDate() - 1
    return { year: date.getFullYear(), doty: doty, offset: 0 }
  }
  if (/^[0-9]{4}?-[0-9]{2}?-[0-9]{2}?$/.test(date)) {
    return parseArvelie(new Date(date), offset)
  }
  if (/^[0-9]{2}?([A-Z]|\+){1}?[0-9]{2}?$/.test(date)) {
    const m    = date.match(/([0-9]{2})([A-Z]|\+){1}?([0-9]{2}?)/)
    const doty = (m[2] === "+" ? 364 : (m[2].charCodeAt(0) - 65) * 14) + Number(m[3])
    return { year: Number(m[1]), doty: doty, offset: offset }
  }
  return { year: 0, doty: 0, offset: 0 }
}

class Arvelie {
  /* Arvelie num format of calender */
  year
  doty
  offset
  constructor(date, offset = 2000) {
    const data  = parseArvelie(date, offset)
    this.year   = data.year
    this.doty   = data.doty
    this.offset = data.offset
  }
  getYear() { return this.year }
  getMonth() {
    const mt = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","+"]
    return mt[Math.floor(this.doty / 14)]
  }
  getDay() { return this.doty % 14}
  getDayOfYear() { return this.doty }
  #isLeapYear() { return isLeapYear(this.year + this.offset) }
  /* Return a Date-Object */
  toDate() { return new Date(this.toDateString())}
  /* Similar to the equivalent method of the JavaScript Date Object.
   * Uses a modified form of the ISO 8601 standard.
   * Output: YYYY-MM-DD
   */
  toDateString() {
    let   i    = 0;
    const dcnl = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const dcly = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
    const dc   = this.#isLeapYear() ? dcly : dcnl;
    while (this.doty > (dc[i])) i++
    const year  = String(this.year + this.offset).padStart(4, "0")
    const month = String(i).padStart(2,"0")
    const day   = String(this.doty - dc[i - 1] + 1).padStart(2,"0")
    return `${year}-${month}-${day}`
  }
  /* Output(the complete Arvelie Date): YYMDD */
  toString() {
    const yy = String(this.year % 100).padStart(2, "0")
    const m  = this.getMonth()
    const dd = String(this.getDay()).padStart(2, "0")
    return `${yy}${m}${dd}`
  }
}

export default { arvelie, Arvelie }

/**
 * At the end if the file because I liked the 53 wide header to much.
 * Sorted after how usefull they are.
 * The other sources used for this library:
 * 1. https://github.com/XXIIVV/oscean/tree/edc4de3b16908f1c09089b9756630b067eceec09/src/projects/arvelie
 * 2. https://github.com/MiguelBel/arvelie-scheme/tree/bece2350dd280d5d39f34993421feb3ebca90f8d
 * 3. https://github.com/XXIIVV/oscean/blob/d04cb4d83048660cd4ef7d9a668d8f19e6416970/scripts/lib/arvelie.js
 */
