'use strict';

$(document).ready(function () {

	$('#projects-button').click(function () {
		$('.home').css('display', 'none');
		$('.projects').css('display', 'block');
		$('.contact').css('display', 'none');
	});

	$('#contact-button').click(function () {
		$('.home').css('display', 'none');
		$('.projects').css('display', 'none');
		$('.contact').css('display', 'block');
	});

	$('#home-button').click(function () {
		$('.home').css('display', 'block');
		$('.projects').css('display', 'none');
		$('.contact').css('display', 'none');
	});
});