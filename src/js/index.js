/*
* @Author: bluedoor
* @Date:   2017-03-22 15:51:28
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-22 21:48:38
*/

'use strict';
~function (window,document,$) {

	$(document).ready(function($) {

		$('.box > ul > li').each(function(index, el) {
			$(this).css({'left': index * 128});
			$(this).children('div').each(function(){
				$(this).css('backgroundPosition',-index*128+'px top')
			})
		});
		var rotateDeg = 0
		$('.box > .navigator > .next').on('click',
			debounce(function(event){
				rotateDeg += 90
				$('.box > ul > li').each(function(index, el) {
					$(this).css({
						'transition-delay':index * 0.1+'s',
						'transform':'rotateX(' + rotateDeg+'deg)'
					})	
				});
			})
		)	
		$('.box > .navigator > .pre').on('click',
			debounce(function(event){
				rotateDeg -= 90;
				$('.box > ul > li').each(function(index, el) {
				$(this).css({
					'transition-delay':index * 0.1+'s',
					'transform':'rotateX(' + rotateDeg+'deg)'
					})	
				});
			})
		);

		// 自动轮播图部分
		let timer = setInterval(intervalFunc, 3000);
		function intervalFunc () {
			rotateDeg += 90;
			$('.box > ul > li').each(function(index, el) {
				$(this).css({
					'transition-delay':index * 0.1+'s',
					'transform':'rotateX(' + rotateDeg+'deg)'
				})	
			});
		}	
		$('.box').mouseover(function(event) {
			clearInterval(timer)
			timer = null
		}).mouseleave(function(event) {
			timer = setInterval(intervalFunc, 3000)
		});

		// 去抖函数
		function debounce (func) {
			let deb = null;
			return function (event) {
				clearTimeout(deb);
				deb = setTimeout(func, 500, event)
			};
		}
	})

} (window,document,$)