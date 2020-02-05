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

$('#contact-widget .toggler').click(function(event){

	event.preventDefault();

	$('#contact-widget .content').toggleClass('active');
});

var toastTimeout;

$('#download').click(function(event){

	event.preventDefault();

	// TODO: Prep the toast with the toast content via HTML props.
	$('#toast').addClass('active');

	// Close the toast.
	toastTimeout = setTimeout(function(){

		$('#toast').removeClass('active');

	}, 7000);
});

$('#toast .close').click(function(event){

	event.preventDefault();

	$('#toast').removeClass('active');

	// TODO: Pass this ID via HTML props.
	clearTimeout(toastTimeout);
});


// Other Events
// ===

// When the window is scrolled...
$(window).scroll(function(){

	var theWindow = $(this);

	// Log the new scrollTop.
	console.log('Window scrolled: ' + theWindow.scrollTop());

	var contactWidget = $('#contact-widget');

	if(theWindow.scrollTop() > 500){

		contactWidget.addClass('active');
	}
	else{

		contactWidget.removeClass('active');
	}

	// $('.scroll-content').each(function(){

	// 	console.log('Eyy:  ' + $(this).offset().top);

	// 	if((theWindow.scrollTop() + 75) > $(this).offset().top){

	// 		var offset = theWindow.scrollTop() - $(this).offset().top;

	// 		// TODO: var currentTop = parseInt($(this).css('top'), 10);
	// 		$(this).css('top', offset + 'px');
	// 		console.log('start scrolling now!' + $(this).css('top').val());
	// 	}
	// });
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
