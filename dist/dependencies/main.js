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

$('.scroll-content').click(function(event){

	event.preventDefault();

	$('.scroll-content img').toggleClass('active');
});

$('.navbar-toggler').click(function(event){

	event.preventDefault();

	$('body').toggleClass('navbar-show');
});


// Other Events
// ===

// When the window is scrolled...
$(window).scroll(function(){

	var theWindow = $(this);

	// Log the new scrollTop.
	// console.log('Window scrolled: ' + theWindow.scrollTop());

	var contactWidget = $('#contact-widget');

	$('.scroll-content').each(function(){

		// Scroll this content down the page according to the scroll value of the window.
		// 
		// Some conditions:
		// - Don't scroll until the window has passed a certain "threshold" (100px below the element's parent container).
		// - Don't scroll if the new bottom of the element will move beyond the bottom of the parent container.
		if(theWindow.scrollTop() >= ($(this).parent().offset().top - 60) && ((theWindow.scrollTop() + $(this).outerHeight() + 60) <= ($(this).parent().offset().top + $(this).parent().outerHeight() - 25))){

			var newTranslateY = (theWindow.scrollTop() - ($(this).parent().offset().top) + 60 );

			if(newTranslateY < 0){

				newTranslateY = 0;
			}

			// Set the CSS value (use Math.floor to avoid strange rounding errors in the CSS layout).
			$(this).css('transform', 'translateY(' + Math.floor(newTranslateY) + 'px)');
		}
		else if (theWindow.scrollTop() < ($(this).parent().offset().top - 60)){

			// If we are at the top of the page, simply press reset the translate to 0px;
			$(this).css('transform', 'translateY(0px)');
		}
	});	

	if(theWindow.scrollTop() > 500){

		contactWidget.addClass('active');
	}
	else{

		contactWidget.removeClass('active');
	}

	$('.magic-header').each(function(){

		if((theWindow.scrollTop() + 100) >= $(this).offset().top){

			var target = $(this).data('target');

			$('.case-study-image-container > img').removeClass('active');
			$('img#' + target).addClass('active');

			console.log('Activating #' + target + ' now.');
		}
	});


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
