'use strict';

/**
  * This is my slider module
  * you can include it to your page, see example in index.html
  */


let Slider = (function () {
	
	// this is default options for Slider constructor
	var slider_default_options = {
			infinity: false,
			autoplay: true,
			time_difference: 2000,
			keys: true
		};

	function Slider(_container, options={}) {

		var	container, // this is div.slider-container
			slides, // <li> tags inside <ul> tag
			count_of_slides,
			current_slide_id = 0, 
			ul,
			ul_style,
			timeout_id, // I need this variable for autoplay normal work

			//  base64 data for control buttons
			right_arrow_base64_data = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDMwNy4wNDYgMzA3LjA0NiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzA3LjA0NiAzMDcuMDQ2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGcgaWQ9Il94MzRfODQuX0ZvcndhcmQiPgoJCTxnPgoJCQk8cGF0aCBkPSJNMjM5LjA4NywxNDIuNDI3TDEwMS4yNTksNC41OTdjLTYuMTMzLTYuMTI5LTE2LjA3My02LjEyOS0yMi4yMDMsMEw2Ny45NTUsMTUuNjk4Yy02LjEyOSw2LjEzMy02LjEyOSwxNi4wNzYsMCwyMi4yMDEgICAgIGwxMTUuNjIxLDExNS42MjZMNjcuOTU1LDI2OS4xMzVjLTYuMTI5LDYuMTM2LTYuMTI5LDE2LjA4NiwwLDIyLjIwOWwxMS4xMDEsMTEuMTAxYzYuMTMsNi4xMzYsMTYuMDcsNi4xMzYsMjIuMjAzLDAgICAgIGwxMzcuODI4LTEzNy44MzFDMjQ1LjIyMiwxNTguNDg3LDI0NS4yMjIsMTQ4LjU1NiwyMzkuMDg3LDE0Mi40Mjd6IiBmaWxsPSIjYWFhYWFhIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
			left_arrow_base64_date = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI1MC43MzggMjUwLjczOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjUwLjczOCAyNTAuNzM4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnIGlkPSJSb3VuZGVkX1JlY3RhbmdsZV8zM19jb3B5XzRfMV8iPgoJPHBhdGggc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkOyIgZD0iTTk2LjYzMywxMjUuMzY5bDk1LjA1My05NC41MzNjNy4xMDEtNy4wNTUsNy4xMDEtMTguNDkyLDAtMjUuNTQ2ICAgYy03LjEtNy4wNTQtMTguNjEzLTcuMDU0LTI1LjcxNCwwTDU4Ljk4OSwxMTEuNjg5Yy0zLjc4NCwzLjc1OS01LjQ4Nyw4Ljc1OS01LjIzOCwxMy42OGMtMC4yNDksNC45MjIsMS40NTQsOS45MjEsNS4yMzgsMTMuNjgxICAgbDEwNi45ODMsMTA2LjM5OGM3LjEwMSw3LjA1NSwxOC42MTMsNy4wNTUsMjUuNzE0LDBjNy4xMDEtNy4wNTQsNy4xMDEtMTguNDkxLDAtMjUuNTQ0TDk2LjYzMywxMjUuMzY5eiIgZmlsbD0iI2FhYWFhYSIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';
		
		if (!(this instanceof Slider)) {
			return new Slider(_container, options);
		}

		container = _container;
		ul = container.querySelector('ul');
		ul_style = ul.style;

		this.initOptions(options);
		slides = this.initSlides(ul);
		
		count_of_slides = slides.length;
		if (this.infinity && count_of_slides > 1) {
			
			// in this case at first we need to copy
			// last slide to begin (without deleting the last slide)
			putCopyOfLastSlideToBegin(false);

			// and move <ul> tag, so we will see the first slide
			ul_style.transition = 'left 0s ease-in-out';
			ul_style.left = '-100%';

			ul_style.width = `${count_of_slides + 1}00%`;

		} else {
			ul_style.width = `${count_of_slides}00%`;
		}

		this.previousSlide = function () {
			clearNextSlideTimeout();
			if (this.infinity) {
				
				putCopyOfLastSlideToBegin(true);
				ul_style.transition = 'all 0s ease-in-out';
				ul_style.left = '-200%';
				
				setTimeout(() => {
					ul_style.transition = 'all 0.7s ease-in-out';
					ul_style.left = '-100%';
				}, 30);

			} else {
				current_slide_id--;
				if (current_slide_id < 0) {
					current_slide_id = count_of_slides - 1;
				}
				ul_style.left = `-${current_slide_id}00%`;
			}
			if (this.autoplay) {
				setNextSlideTimeout.call(this);
			}
		};

		this.nextSlide = function () {
			clearNextSlideTimeout();
			
			if (this.infinity) {

				putCopyOfFirstSlideToEnd();
				ul_style.transition = 'all 0s ease-in-out';
				ul_style.left = '0%';
				
				setTimeout(() => {
					ul_style.transition = 'all 0.7s ease-in-out';
					ul_style.left = '-100%';
				}, 30);

			} else {

				current_slide_id++;

				if (current_slide_id === count_of_slides) {
					current_slide_id = 0;
				}

				ul_style.left = `-${current_slide_id}00%`;

			}
			if (this.autoplay) {
				setNextSlideTimeout.call(this);
			}
		};

		if (this.autoplay) {
			setNextSlideTimeout.call(this);
		}

		if (this.keys) {
			this.createControlButton({
				container: container,
				onclick_callback: this.previousSlide,
				className: 'left',
				base64_data: left_arrow_base64_date
			});
			this.createControlButton({
				container: container,
				onclick_callback: this.nextSlide,
				className: 'right',
				base64_data: right_arrow_base64_data
			});
		}

		function clearNextSlideTimeout() {
			if (timeout_id !== undefined) {
				clearTimeout(timeout_id);
			}
		}

		function setNextSlideTimeout() {
			timeout_id = setTimeout(() => {
				this.nextSlide.call(this);
			}, this.time_difference);
		}

		function putCopyOfLastSlideToBegin(delete_last) {
			var copy = slides[count_of_slides - 1].cloneNode(true);
			ul.insertBefore(copy, ul.firstChild);
			slides.unshift(copy);
			if (delete_last) {
				ul.removeChild(slides.pop());
			}
		};

		function putCopyOfFirstSlideToEnd() {
			ul.removeChild(slides.shift());
			var copy = slides[0].cloneNode(true);
			ul.appendChild(copy);
			slides.push(copy);
		};

	}

	Slider.prototype.initOptions = function (options) {
		for (let op in slider_default_options) {
			if (slider_default_options.hasOwnProperty(op)) {
				if (options.hasOwnProperty(op)) {
					this[op] = options[op];
				} else {
					this[op] = slider_default_options[op];
				}
			}
		}
	}

	Slider.prototype.initSlides = function (ul) {
		let slides = Array.from(ul.querySelectorAll('li'));
		for (var i = 0, len = slides.length; i < len; i += 1) {
			if (this.infinity && len > 1) {
				slides[i].style.width = `${100/(len + 1)}%`;
			} else {
				slides[i].style.width = `${100/len}%`;
			}
		}
		return slides;
	};

	Slider.prototype.createControlButton = function (args) {
		var image = new Image();
		image.src = args.base64_data;
		image.className = `slider-button ${args.className}`;
		image.onclick = () => args.onclick_callback.call(this);
		args.container.appendChild(image);
	};

	return Slider;
}());