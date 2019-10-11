//Пропорции мира
var sceneWidth = 1.5;
var sceneHeight = 1;

//Коэффициент перевода относительных координат в пиксели
var scaleFactor;

var startTime = Date.now();
//Глобальная переменная времени последнего пересчета состояния
var lastTime = Date.now();
//Время, прошедшее с последнего пересчета состояния
var deltaT = 0;

//Очки игроков
var points1 = 0;
var points2 = 0;

//Переменные мяча и игроков
var ball    = null;
var player1 = null;
var player2 = null;
var plaerWon1 = null;
var playerWon2 = null;

//Отрезки сетки и стен
var net;
var topWall;
var botWall;
var leftWall;
var rightWall;

var starSpeed;

//Функция пересчета позиции объекта
function updatePosition(obj, deltaTime) {
    //Уравнение равноускоренного движения
    obj.pos.add(vAdd(vMult(obj.v, deltaTime), vMult(obj.a, 0.5 * sqr(deltaTime))));
    obj.v.add(vMult(obj.a, deltaTime));
}

//Функция запуска всего.
function setup() {
    //Вычисление коэффициента перевода координат
    scaleFactor = Math.min(windowWidth / sceneWidth, windowHeight / sceneHeight);

    //Создание окна отрисовки
    createCanvas(scaleFactor * sceneWidth, scaleFactor * sceneHeight);

    initializeBall();
    initializePlayers();
    initializeBackground();

    //Создание объектов
    ball    = new Ball(sceneWidth / 3, sceneHeight / 2, 0, 0, GRAVITY, BALL_R);
    player1 = new Player(sceneWidth / 3, BALL_R, true);
    player2 = new Player(2 * sceneWidth / 3, BALL_R, false);

    //Создание препятствий
    net       = [createVector(sceneWidth * .5, 1), createVector(sceneWidth * .5, sceneHeight * .5)];
    topWall   = [createVector(0, 0), createVector(sceneWidth, 0)];
    botWall   = [createVector(0, sceneHeight), createVector(sceneWidth, sceneHeight)];
    leftWall  = [createVector(0, 0), createVector(0, sceneHeight)];
    rightWall = [createVector(sceneWidth, 0), createVector(sceneWidth, sceneHeight)];

    playerWon1 = loadImage("assets/LU.png");
    playerWon2 = loadImage("assets/RU.png"); 

    frameRate(100);
}

//Функция, проверяющая столкновения мяча с остольными объектами
function collideBall() {
    collideWithSegment(ball, net, NET_VISCOSITY);
    collideWithSegment(ball, topWall, WALL_VISCOSITY);
    collideWithSegment(ball, botWall, WALL_VISCOSITY);
    collideWithSegment(ball, leftWall, WALL_VISCOSITY);
    collideWithSegment(ball, rightWall, WALL_VISCOSITY);

    collideWithPlayer(ball, player1);
    collideWithPlayer(ball, player2);
}

//Обработка нажатия клавиш прыжка игроками
//88 - код клавиши 'X'
//78 - код клавиши 'N' на нумпаде
function keyPressed() {
    if (keyCode === 88 && player1.pos.y === sceneHeight - player1.r) {
        player1.v.y = -JUMP_SPEED;
        player1.a.y = GRAVITY;
    }
    if (keyCode === 78 && player2.pos.y === sceneHeight - player2.r) {
        player2.v.y = -JUMP_SPEED;
        player2.a.y = GRAVITY;
    }
}

//Обработка нажатия клавиш движения игроками
//90 - код клавиши 'Z'
//67 - код клавиши 'C'
//66 - код клавиши 'B' на нумпаде
//77 - код клавиши 'M' на нумпаде
function checkKeys() {
    if (keyIsDown(90)) {
        player1.v.x = -MOVE_SPEED;
    }
    else if (keyIsDown(67)) {
        player1.v.x = MOVE_SPEED;
    }
    else {
        player1.v.x = 0;
    }

    if (keyIsDown(66)) {
        player2.v.x = -MOVE_SPEED;
    }
    else if (keyIsDown(77)) {
        player2.v.x = MOVE_SPEED;
    }
    else {
        player2.v.x = 0;
    }
}

//Проверка на то, что кто-то победил в раунде
function checkWinner() {
    if (ball === null)
        return;

    if (ball.pos.y > sceneHeight - ball.r) {
        if (ball.pos.x < 0.5 * sceneWidth) {
            points2++;
            ball = new Ball(sceneWidth / 4, 0.7 * sceneHeight, 0, 0, 0, BALL_R);
        }
        else {
            points1++;
            ball = new Ball(3 * sceneWidth / 4, 0.7 * sceneHeight, 0, 0, 0, BALL_R);
        }
    }
}

//Функция, пересчитывающая состояние мира
function updateWorld() {
    updateBackground(deltaT);

    checkKeys();

    if (ball !== null)
        ball.updatePosition(deltaT);
    player1.updatePosition(deltaT);
    player2.updatePosition(deltaT);

    checkWinner();

    if (ball !== null)
        collideBall();
}

//Отрисовка мира
function drawWorld() {
    //Заливка фона цветом
    drawBackground(deltaT);

    fill(255, 0, 0);

    //Надписи счета
    textSize(32);
    text("Left unicorn : " + points1, 10, 30);
    text("Right unicorn : " + points2, 10 + 0.5 * sceneWidth * scaleFactor, 30)

    //Цвет сетки
    stroke(255, 0, 0);
    //Отрисовка сетки
    line(net[0].x * scaleFactor, net[0].y * scaleFactor, net[1].x * scaleFactor, net[1].y * scaleFactor);

    //Отрисовка мяча и игроков
    if (ball !== null)
        ball.draw();
    player1.draw();
    player2.draw();
}

function draw() {
    if (points1 == 15) {
        image(playerWon1, 0, 0, sceneWidth * scaleFactor, sceneHeight * scaleFactor);
	}
    else if (points2 == 15) {
        image(playerWon2, 0, 0, sceneWidth * scaleFactor, sceneHeight * scaleFactor);
	}
    else {
        //Вычисление времени, прошедшего с момента последнего пересчета
        var currentTime = Date.now();
        deltaT = (currentTime - lastTime) * 0.001;
        lastTime = currentTime;

        starSpeed = Math.min(STAR_MAX_SPEED, STAR_START_SPEED + (STAR_MAX_SPEED - STAR_START_SPEED) * (currentTime - startTime) / STAR_MAX_TIME)

        // console.log(deltaT);

        //Все пересчитать
        updateWorld();
        // //Все нарисовать
        drawWorld();
	}
}
