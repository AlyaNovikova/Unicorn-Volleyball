//Описание структуры Звезда и всех связных методов и функций.

//Глобальная переменная, в которой хранятся звезды
var stars = [];

//Конструктор
function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
}

//Обновление положения звезды
Star.prototype.update = function(deltaTime) {
    this.z = this.z - starSpeed * deltaTime;

    if (this.z < 1) {
        this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.pz = this.z;
    }
}

//Отображение звезды
Star.prototype.show = function() {
    fill(255);
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);

    var r = map(this.z, 0, width, 16, 0);

    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    stroke(255);
    line(px, py, sx, sy);
}

//Инициализация звезд
function initializeBackground() {
    for (var i = 0; i < STAR_COUNT; i++) {
        stars[i] = new Star();
    }
}

//Обновления положения всех звезд
function updateBackground(deltaTime) {
    for (var i = 0; i < stars.length; i++) {
        stars[i].update(deltaTime);
    }
}

//Отображения всех звезд
function drawBackground() {
    background(0);
    push();

    translate(width / 2, height / 2);
    for (var i = 0; i < stars.length; i++) {
        stars[i].show();
    }

    pop();
}
