$(function(){
	var s = '';
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var id = i+'_'+j;
			s += '<div id="'+id+'" class="block"></div>'
		}	
	}
		$('#sence').html(s);

		var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		var data = {'0_0':true,'0_1':true,'0_2':true};
		var huashe = function(){
			
			$.each(snake,function(index,value){
				
				$('#'+value.x +'_'+ value.y).css({backgroundImage:'url(./image/chase.jpg)',backgroundSize:'19px 19px'});
			});
		}
		huashe();

		//投放食物(随机)
		var x,y;
		var dropFood = function(){
			x = Math.floor(Math.random()*20);
			y = Math.floor(Math.random()*20);
			while( data[x+'_'+y] ){
				x = Math.floor(Math.random()*20);
				y = Math.floor(Math.random()*20);
			}
			$('#'+x+'_'+y).css({backgroundImage:'url(./image/food1.jpg)',backgroundSize:'19px 19px'});
			//return{x:x,y:y};
		}
		dropFood();
		//var food = dropFood();

		var fangxiang = 39;
		var move = function(){
			var oldTou = snake[snake.length-1];
			if(fangxiang == 39){
				var newTou = {x:oldTou.x,y:oldTou.y+1};
			}//键盘上下左右按键
			if(fangxiang == 40){
				var newTou = {x:oldTou.x+1,y:oldTou.y};
			}
			if(fangxiang == 37){
				var newTou = {x:oldTou.x,y:oldTou.y-1};
			}
			if(fangxiang ==38){
				var newTou = {x:oldTou.x-1,y:oldTou.y};
			}
			if(newTou.x<0 || newTou.y<0 || newTou.x>19 || newTou.y>19 || data [ newTou.x+'_'+newTou.y ] ) {
				alert("再来");
				clearInterval(timerId);
				return;
			}
			if(newTou.x == x && newTou.y == y){
				dropFood();
				numAdd();
			}else{
				var weiba = snake.shift();
				delete data[weiba.x+'_'+weiba.y];
				$('#'+weiba.x+'_'+weiba.y).css('backgroundImage','none');
			}
			snake.push(newTou);
			data[newTou.x+'_'+newTou.y]=true;
			
			huashe();
		}

		var timerId = setInterval(move,200);

		$(document).keydown(function(e){
			if(Math.abs(e.keyCode - fangxiang) == 2){
				return;
			}
			if( !(e.keyCode >= 37 && e.keyCode <= 40) ){
				return;
			}
			fangxiang = e.keyCode;
		})

		//开始 暂停
		var fun2 = document.querySelector('#zanting');
		var fun1 = document.querySelector('#kaishi');
		fun2.onclick = function(){
			clearInterval(timerId);
			alert('暂停!');
		}
		fun1.onclick = function(){
			timerId = setInterval(move,200);
		}
		
		//加分数
		var score;
		var numAdd = function(){
			var num = document.querySelector('#fenshu').innerHTML;
			score = Number(num);
			score += 100;
			document.querySelector('#fenshu').innerHTML = score;
		}
	

	

})