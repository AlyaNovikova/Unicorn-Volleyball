//Вспомогательные функции, используемые в проекте

var vSub = p5.Vector.sub;
var vAdd = p5.Vector.add;
var vMult = p5.Vector.mult;
var vDot = p5.Vector.dot;

//Возведение числа в квадрат
function sqr(val) {
    return val * val;
}

//Вычисление ближайшей точки от точки до отрезка
function segmentClosestPoint(p, p1, p2) {
    var minDist = vSub(p, p1).mag();
    var closestPoint = p1;

    var dist = vSub(p, p2).mag();
    if (dist < minDist) {
        minDist = dist;
        closestPoint = p2;
    }

    if (vDot(vSub(p, p1), vSub(p2, p1)) >= 0 && vDot(vSub(p, p2), vSub(p1, p2)) >= 0) {
        var A = p2.y - p1.y;
        var B = -(p2.x - p1.x);
        var C = -p1.x * A - p1.y * B;

        var dist = (A * p.x + B * p.y + C) / sqrt(A * A + B * B);
        if (abs(dist) < minDist) {
            minDist = abs(dist);
            closestPoint = vAdd(p, vMult(createVector(A, B).normalize(), -dist));
        }
    }

    return closestPoint;
}

//Точка соприкосновения окружности и отрезка
function sphereSegmentIntersection(p, r, p1, p2) {
    //Вычисление ближайшей точки от центра окружности до отрезка
    var closestPoint = segmentClosestPoint(p, p1, p2);

    //Проверка на соприкосновение отрезка и окружности
    if (vSub(p, closestPoint).mag() < r) {
        return closestPoint;
    }
    else {
        return null;
    }
}
