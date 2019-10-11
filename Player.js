//Описание структуры Игрок и всех связных методов и функций.

//Глобальная переменная, в которой хранится картинка игрока
var unicorn;

//Конструктор
function Player(x, r, isLeft) {
    this.pos = createVector(x, sceneHeight - r);
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
    this.r = r;

    this.xL = isLeft ? r : sceneWidth * 0.5 + r;
    this.xR = isLeft ? sceneWidth * 0.5 - r : sceneWidth - r;
    this.isLeft = isLeft;
}

//Метод отрисовки игрока
Player.prototype.draw = function() {
    // Если отрисовываем левого игрока, то надо развернуть картинку
    if (this.isLeft) {
        push();
        translate((this.pos.x + this.r) * scaleFactor, (this.pos.y - this.r) * scaleFactor)
        scale(-1, 1);
        image(unicorn, 0, 0, 2 * this.r * scaleFactor, 2 * this.r * scaleFactor);
        pop();
    }
    else {
        image(unicorn, (this.pos.x - this.r) * scaleFactor, (this.pos.y - this.r) * scaleFactor, 2 * this.r * scaleFactor, 2 * this.r * scaleFactor);
    }
}

//Метод пересчета координаты мяча
Player.prototype.updatePosition = function(deltaTime) {
    updatePosition(this, deltaTime);

    //Останавливаем игрока после прыжка
    if (this.pos.y > sceneHeight - this.r) {
        this.pos.y = sceneHeight - this.r;
        this.v.y = 0;
        this.a.y = 0;
    }

    //Проверка , не вышел ли игрок за свою часть поля
    if (this.pos.x < this.xL) {
        this.pos.x = this.xL;
    }
    if (this.xR < this.pos.x) {
        this.pos.x = this.xR;
    }
}

//Загрузка картинки игрока
function initializePlayers() {
    unicorn = loadImage("assets/h5unicorn.gif");
}
