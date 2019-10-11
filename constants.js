//Константы
var GRAVITY = 1; //Ускорение свободного падения
var NET_VISCOSITY = 0.4; //Вязкость сетки
var WALL_VISCOSITY = 0.8; //Вязкость стен
var BALL_R = 0.055; //Радиус мяча
var MOVE_SPEED = 0.6; //Скорость перемещения игрока
var JUMP_HEIGHT = 0.2239; //Высота прыжка игрока
var JUMP_SPEED = Math.sqrt(2 * JUMP_HEIGHT * GRAVITY); //Скорость прыжка игрока в момент отталкивания

var STAR_START_SPEED = 0; //Начальная скорость движения звезд
var STAR_MAX_SPEED = 1000; //Максимальная скорость движения звезд
var STAR_MAX_TIME = 100 * 1000; //Время, за которое звезды приобретают максимальную скорость
var STAR_COUNT = 200; //Количество звезд
