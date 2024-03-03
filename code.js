var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var squares = {
    1: {x: 200, y:200}
};
var currPosX = 200;
var currPosY = 200;
var currDirection = "up"
var foodX = Math.floor(Math.random() * (canvas.width - 10));
var foodY = Math.floor(Math.random() * (canvas.height - 10));
var speed = 25;

function drawSnake() {
    Object.keys(squares).forEach((square) => {
        // debugger;
        ctx.clearRect(squares[square].x, squares[square].y, 10, 10);
        ctx.fillStyle = "black";
        switch (currDirection){
            case "right":
                currPosX+=1;
                break;
            case "left":
                currPosX-=1;
                break;
            case "up":
                currPosY-=1;
                break;
            case "down":
                currPosY+=1;
                break;
        }
        squares[square].x = currPosX;
        squares[square].y = currPosY;
        ctx.fillRect(currPosX, currPosY, 10, 10);
    })

}

function addSquare(){
    var nextSq = ((Object.keys(squares).length)+1);
    switch (currDirection){
        case "right":            
            squares[nextSq] = {x: currPosX-10, y: currPosY};
            // debugger;
            break;
        case "left":
            squares[nextSq] = {x: currPosX+10, y: currPosY};
            break;
        case "up":
            squares[nextSq] = {x: currPosX, y: currPosY+10};
            break;
        case "down":
            squares[nextSq] = {x: currPosX, y: currPosY-10};
            break;
    }   

}

function drawFood(){
    foodX = Math.floor(Math.random() * (canvas.width - 10));
    foodY = Math.floor(Math.random() * (canvas.height - 10));
    ctx.fillStyle = "red"
    ctx.fillRect(foodX, foodY, 5, 5);
}

function moveSnake() {    
    document.addEventListener('keydown',function(event){
        switch(event.key){
            case "ArrowRight":
                // debugger;
                if (currDirection != "left"){
                    currDirection = "right";
                    break;
                }    
            case "ArrowLeft":
                if (currDirection != "right"){
                    currDirection = "left";
                    break;
                }   
            case "ArrowUp":
                if (currDirection != "down"){
                    currDirection = "up";
                    break;
                }  
            case "ArrowDown":
                if (currDirection != "up"){
                    currDirection = "down";
                    break;
                }  
        }
        
    })

    function checking(){
        if(currPosX < 1 || currPosX >= canvas.width) {
            ctx.clearRect(currPosX, currPosY, 10, 10);
            currPosX = Math.abs(currPosX-300);
            //currPosY = 200;
            // currDirection = "up"    
        }else if (currPosY < 1 || currPosY >= canvas.height){
            ctx.clearRect(currPosX, currPosY, 10, 10);
            currPosY = Math.abs(currPosY-300);       
        }
        if((currPosX+5 >= foodX && currPosX+5 <= foodX+10) && (currPosY+5 >= foodY && currPosY+5 <= foodY+10)){
            ctx.clearRect(foodX, foodY, 5, 5); 
            // addSquare();
            drawFood();
            clearInterval(interval)
            interval = setInterval(checking, speed-=1);
            debugger;
        }
        drawSnake();  
    }
    var interval = setInterval(checking, speed);
}  
drawFood()  
moveSnake();