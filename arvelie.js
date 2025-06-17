/* arvelie.js ****************************************
 * An small library for the Arvelie alpabetic        *
 * date format.                                      *
 * (c)2025 graefchen (https://github.com/graefchen)  *
 * The date format was created by Devine Lu Linvega  *
 * Documentation for the date format can be found    *
 * under the following link:                         *
 * https://wiki.xxiivv.com/site/arvelie.html         *
 *                                                   *
 * Other ressources / librarys can be found          *
 * on the bottom of this file.                       *
 *****************************************************
 * A library that translates dates into and from the *
 * "Arvelie" calender format.                        *
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
const parseArvelie = (date, offset) => {}

class Arvelie {
  /* Arvelie num format of calender */
  constructor(date, offset) {}
  clone() {}
  /* only accepts values greater than 0 */
  setYear(year) {}
  /* only accepts values between 0 and 25 */
  setMonth(month) {}
  /* only acccepts values between 0 and 13 */
  setDay(day) {}
  setDayOfYear(doty) {}
  getYear() {}
  getMonth() {}
  getDay() {}
  getDayOfYear() {}
  toDate() {}
  /* Similar to the equivalent method of the JavaScript Date Object.
   * Uses a modified form of the ISO 8601 standard.
   * Output: YYYY-MM-DD
   */
  toDateString() {}
  /* Format: YY(M|+)DD */
  toString() {}
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
