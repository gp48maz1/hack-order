$(document).ready(function(){
	$('#minblabla').click(function(){
		alert("helloasdf");
		var xp=0;
		if ( $(this).attr('value') > xp)
		{
			xp = $(this).attr('value');
		}	
		$('.progress-bar').css('width',xp+'%').attr('aria-valuenow', xp);
		$('.progress-bar').text(xp+'%');
	});

	/*working on*//*
	$('div#container').on('click', 'div.minblabla',function(){
		var xp = 0;
		alert('Woo');
		$('.minblabla').click(function(){
			alert("hello");
			if ( $(this).attr('value') > xp)
			{
				xp = $(this).attr('value');
			}
		});
		$('.progress-bar').css('width',xp+'%').attr('aria-valuenow', xp);
	});
	*/
});