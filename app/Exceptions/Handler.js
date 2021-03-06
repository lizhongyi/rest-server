'use strict'

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    console.log(
      request.method(),
      request.url(),
      request.all(),
      // error
    ); 
    switch (error.name) {
      case 'ModelNotFoundException':
        error.message = '数据不存在' 
        break
    }
    console.log(error);
    response.status(error.status).send({
      code: error.code,
      name: error.name,
      message: error.message,
      stack: error.stack.split("\n"),
    })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
