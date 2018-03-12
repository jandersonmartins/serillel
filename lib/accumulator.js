'use strict'

/**
 * Accumulate tasks results.
 */
class Accumulator {
  constructor () {
    /**
     * @type {Array}
     * @private
     */
    this.success_ = []

    /**
     * @type {Array}
     * @private
     */
    this.errors_ = []
  }

  /**
   * Add item on success accumulator.
   * @param {*} value
   */
  fulfilled (value) {
    this.success_.push(value)
  }

  /**
   * Add error on errors accumulator.
   * @param {Error} reason
   */
  rejected (reason) {
    this.errors_.push(reason)
  }

  /**
   * Returns the accumulated fulfills and rejections.
   * @returns {Object}
   */
  accumulated () {
    return {
      success: this.success_,
      errors: this.errors_
    }
  }
}

module.exports = Accumulator
