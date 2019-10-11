var x1 = 100;
var y1 = 100;
var x2 = 500;
var y2 = 375;

var x = 200;
var y = 479;

var A = y2 - y1;
var B = x1 - x2;
var C = -x1 * A - y1 * B;

var n = createVector(A, B).normalize();
line(x1, y1, x1 + n.x * 20, y1 + n.y * 20);

var len = (A * x + B * y + C) / sqrt(A * A + B * B);
line(x, y, x - n.x * len, y - n.y * len);

line(x1, y1, x2, y2);
ellipse(x, y, 10, 10);












background(255, 255, 255);

var pos = createVector(mouseX, mouseY);
var r = 100;
ellipse(pos.x, pos.y, 2 * r, 2 * r);

var p1 = createVector(100, 100);
var p2 = createVector(500, 375);
line(p1.x, p1.y, p2.x, p2.y);

var closestPoint = sphereSegmentIntersection(pos, r, p1, p2);
console.log(closestPoint, closestPoint == null);
if (closestPoint != null) {
    line(pos.x, pos.y, closestPoint.x, closestPoint.y);
    console.log(closestPoint);
    var nPos = vAdd(closestPoint, vMult(vSub(pos, closestPoint).normalize(), r));
    ellipse(nPos.x, nPos.y, 2 * r, 2 * r);
}
