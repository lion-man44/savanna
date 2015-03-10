(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(global) {
  'use strict';

  if ('WorkerLocation' in global || 'process' in global) return console.error('Not supported');

  // html enum
  var REGEXP = {
    element: /HTML(.+)Element/g,
    doc: /HTML(.+)Document/g
  };

  /**
   * constructor
   *
   * @param {String} elementName DOM name
   * @return {HTML*Element} element
   */
  function Savanna(elementName) {
    if (!(this instanceof Savanna)) return new Savanna(elementName);
    var type = getType(elementName);
    if (REGEXP.element.test(type) || REGEXP.doc.test(type)) console.log('No! Use element');
    this.el = document.querySelector(elementName);
  }

  /**
   * ajax function
   *
   * @method PublicClassMethod
   * @param {String} method method-name
   * @param {String} url route
   * @param {Function} callback execute-function
   * @param {Object} params post-parameter
   * @param {Object} header request-header
   */
  Savanna.ajax = function(method, url, callback, params, header) {
    var xhr = createXHR();

    xhr.open(method, url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4 || xhr.status !== 200) return;
      var text = xhr.responseText;
      var type = xhr.getResponseHeader('Content-Type');
      if (type.indexOf('application/json') === - 1) callback(text);
      else {
        var jsonObject = null;
        if (JSON.parse != null) jsonObject = JSON.parse(text);
        else jsonObject = eval('(' + text + ')');
        callback(jsonObject);
      }
      xhr = null;
    };

    if (header != null) {
      for (var key in header) {
        var value = header[key];
        xhr.setRequestHeader(key, value);
      }
    }

    if (params == null) xhr.send('');
    else {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      var lines = [];
      var i = 0;
      for (var key in params) {
        var value = params[key];
        lines[i] = key + '=' + encodeURIComponent(value);
        i++;
      }
      xhr.send(lines.join('&'));
    }
  };

  /**
   * addEventListener polyfil
   *
   * @param {HTML*Element} target DOM-target
   * @param {String} evt event-name
   * @param {Function} callback bind-function
   * @param {Boolean} capture capture-timing (true: capture phase, false: bubbling phase)
   */
  Savanna.addEvent = function(target, evt, callback, capture) {
    if (target.attachEvent != null) target.attachEvent('on' + evt, callback);
    else target.addEventListener(evt, callback, capture);
  };

  /**
   * get http request object
   *
   * @method PrivateMethod
   * @return {Object} HttpRequest object
   */
  function createXHR() {
    if (global.XMLHttpRequest != null) return new XMLHttpRequest();
    else {
      try {
        return new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }
    }
  };

  /**
   * get constructor name
   *
   * @method PrivateMethod
   * @param {Any} object
   * @return {String} type name
   */
  function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, - 1);
  }

  global['savanna' in global ? 'savannah' : 'savanna'] = Savanna;
})((this || 0).self || global);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
