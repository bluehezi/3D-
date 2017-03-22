/*
* @Author: bluedoor
* @Date:   2017-03-22 15:51:28
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-03-22 22:35:39
*/

'use strict';
~function (window,document,$) {

	let bgSrc = {
		'0': 'images/1.jpg',
		'1': 'images/2.jpg',
		'2': 'images/3.jpg',
		'3': 'images/4.jpg'
	};
	const liCount = 5; // 图片分成几块
	const picWidth = 640;  // .box 的宽度
	const itemWidth  = picWidth / liCount; // 每个li图片块的宽度

	$(document).ready(function($) {
		//  根据bgSrc 动态生成 ul > li > div*4
		$('.box').append('<ul>')
		for (let i = 0; i < liCount; i++) {
			let tLi = $('<li>');
			$('.box > ul').append(tLi);

			tLi.css({'left': i * itemWidth});
			$.each(bgSrc, function(index, el) {
				let tDiv = $('<div>');
				tLi.append(tDiv);
				tDiv.css({'background': 'url('+ el +') left top no-repeat',
					'backgroundPosition': -i * itemWidth + 'px top'
				})
			});
		} 

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