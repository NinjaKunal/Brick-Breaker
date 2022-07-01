let bricks = [];
//Ball Variables
let ballX,
    ballY,
    ball_dx = 3,
    ball_dy = -2.5,
    ballDia;

//Paddle Variables
let padX, padY, padWidth, padHeight, pad_dx;

//Score Variables
let maxScore = 0,
    currScore = 0,
    lives = 3;

//Brick Variables
let brickWidth = 80,
    brickHeight = 20,
    rowCnt = 10,
    colCnt = 8,
    brickCount = rowCnt*colCnt;

function setup() {
    createCanvas(800, 600);
    ballX = width / 2;
    ballY = height - 40;
    ballDia = 30;
    padWidth = 100;
    padHeight = 20;
    padX = width / 2 - padWidth / 2;
    padY = height - 25;
    pad_dx = 5;

    for (var i = 0; i < rowCnt; ++i) {
        for (var j = 0; j < colCnt; ++j) {
            let oneBrick = {
                x: i * 100 + 15,
                y: j * 25 + 50,
                w: 80,
                h: 20,
                v: true,
            };
            bricks.push(oneBrick);
        }
    }
}

function draw() {
    background("#333");
    ballX += ball_dx;
    ballY += ball_dy;
    fill("#258ffb");
    for (var i = 0; i < bricks.length; ++i) {
        if (bricks[i].v === true) {
            if (ballTouched(bricks[i], ballX, ballY, ballDia) === true)
                bricks[i].v = false;
            rect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
        }
    }
    console.log(bricks[bricks.length - 1].v);

    fill("#76f9fb");
    circle(ballX, ballY, ballDia / 2);
    fill("white");
    rect(padX, padY, padWidth, padHeight);

    //Left and Right Side
    if (ballX >= width - ballDia / 2 || ballX <= ballDia / 2)
        ball_dx = -ball_dx;

    //Top Side
    if (ballY <= ballDia / 2) ball_dy = -ball_dy;

    //Bottom Side
    if (ballY >= height - ballDia / 2) {
        if (lives) {
            padX = width / 2 - padWidth / 2;
            padY = height - 25;
            ballX = width / 2;
            ballY = height - 40;
            lives -= 1;
            ball_dx = 3;
            ball_dy = -2.5;
        }
    }

    //Pad Movement
    if (keyIsDown(RIGHT_ARROW) && padX + padWidth <= width - 0.2)
        padX += pad_dx;
    if (keyIsDown(LEFT_ARROW) && padX > 0.5) padX -= pad_dx;

    //pad Touch
    if (
        ballX + 15 > padX &&
        ballX - 15 < padX + padWidth &&
        ballY < height + padHeight - 25 &&
        ballY + 15 > height - 25
    ) {
        ball_dy = -ball_dy;
        var padCenter = padX + padWidth / 2;
        var ballDistFromPadCenter = ballX - padCenter;
        ball_dx = ballDistFromPadCenter * 0.2;
    }

    //BrickCollision
    function ballTouched(brick, ballX, ballY, ballDia) {
        if (
            ballX + ballDia / 2 > brick.x &&
            ballX - ballDia / 2 < brick.x + brick.w &&
            ballY < brick.y + brick.h &&
            ballY + ballDia / 2 > brick.y
        ) {
            ball_dy = -ball_dy;
            currScore += 1;
            return true;
        }
    }

    //Game Over
    if (lives == 0) {
        ball_dx = 0;
        ball_dy = 0;
        pad_dx = 0;
        text(
            " GAME OVER!\n Your Score: " + currScore,
            width / 2 - 40,
            height / 2
        );
    }

    //Game Won
    if (brickCount <= currScore) {
        padX = width / 2 - padWidth / 2;
        padY = height - 25;
        ballX = width / 2;
        ballY = height - 40;
        ball_dx = 0;
        ball_dy = 0;
        pad_dx = 0;
        textSize(50);
        text("Congrats\nYou Won", width / 2 - 75, height / 2);
    }
    textSize(25);
    fill("orange");
    text("Score: " + currScore, width - 100, 25);
    text("Lives: " + lives, 25, 25);
}
