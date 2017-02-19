$(document).ready(function() {
	$('.menu-icon').click(function() {
		$('.nav-wrapper').toggleClass('nav-opened');
	});
	$('.nav .btn').click(function() {
		if ($('.nav-wrapper').hasClass('nav-opened')) {
			$('.nav-wrapper').toggleClass('nav-opened');
		}
	});
})