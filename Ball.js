//Описание структуры Мяч и всех связных методов и функций.

//Глобальная переменная, в которой хранится картинка мяча
var earth

//Конструктор
function Ball(x, y, vx, vy, ay, r) {
    this.pos = createVector(x, y);
    this.v = createVector(vx, vy);
    this.a = createVector(0, ay);
    this.r = r;
}

//Метод отрисовки мяча
Ball.prototype.draw = function() {
    image(earth, (this.pos.x - this.r) * scaleFactor, (this.pos.y - this.r) * scaleFactor, 2 * this.r * scaleFactor, 2 * this.r * scaleFactor);
};

//Метод пересчета координаты мяча
Ball.prototype.updatePosition = function(deltaTime) {
    updatePosition(this, deltaTime);
}

//Загрузка картинки мяча
function initializeBall()
{
    earth = loadImage("assets/earth.png");
}

//Функция пересчета скорости после столкновения с преградой
//n - единичный вектор нормали общей касательной мяча и преграды
//v - изначальная скорость
function reflectVelocity(n, v) {
    var u = vMult(n, vDot(v, n));
    return vAdd(v, vMult(u, -2));
}

//Функция столкновения мяча и игрока
function collideWithPlayer(ball, player) {
    var d = player.pos.dist(ball.pos);
    if (d < player.r + ball.r) {
        //Вычиление общей нормали
        var n = vSub(ball.pos, player.pos).normalize()
        //Отражение скорости шара в три действия:
        //  1) Перейти в систему координат игрока
        //  2) Отразить мяч
        //  3) Перейти обратно в нормальную систему координат
        ball.v = vAdd(reflectVelocity(n, vSub(ball.v, player.v)), player.v);
        //Избавляемся от столкновения, немножечко отодвигая мяч от игрока
        ball.pos = vAdd(player.pos, vMult(n, (player.r + ball.r + 1e-7)));
        ball.a = createVector(0, GRAVITY);
    }
}

//Функция столкновения мяча с отрезком. viscosity - трение стены
function collideWithSegment(ball, segment, viscosity) {
    //Считаем точку соприкосновения мяча с отрезком
    var intersection = sphereSegmentIntersection(ball.pos, ball.r, segment[0], segment[1]);
    if (intersection != null) {
        var n = vSub(ball.pos, intersection).normalize();
        ball.v = vMult(reflectVelocity(n, ball.v), viscosity);
        ball.pos = vAdd(intersection, vMult(n, ball.r + 1e-7));
    }
}
