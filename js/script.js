$(document).ready(function() {

		  var gallery = $(".gallery");
	         var next = $(".next");
	         var prev = $(".prev");
	         var last = $(".last");
	         var list = $(".list");
	           var li = $(".list li");
	       var amount = $(".list li img").length;
	        var width = $(".list-holder").width();
	       var active = $(".list li.active");
	     var switcher = $(".switcher");
   var switcherLength = 0;
	      var current = $(".switcher li.active");
	        var slide = $(".list-holder li");
	     var mSeconds = 500;
	     var interval = 4000;
	     var intId;

	setListMargin();
	setSlideWidth();

	$(window).on("resize" ,function() {

		slide = $(".list-holder li");
		width = $(".list-holder").width();
		setSlideWidth();
		setListMargin();

		return width;
	});

	autoSlide(interval);

	next.on("click", function() {
		slideRight();
	});

	prev.on("click", function() {
		slideLeft();
	});

	switcher.on("click", "li", function() {
		switchSlide.call( $(this) );
	});

	gallery.on("mouseenter", function() {
		clearInterval(intId);
	});

	gallery.on("mouseleave", function() {
		autoSlide(interval);
	});
	
	//---------functions----------------
	function setSlideWidth() {
		slide.width(width);
	}

	function autoSlide(interval) {
		intId = setInterval(function() {
			slideRight();
		}, interval);
	}

	function setListMargin() {
		list.css( "marginLeft", -width * $(".list li").index(active) );
	}

	function slideRight() {

		var flag;
		
		if ( current.index() === $(".switcher li").length - 1 ) {

			switcherLength += li.length;
			current.removeClass("active");
			current = $(".switcher li").eq(0).addClass("active");
			flag = true;
		}

		if ( active.index() === $(".list li").length - 1 ) {

			active.removeClass("active");
			li.clone().appendTo(list);
			active = active.next().addClass("active");
			list.animate({
				marginLeft: "-=" + width + "px"
			}, mSeconds);

			return false;
		}

		active.removeClass("active");
		active = active.next().addClass("active");
		list.animate({
			marginLeft: "-=" + width + "px"
		}, mSeconds);

		if (flag) {
			return false;
		}

		current.removeClass("active");
		current = current.next().addClass("active");

		return false;
	}

	function slideLeft() {

		var flag;
		
		if (current.index() === 0) {

			switcherLength = 0;
			current.removeClass("active");
			current = $(".switcher li").last().addClass("active");
			flag = true;
		}

		if ( active.index() === 0 ) {

			active.removeClass("active");
			active.before( li.clone() );
			setListMargin();
			active = active.prev().addClass("active");					
			
			list.animate({
				marginLeft: "+=" + width + "px"
			}, mSeconds);

			return false;
		}

		active.removeClass("active");
		active = active.prev().addClass("active");
		list.animate({
			marginLeft: "+=" + width + "px"
		}, mSeconds);

		if (flag) {
			return false;
		}

		current.removeClass("active");
		current = current.prev().addClass("active");

		return false;
	}

	function switchSlide() {

		current.removeClass("active");
		current = $(this).addClass("active");
		active.removeClass("active");
		active = $(".list li").eq( current.index() + switcherLength ).addClass("active");

		list.animate({
			marginLeft: -width * active.index() + "px"
		}, mSeconds);

		return false;	
	}
});