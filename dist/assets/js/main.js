/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/debounce.ts":
/*!*************************!*\
  !*** ./src/debounce.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(callback, delay) {
  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(void 0, args);
      timer = null;
    }, delay);
  };
}

/***/ }),

/***/ "./src/slide.ts":
/*!**********************!*\
  !*** ./src/slide.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slide)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debounce */ "./src/debounce.ts");




var Slide = /*#__PURE__*/function () {
  function Slide(container, slide) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Slide);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "container", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "slide", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "dist", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "index", void 0);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "slideArray", void 0);
    this.container = document.querySelector(container);
    this.slide = document.querySelector(slide);
    this.dist = {
      startX: 0,
      movement: 0,
      currentPosition: 0
    };
    this.index = {
      prev: 0,
      active: 0,
      next: 0
    };
    this.slideArray = [];
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Slide, [{
    key: "transition",
    value: function transition(active) {
      if (this.slide) {
        if (active) {
          this.slide.style.transition = 'transform 0.5s';
        } else {
          this.slide.style.transition = '';
        }
      }
    }
  }, {
    key: "moveSlide",
    value: function moveSlide(distX) {
      this.slide.style.transform = "translate3d(".concat(distX, "px, 0, 0)");
    }
  }, {
    key: "onMove",
    value: function onMove(event) {
      var pointerPosition;
      if (event instanceof MouseEvent) {
        pointerPosition = event.clientX;
      } else if (event instanceof TouchEvent) {
        pointerPosition = event.changedTouches[0].clientX;
      }
      this.dist.movement = (this.dist.startX - pointerPosition) * -1.6;
      this.moveSlide(this.dist.currentPosition + this.dist.movement);
    }
  }, {
    key: "onStart",
    value: function onStart(event) {
      var _this$container;
      this.transition(false);
      if (event instanceof MouseEvent) {
        event.preventDefault();
        this.dist.startX = event.clientX;
      } else if (event instanceof TouchEvent) {
        this.dist.startX = event.changedTouches[0].clientX;
      }
      var eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
      (_this$container = this.container) === null || _this$container === void 0 || _this$container.addEventListener(eventType, this.onMove);
    }
  }, {
    key: "onEnd",
    value: function onEnd(event) {
      var _this$container2;
      this.transition(true);
      this.dist.currentPosition += this.dist.movement;
      var eventType = event instanceof MouseEvent ? 'mousemove' : 'touchmove';
      (_this$container2 = this.container) === null || _this$container2 === void 0 || _this$container2.removeEventListener(eventType, this.onMove);
      if (this.dist.movement > 120) this.prev();else if (this.dist.movement < -120) this.next();else this.activeSlide(this.index.active);
    }
  }, {
    key: "addSlideEvents",
    value: function addSlideEvents() {
      var _this$container3, _this$container4, _this$container5, _this$container6;
      (_this$container3 = this.container) === null || _this$container3 === void 0 || _this$container3.addEventListener('mousedown', this.onStart);
      (_this$container4 = this.container) === null || _this$container4 === void 0 || _this$container4.addEventListener('touchstart', this.onStart);
      (_this$container5 = this.container) === null || _this$container5 === void 0 || _this$container5.addEventListener('mouseup', this.onEnd);
      (_this$container6 = this.container) === null || _this$container6 === void 0 || _this$container6.addEventListener('touchend', this.onEnd);
    }
  }, {
    key: "slideIndex",
    value: function slideIndex(index) {
      this.index.prev = index - 1;
      this.index.active = index;
      this.index.next = index + 1;
    }
  }, {
    key: "slidePostion",
    value: function slidePostion() {
      var _this = this;
      if (this.slide) {
        var slides = Array.from(this.slide.children);
        slides.forEach(function (slide, index) {
          if (_this.container) {
            var slideSpace = (_this.container.offsetWidth - slide.offsetWidth) / 2;
            _this.slideArray[index] = {
              element: slide,
              position: slideSpace + slide.offsetLeft * -1
            };
          }
        });
      }
    }
  }, {
    key: "activeSlide",
    value: function activeSlide(index) {
      var slide = this.slideArray[index - 1];
      this.moveSlide(slide.position);
      this.dist.currentPosition = slide.position;
      this.slideArray.forEach(function (item) {
        return item.element.classList.remove('active');
      });
      slide.element.classList.add('active');
      this.slideIndex(index);
    }
  }, {
    key: "prev",
    value: function prev() {
      if (this.index.prev) {
        this.activeSlide(this.index.prev);
      } else {
        this.activeSlide(this.index.active);
      }
    }
  }, {
    key: "next",
    value: function next() {
      if (this.index.next <= this.slideArray.length) {
        this.activeSlide(this.index.next);
      } else {
        this.activeSlide(this.index.active);
      }
    }
  }, {
    key: "onResize",
    value: function onResize() {
      var _this2 = this;
      setTimeout(function () {
        _this2.slidePostion();
        _this2.activeSlide(_this2.index.active);
      }, 1000);
    }
  }, {
    key: "addResizeEvent",
    value: function addResizeEvent() {
      window.addEventListener('resize', this.onResize);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      this.onStart = this.onStart.bind(this);
      this.onEnd = this.onEnd.bind(this);
      this.onMove = this.onMove.bind(this);
      this.onResize = (0,_debounce__WEBPACK_IMPORTED_MODULE_3__["default"])(this.onResize.bind(this), 200);
    }
  }, {
    key: "init",
    value: function init() {
      this.bindEvents();
      this.addSlideEvents();
      this.slidePostion();
      this.activeSlide(3);
      this.transition(true);
      this.addResizeEvent();
      return this;
    }
  }]);
  return Slide;
}();


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : String(i);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slide */ "./src/slide.ts");

var slide = new _slide__WEBPACK_IMPORTED_MODULE_0__["default"]('.slide-container', '.slide');
slide.init();
console.log(slide);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map