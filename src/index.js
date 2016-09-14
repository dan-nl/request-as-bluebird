'use strict';

/**
 * module dependencies
 */
var Promise = require( 'bluebird' );
var request = require( 'request' );

/**
 * @param {Function} resolve
 * @param {Function} reject
 * @param {Object} user_options
 */
function callRequest( resolve, reject, user_options ) {
  request(
    user_options,

    /**
     * @param {null|Error} err
     * @param {IncomingMessage} response
     * @param {string} body
     */
    function callback( err, response, body ) {
      if ( err ) {
        reject( err );
      }

      resolve( [ response, body ] );
    }
  );
}

/**
 * promise wrapper for the npm request package
 *
 * wraps the npm request package, in a bluebird promise, resolving with an array containing the
 * [ response, body ] or rejecting with an `Error`
 *
 * @link https://www.npmjs.com/package/request
 *
 * @param {string|Object} user_options
 * @param {boolean} [debug]
 * @returns {Promise}
 */
module.exports = function getRequestAsBluebird( user_options, debug ) {
  if ( debug === true ) {
    require( 'request-debug' )( request );
  }

  return new Promise(
    /**
     * @param {Function} resolve
     * @param {Function} reject
     */
    function ( resolve, reject ) {
      callRequest.call( null, resolve, reject, user_options );
    }
  );
};
