//增加新的board为一个数组
var board=new Array();
//初始化游戏得分
var score=0;
//定义每个小格子发生碰撞的次数，碰撞检测的数组
var hasConflicated=new Array();

//做好文本新游戏的准备
$(document).ready(function(){
	newgame();
});

//函数定义一个新游戏
function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成数
	generateOneNumber();
	generateOneNumber();
}

//函数定义游戏初始化
function init(){
	for (var i = 0;i<4; i++) 
		for (var j = 0; j <4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top', getPosTop(i,j));
			gridCell.css('left', getPosLeft(i,j));

		 }
	//按新游戏按钮时又重新排列数组成为新的游戏
	for(var i=0;i<4;i++){
		board[i]=new Array();
		//碰撞检测中的数组也得重新开始
		hasConflicated[i]=new Array();
		for(var j=0;j<4;j++)
			board[i][j]=0;

			//每一个位置都没有进行碰撞
			hasConflicated[i][j]=false;

	}
	//更新游戏视图
	updateBoardView();
	//分数统计情况
	score=0;
}




//函数定义更新游戏视图
function updateBoardView(){
	var ncell=$('number-cell','grid-container');//选择所有的 数字单元格
	
	for(var i=0;i<ncell.length;i++){
		removeNode(ncell[i]);
	}
	//做数字移动循环条件 div中 class=number-cell重置
  $(".number-cell").remove();
  //重置时格子空间再次循环
   for (var i = 0;i<4; i++) 
		for (var j = 0; j <4; j++) {
			//appand为jQuery动作定义追加数字
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
			var theNumberCell=$('#number-cell-'+i+'-'+j);
			//判断不显示视图边距
			if(board[i][j]==0){
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				//距离上边框和左边框的距离
				theNumberCell.css('top',getPosTop(i,j)+50);
				theNumberCell.css('left',getPosLeft(i,j)+50);
			}
			//显示视图边距
			else{
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				//数字变化的背景颜色和数字本身的颜色变化
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			//碰撞已经开始了，重新复制归位
			hasConflicated[i][j]=false;
      }
      //解决数字格子溢出问题
    var numberCell=$('number-cell','grid-container');//选择所有的 数字单元格
    for(var i=0;i<numberCell.length;i++){
    	css(numberCell[i],'lineHeight',cellSideLength);
    	css(numberCell[i],'fontSize',0.2*cellSideLength);

}
}

//函数定义随机生成的两个数
function generateOneNumber(){
	//做随机生成空间判断
	if(nospace(board))
		return false;
    //随机一个位置，做数字整形的转置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));

    while(true){
    	if(board[randx][randy]==0)
    		break;

    	randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字，随机的2和4都为50%
    var randNumber=Math.random()<0.5?2:4;

    //在随机位置显示随机数字，起到动画效果
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);

	return true;
}

//控制方向键盘事件
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			if(moveLeft()){
				//随机一个数字,随机数字响应毫秒
				setTimeout("generateOneNumber()",210);
				//游戏结束，响应毫秒
				setTimeout("isgameover()",300);
			}
			break;
		case 38://up
		 	if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 39://right
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 40://down
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
			default://default
			break;
	}
});

//函数定义游戏结束，判断游戏结束条件：空间问题和边侧不能移动问题
function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

//游戏结束弹出警告标识问题
function gameover(){
	alert('gameover!');
}

//函数定义键盘移动
function moveLeft(){
	//判断移动条件，如果无法移动返回false
	if(!canMoveLeft(board))
		return false;

	//moveLeft 有空间可以移动，定义数字循环
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			//做可进行数字移动的条件
			if(board[i][j]!=0){

				//与移动方向的数字相同
				for(var k=0;k<j;k++){
					//做有空间可进行移动的判断，此时在此空间内没有遮挡物，可进行移动，附上新的位置与移动数字
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
						//move并产生动画效果
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						//继续操作
						continue;
					}
					//判断有相等的数字并没有遮挡物可移动并进行碰撞检测，并进行移动
					else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,k,j,board) && !hasConflicated[i][k]){
						//move显示动画
						showMoveAnimation(i,j,i,k);
						//add一个新数字，并赋值
						board[i][k]+=board[i][j];
						board[i][j]=0;	
						//add score
						score+=board[i][k];
						//更新分数
						updateScore(score);
						//碰撞检测
						hasConflicated[i][k]=true;
						//继续做下一步操作
						continue;		
				}	
			}
		}
	}
	//设置移动视图时间
	setTimeout("updateBoardView()",200);	
	return true;
}

//函数定义键盘移动
function moveRight(){
	//判断移动条件
	if(!canMoveRight(board))
		return false;

	//moveRight 有空间可以移动
	for(var i=0;i<4;i++)
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){

				//与移动方向的数字相同
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&& noBlockHorizontal(i,j,k,board)&& !hasConflicated[i][k]){
						//move显示动画
						showMoveAnimation(i,j,i,k);
						//add一个数字
						board[i][k]*=2;
						board[i][j]=0;

						score+=board[i][k];
						updateScore(score);
						hasConflicated[i][k]=true;
						continue;		
				}	
			}
		}
	}
	//设置移动视图时间
	setTimeout("updateBoardView()",200);	
	return true;
}

//函数定义键盘移动
function moveUp(){
	//判断移动条件
	if(!canMoveUp(board))
		return false;

	//moveUp有空间可以移动
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){

				//与移动方向的数字相同
				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockHorizontal(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&& noBlockHorizontal(j,k,i,board)&& !hasConflicated[k][j]){
						//move显示动画
						showMoveAnimation(i,j,k,j);
						//add一个数字
						board[k][j]+=board[i][j];
						board[i][j]=0;

						score+=board[k][j];
						updateScore(score);
						hasConflicated[k][j]=true;
						continue;		
				}	
			}
		}
	}
	//设置移动视图时间
	setTimeout("updateBoardView()",200);	
	return true;
}

//函数定义键盘移动
function moveDown(){
	//判断移动条件
	if(!canMoveDown(board))
		return false;

	//moveDown有空间可以移动
	for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){

				//与移动方向的数字相同
				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlockHorizontal(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&& noBlockHorizontal(j,k,i,board) && !hasConflicated[k][j]){
						//move显示动画
						showMoveAnimation(i,j,k,j);
						//add一个数字
						board[k][j]+=board[i][j];
						board[i][j]=0;

						score+=board[k][j];
						updateScore(score);
						hasConflicated[k][j]=true;
						continue;		
				}	
			}
		}
	}
	//设置移动视图时间
	setTimeout("updateBoardView()",200);	
	return true;
}
