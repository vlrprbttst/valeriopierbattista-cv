(function() {



	var $html = $("html:not(.ie)");

	function enableSkrollr() {

		var s = skrollr.init({
			forceHeight : false
		});
	}//enable

	function disableSkrollr() {

		var s = skrollr.init();
		s.destroy();

	}//disable

	if ($html.hasClass("no-touch")) {
		enquire.register("screen and (min-width: 1140px)", {
			match : function() {
				enableSkrollr();
			},
			unmatch : function() {
				disableSkrollr();
			}
		});
	};

	$('.arrow-up a').click(function() {
		$('html, body').animate({
			scrollTop : $($.attr(this, 'href')).offset().top
		}, 500);
		return false;
	});

	$('.hgroup a').click(function() {
		$('html, body').animate({
			scrollTop : $($.attr(this, 'href')).offset().top
		}, 3500);
		return false;
	});
	
	$(".pdf-download").click(function(event) {
		event.preventDefault();
		$(".popup-bg").css("display","block");
	});
	$(".close").click(function() {
		
		$(".popup-bg").css("display","none");
	});

})();

