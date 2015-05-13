$(document).ready(function(){
	//Declare Vars
	var totalWidth = 0;
	var positions = new Array();

	$('#slides .slide').each(function(i){
		//Get slider widths
		positions[i] = totalWidth;
		totalWidth += $(this).width();

		//Check widths
		if(!$(this).width()){
			alert('Please add a width to your images');
			return false;
		}
	});

	//Set Widths
	$('#slides').width(totalWidth);

	$('#menu ul li a').click(function(e, keepScroll){
		//Remove active class and add inactive
		$('li.product').removeClass('active').addClass('inactive');
		//Add acitve class to parent
		$(this).parent().addClass('active');

		var pos = $(this).parent().prevAll('.product').length;

		$('#slides').stop().animate({marginLeft:-positions[pos]+'px'}, 450);

		//Prevent Default
		e.preventDefault();

		//Stop Autoscroll
		if(!autoScroll) clearInterval(itvl);
	});

	//Make first image active
	$('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');

	//Auto Scroll
	var current=1;
	function autoScroll(){
		if(current == -1) return false;

		$('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click', [true]);
		current++;
	}

	//Duration for auto scroll
	var duration = 3;
	var itvl = setInterval(function(){autoScroll()}, duration*1000);

});