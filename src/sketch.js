"use strict";
// import p5 from "./libraries/js";
let ship;
let asteroids = [];
let lasers = [];
// import Ship from "./Ship.js";

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(p5);

  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log("ooopos");
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            let newAsteroids = asteroids[j].breakup();
            // console.log(newAsteroids);
            // console.log(asteroids);
            asteroids = asteroids.concat(newAsteroids);
          } else {
            //increase score
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  ship.render(p5);
  ship.turn();
  ship.update(p5);
  ship.edges(p5);
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == " ") {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
