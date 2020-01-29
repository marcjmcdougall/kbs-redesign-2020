// ==========
// Variables
// ==========

// Used to enable or disable certain development-only functionality.  Change this to false in a production environment.
var ENV_DEV = true;


// ==========
// Event Bindings
// ==========


// Lifecycle Events
// ===

// When the page loads...
$(window).on('load', function(){

	console.log('Ready.');
});

// When the screen is resized (for some reason)...
$(window).on('resize', function(){

	var theWindow = $(this);

	// Log the new window size.
	console.log('Window resize: ' + theWindow.outerWidth() + ' by ' + theWindow.outerHeight());
});


// Click Events
// ===

// When a scroll link is clicked...
$('.scroll-link').click(function(event){

	event.preventDefault();

	doScroll($(this).attr('href'));
});


// Other Events
// ===

// When the window is scrolled...
$(window).scroll(function(){

	var theWindow = $(this);

	// Log the new scrollTop.
	console.log('Window scrolled: ' + theWindow.scrollTop());
});



// ==========
// Helper Functions
// ==========


// Scroll Links
// ===

// Scrolls the body to the passed target (a string selector with a # in front of it denoting the id of the target element).
function doScroll(target){

	var targetElem = $('' + target);

	// If the target was found...
	if(targetElem.length){

		var destination = targetElem.offset().top - SCROLL_TOP_OFFSET;

		// Do the animation and focus the element (for screen readers).
		targetElem.focus();
		$('html, body').animate({scrollTop : destination}, 1000, 'swing');
	}
	else{

		console.log('Target not found -- be sure to add the \'#\' before the target in the \'href\' attribute in the HTML.');
	}
}
