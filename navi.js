$(function(){

// header slide
var firstChk = 1;
var scrollDiv = function() {
	var winWidth = $(window).width();
	var $tmp = $(window).scrollTop();
	var $el = $('header');
	var $target = $el.height()-50;
	if (winWidth > 1000){	
		$el.removeClass('moveM');
		if ($tmp > $target){
			$el.addClass('moveW');
			if (firstChk == 1){
				menuSlide();
				firstChk = 0;
			}			
		} else {
			firstChk = 0;
			$el.removeClass('moveW');
			menuClear();
		}
	} else {
		$el.removeClass('moveW');
		if ($tmp > $target){
			$el.addClass('moveM');
			//$('#logo a img').attr('src','../images/img/img_logo_active.png');
		} else {
			$el.removeClass('moveM').removeAttr('style','');
			$('#logo a img').attr('src','../images/img/img_logo.png');
		}
	}
}

window.onload = function () {
if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
	$('html, body').on('mousewheel DOMMouseScroll', function (e) {//DOMMouseScroll =파이어폭스 마우스휠 적용
		if ($('#topMenu').is('.on')){
			var delta = 0;
			if (!event) event = window.event;
			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
				if (window.opera) delta = -delta;
			} else if (event.detail) delta = -event.detail / 3;
			var moveTop = null;
			// 마우스휠을 위에서 아래로
			if (delta < 0) {
				$('header').addClass('moveSlide');
				$('#navibg').stop().animate({'top':'-100%','height':'120px'},0);
			// 마우스휠을 아래에서 위로
			} else {
				menuSlide();
			}
		}
	});
} else {
		//

	}
}




// scrollDiv action
if ( $('.modalClose').length > 0) { } 
else { $(window).scroll(function() { scrollDiv(); }); }


var menuSlide = function(){
	if ($('header').is('.moveW')){
		$('header').removeClass('moveSlide');
		$('#navibg').stop().animate({'top':'0','height':'120px'},0);
		logoChange();
	}
}

var mnaviView = function (){
	$('ul[id^=topSubm]').css('display','none').css('height','auto');
	$('a[id^=topNavi]').removeClass('hover');
	$(this).siblings('ul').css({'display':'block'}); 
	$(this).addClass('hover');	
}

var logoChange = function(){
	var target = $('#logo');
	//target.find('img').attr('src','../images/img/img_logo_active.png');
	$('.util01').attr('src','../images/img/img_util_sfd_active.png');
	$('.util02').attr('src','../images/img/img_util_smart_active.png');
	$('#navi').addClass('active');
}


var logoNormal = function(){
	var target = $('#logo');
	target.find('img').attr('src','../images/img/img_logo.png');
	$('.util01').attr('src','../images/img/img_util_sfd.png');
	$('.util02').attr('src','../images/img/img_util_smart.png');
}

var menuClear = function (){
	if ($('header').is('.moveW')){
		$('#navibg').stop().animate({'height':'120px'},200);
	} else {
		$('#navibg').stop().animate({'height':'0'},200);
		$('#navi').removeClass('active');
		logoNormal();
	}
	$('ul[id^=topSubm]').stop().animate({'height':'0'},100);
	$('a[id^=topNavi]').removeClass('hover');
	
}


var menuBlock = function (){

	var depId = this.id;
	var depClass = depId.substr(0,7);
	var depNum = depId.substr(7,8);
	
	if (depClass == 'topNavi') {
		$('a[id^=topNavi]').removeClass('hover');
		$(this).addClass('hover');
	}
	if (depClass == 'topSubm') {
		targetDiv = $(this).siblings();
		targetDiv.addClass('hover');
	}
		
	$('#navibg').stop().animate({'top':'0','height':'474px'},200);		
	$('ul[id^=topSubm]').css('display','block');
	$('ul[id^=topSubm]').stop().animate({'height':'284px'},300);
	logoChange();
}



var menuEvent = function () {
	
	$('a[id^=topNavi]').each(function() {
		if( $('#topMenu').is('.on') ){
			$(this).mouseenter(menuBlock)
					   .focus(menuBlock)
					  .mouseleave(menuClear);
			$(this).unbind('click');
		} else {
			$(this).click(mnaviView);
			$(this).unbind('mouseenter mouseleave focus')
		}
	});

	$('ul[id^=topSubm]').each(function() {
		if( $('#topMenu').is('.on') ){
			$(this).mouseenter(menuBlock)
					  .mouseleave(menuClear);
			$(this).unbind('click');
		} else {
			$(this).click(mnaviView);
			$(this).unbind('mouseenter mouseleave focus')
		}
	});

	$('#navibg').each(function() {
		if( $('#topMenu').is('.on') ){
			$(this).mouseenter(menuBlock)
					  .focus(menuBlock)
					  .mouseleave(menuClear);
			$(this).unbind('click');
		} else {
			$(this).click(mnaviView);
			$(this).unbind('mouseenter mouseleave focus')
		}
	});

}


var menuWchk = function(){
	var winWidth = Math.max($(window).width(), window.innerWidth);

	if(winWidth > 1000){
		$('#topMenu').addClass('on'); 
	} else {
		$('#topMenu').removeClass('on');
	}
	menuEvent();
}


// Resize, Orientation Control
$(window).resize(function () {
	var $tmp = $(window).scrollTop();
	var $winw = $(window).width();

	menuWchk();
	if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){
		var target= $('#mNavi');
		if (target.is('.active')){
			target.click();
			$('#navi').stop();
			$('#navi').removeAttr('style','');
			$('#mNavi.active').click();
		}
		
		if (!$('header').is('.moveSlide')){
			$('#navi').removeAttr('style','');
			$('#topMenu').removeAttr('style','');
			$('ul[id^=topSubm]').removeAttr('style','');
			$('a[id^=topNavi]').removeClass('hover');
		}
		
		if ($winw < 1001){
			$('header').removeClass('moveSlide');
		} else {
			if ($tmp > 0){
				$('header').addClass('moveSlide');
				$('#navibg').removeAttr('style','');
				$('#subTabs').removeClass('moveTabs');
				$('#subTabs').css('top','0');
			}			
		}
		
		scrollDiv();
	}
	linkLimits();
});

// M Mode Control
$('#mNavi').bind('click',function(){
	var winHeight = $(window).height();
	
	if (!$(this).is('.active')){
		$('#navi').css('height',winHeight);
		$('#navi').stop().animate({'right':'0'},300);
		$('#topMenu').css('height',winHeight-$('#navi').css('padding-top').replace(/[^0-9]/g, ""));
		$('#mBg').css('display','block');
		$(this).css({'right':'20px'});
		setTimeout( function(){ $('#mNavi').addClass('active');	}, 300);
		$('html').css('overflow-y','hidden');
		$('#logo').css('z-index','70');		
	} else {
		$('#navi').stop().animate({'right':'-100%'},300);
		$(this).removeAttr('style');
		setTimeout( function(){ 
			$('#mNavi').removeClass('active');
			$('#topMenu').removeAttr('style');
			$('ul[id^=topSubm]').removeAttr('style','');
			$('a[id^=topNavi]').removeClass('hover');
			$('#mBg').removeAttr('style');
		}, 300);
		$('html').css('overflow-y','auto');
		$('#logo').css('z-index','74');
	}
});


var linkLimits = function (){ 
	$('a[id^=topNavi]').click(function(event){
		var winWidth =  $(window).width();
		if (winWidth < 1000){ 
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
		}
	});
}; 


$('#mBg').bind('click',function(){ $('#mNavi').click(); });

$(window).load(function(){ menuWchk(); scrollDiv(); linkLimits();});

// orientation Control
$(window).on( "orientationchange", function( event ) { menuWchk(); scrollDiv(); linkLimits();} )


});
