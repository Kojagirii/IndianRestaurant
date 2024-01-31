$(document).ready(function(){

	//fancybox.js init
	$('.fancybox').fancybox({
		openEffect : 'none',
		closeEffect : 'none',
		prevEffect : 'none',
		nextEffect : 'none',

		arrows : false,
		helpers : {
			media : {},
			buttons : {}
		}
	});



	//wow.js init
	wow = new WOW(
	    {
		  animateClass: 'animated',
		  mobile: false,
		  offset: 100
		}
	);
	wow.init();

	// using turn.js for the menu.html
	$("#menu_book").turn({
			width: 800,
			height: 1000,
			autoCenter: true
		});
		

	
});
					
$('#keyForm').submit(function(e) {
	e.preventDefault();
	const pressedKey = $('#keyInput').val();

	// Send the pressed key to the server
	$.ajax({
		type: 'POST',
		url: '/saveKey',
		contentType: 'application/json',
		data: JSON.stringify({ key: pressedKey }),
		success: function(response) {
			console.log('Key saved successfully:', response);
		},
		error: function(error) {
			console.error('Error saving key:', error);
		}
	});
});
});