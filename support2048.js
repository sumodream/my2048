//函数定义各个小矩形与大矩形的边距
function getPosTop(i,j){
	return 20+i*120;
}
function getPosLeft(i,j){
	return 20+j*120;
}

//函数定义数字变换时背景颜色
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;

	}
	return "black";
}
function getNumberColor(number){
	if(number<=4)
		return "#776e65";
	return "white";
}

//函数定义没有空间移动时矩形
function nospace(board){

	for (var i = 0;i<4; i++) 
		for (var j = 0; j <4; j++) 
			if(board[i][j]==0)
				return false;
	return true;
}

//函数定义键盘可以移动时矩形
function canMoveLeft(board){
	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++)
			if(board[i][j]!=0)
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j])
					return true;
	return false;			
}

//函数定义键盘可以移动时矩形
function canMoveRight(board){
	for(var i=0;i<4;i++)
		for(var j=0;j<3;j++)
			if(board[i][j]!=0)
				if(board[i][j+1]==0 || board[i][j+1]==board[i][j])
					return true;
	return false;			
}

//函数定义键盘可以移动时矩形
function canMoveUp(board){
	for(var j=0;j<4;j++)
		for(var i=1;i<4;i++)
			if(board[i][j]!=0)
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j])
					return true;
	return false;			
}

//函数定义键盘可以移动时矩形
function canMoveDown(board){
	for(var j=0;j<4;j++)
		for(var i=2;i>=0;i--)
			if(board[i][j]!=0)
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j])
					return true;
	return false;			
}

//函数定义左右阻挡物动画效果
function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1 ; i<col2;i++)
		if(board[row][i]!=0)
			return false;
	return true ;
}

//函数定义上下阻挡物动画效果
function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1 ; i<row2;i++)
		if(board[i][col]!=0)
			return false;
	return true ;
}

function nomove(board){
	if(canMoveLeft(board)||
	   canMoveRight(board) ||
	   canMoveUp(board) ||
	   canMoveDown(board))
	   return false;
	return true;
}