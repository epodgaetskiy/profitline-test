$(function() {

	var items = {};
		countImg = 21; 
		numActive = 10;
		aboutItem = $(".about");
		nameItem = $(".name");
		timer = 0;
		timerDuration = 4000;


	$.getJSON("date/feedback/feedback.json", function(date){
		items = date;
		renderSlider(items);

		slide = $(".slider li");

		changeActive(slide, numActive);
		autoSwitch(slide);
		clickSlide(slide);
		clickArrow(slide);

	});

	function renderSlider(items) {

		var slider = $(".slider");

		for (var i = 0; i < countImg; i++) {

			slider.append("<li><img src="+ items[i].url +"></li>");

		}

	}

	function clickSlide(slide) {
		slide.click(function(){

			var i = slide.index($(this));

			changeActive(slide, i);

			clearTimer(slide);
			
		})
	}

	function clickArrow(slide) {
		var arrows = $(".slider-arrow");

		arrows.click(function(){

			clearTimer(slide);

			var i = arrows.index($(this));

			if (i === 0) {

				if (numActive === 0) {
					numActive = countImg;
				} 

				numActive = numActive - 1;
				changeActive(slide, numActive);
			} else {

				if (numActive === (countImg - 1)) {
					numActive = -1;
				} 

				numActive++;
				changeActive(slide, numActive);
			}


		})

	}

	function changeActive(slide, num) {

		slide.removeClass("active");	
		slide.eq(num).addClass("active");
		nameItem.html(items[num].name);
		aboutItem.html(items[num].about);

		numActive = num;
	}

	function autoSwitch(slide) {

		timer = setInterval(function(){

			if (numActive === (countImg - 1)) {
				numActive = -1;
			} 

			numActive++;
			changeActive(slide, numActive);

		}, timerDuration);

	}

	function clearTimer(slide) {
		if (timer) {
			clearInterval(timer);
			autoSwitch(slide);
		}
	}

});

