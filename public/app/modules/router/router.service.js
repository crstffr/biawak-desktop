module.exports = RouterService;

RouterService.$inject = ['$state'];

function RouterService($state) {

    var forEach = require('lodash/forEach');

    var _onEnter = {};
    var _onExit = {};

    /**
     * Register a callback for when the current state is entered.
     * This callback is fired both normal and sticky states. An
     * optional immediate flag can be passed to immediately fire
     * the callback upon registration.
     *
     * @param {String|Object} state
     * @param {Function} cb
     * @param {Boolean} [immediate]
     */
    this.onEnter = function(state, cb, immediate) {
        if (typeof cb !== 'function') { return; }
        var name = (typeof state === 'string') ? state : $state.current.name;
        if (!_onEnter[name]) {
            _onEnter[name] = [];
        }
        _onEnter[name].push(cb);
        if (immediate) { cb(); }
    };

    /**
     * Register a callback for when the current state is exited.
     * This callback is fired both normal and sticky states.
     *
     * @param {String|Object} state
     * @param {Function} cb
     */
    this.onExit = function(state, cb) {
        if (typeof cb !== 'function') { return; }
        var name = (typeof state === 'string') ? state : $state.current.name;
        if (!_onExit[name]) {
            _onExit[name] = [];
        }
        _onExit[name].push(cb);
    };

    /**
     * Trigger all of the callbacks for entering a state.
     *
     * @param {Object} state
     * @param {Object} [params]
     */
    this.entered = function(state, params) {
        if (!state.name) { return; }
        forEach(_onEnter[state.name], function(cb) {
            cb(params);
        });
    };

    /**
     * Trigger all of the callbacks for exiting a state.
     * @param {Object} state
     * @param {Object} [params]
     */
    this.exited = function(state, params) {
        if (!state.name) { return; }
        forEach(_onExit[state.name], function(cb) {
            cb(params);
        });
    };

}
