$(function(){
    var gameSettings = {
        row: 50,
        col: 50,
        indexDimension: 13, //15px by 15px
        backgroundColor: "#d1d1d1",
        snakeColor: "#03ba3d",
        chickenColor: "#60004f",
        speed: 50
    }
    var player = {
        score: 0
    }
    var snake = {
        snakeArr: [],
    };

    var board = {
        boardArr: [],
        chickenPos: []

    };
    var interval;

    function setBoard(){
        for(var outerCtr = 0; outerCtr < gameSettings.row; outerCtr++){
            var row = [];
            var currentRow = $("#game-area").append("<tr>");
            for(var innerCtr = 0; innerCtr < gameSettings.col; innerCtr++){
                var index = $("<td></td>").appendTo(currentRow);
                row.push(index);
            }
            $("#game-area").append("</tr>")
            board.boardArr.push(row); // pushing row array inside an board array to create 2d arraay
        }
        $("td").css({"height": gameSettings.indexDimension, "width": gameSettings.indexDimension, "background-color": gameSettings.backgroundColor})
       
    }

    function displaySnake(snake, toRemove){
        
        if(arguments.length > 1){
            $(board.boardArr[toRemove[0]][toRemove[1]])
            .css({"background-color": gameSettings.backgroundColor})
        }
        for(var counter = 0; counter < snake.length; counter++){
            (counter != 0) ? $(board.boardArr[snake[counter][0]][snake[counter][1]])
            .css({"background-color": gameSettings.snakeColor}) : 
            $(board.boardArr[snake[counter][0]][snake[counter][1]])
            .css({"background-color": "#028c2e"});
        }
    }
    function displayChicken(){
        $(board.boardArr[board.chickenPos[0][0]][board.chickenPos[0][1]])
        .css({"background-color": gameSettings.chickenColor})
    }

    function setPlayerInitPos(xCoor, yCoor){
        snake.snakeArr.push([xCoor, yCoor]);
        snake.snakeArr.push([xCoor, yCoor - 1]);
        snake.snakeArr.push([xCoor, yCoor - 2]);
        snake.snakeArr.push([xCoor, yCoor - 3]);
        snake.snakeArr.push([xCoor, yCoor - 4]);
        displaySnake(snake); 
    }
    
    function snakeMove(xCoorPlus, yCoorPlus,){
        clearInterval(interval);
        interval = setInterval(function(){
            snake.snakeArr.unshift([snake.snakeArr[0][0] + xCoorPlus, snake.snakeArr[0][1] + yCoorPlus]);
            checkCollision();
            
            if(board.chickenPos.length === 0){
                board.chickenPos.push(generateRandomIndex());
                displayChicken();
            }
            var temp = checkEat();
        
            temp ? displaySnake(snake.snakeArr) :
            displaySnake(snake.snakeArr, snake.snakeArr.pop());
           
            

        }, gameSettings.speed);
    }

    $(document).keydown(function(e){
        if(e.which === 37 && snake.snakeArr[0][0] !== snake.snakeArr[1][0]){
            snakeMove(0,-1);
        }else if(e.which === 38 && snake.snakeArr[0][1] !== snake.snakeArr[1][1]){
            snakeMove(-1,0);
        }else if(e.which === 39 && snake.snakeArr[0][0] !== snake.snakeArr[1][0]){
            snakeMove(0,1);
        }else if(e.which === 40 && snake.snakeArr[0][1] !== snake.snakeArr[1][1]){
            snakeMove(1,0);
        }
    })

    function checkCollision(){
        if(snake.snakeArr[0][0] > 49 || snake.snakeArr[0][1] > 49 || 
           snake.snakeArr[0][0] < 0 || snake.snakeArr[0][1] < 0 ||
           (snake.snakeArr.join('-').indexOf(snake.snakeArr[0].toString(), 1)) > 0 ){
           
            clearInterval(interval);
            alert("Game Over");
            //resets
            snake.snakeArr = [];
            board.chickenPos = [];
            player.score = 0;
            $("#score").html("0");
            $("td").css({"background-color": gameSettings.backgroundColor})
            setPlayerInitPos(25,25);
            snakeMove(0,1);

        }
    }

    function checkEat(){
        if(snake.snakeArr[0].toString() === board.chickenPos[0].toString()){
            player.score += 1;
            board.chickenPos = [];
            $("#score").html(player.score);
            return true;
        }
        return false;
    }
    function generateRandomIndex() {
        xCoor = Math.floor(Math.random() * (gameSettings.row));
        yCoor = Math.floor(Math.random() * (gameSettings.col));
        return [xCoor, yCoor];
    }
    
    setBoard();
    setPlayerInitPos(25,25);
    snakeMove(0,1);
    
});






