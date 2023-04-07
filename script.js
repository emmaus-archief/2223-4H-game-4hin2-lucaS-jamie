/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
var aantal = 0;

const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3
var spelStatus = SPELEN;

// mogelijkheden voor de richting van vijandjes en speler
const LEFT = 0;
const RIGHT = 1;

var spelerX = 100; // x-positie van speler
var spelerY = 640;// y-positie van speler
var spelerGrootteX = 460;
var spelerGrootteY = 460;
var spelerSpeed = 5; // snelheid van speler
var spelerWalking = false; // houdt bij of de speler aan het lopen is
var spelerDirection = RIGHT; // richting van de speler


var vijandX = 600;
var vijandY = 250;

var speler;
var speler_reversed;
var img2;
var img4;
var img6;
var img8;
var img9;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(65)) {
    spelerX = spelerX - spelerSpeed;
    spelerWalking = true;
    spelerDirection = RIGHT
  }
  if (keyIsDown(68)) {
    spelerX = spelerX + spelerSpeed;
    spelerWalking = true;
    spelerDirection = LEFT
  }
  if (keyIsDown(87)) {
    spelerY = spelerY - spelerSpeed;
    spelerWalking = true;
  }
  if (keyIsDown(83)) {
    spelerY = spelerY + spelerSpeed;
    spelerWalking = true;
  }

  if (spelerX < 25) {
    spelerX = 25;
  }
  if (spelerX > 1255) {
    spelerX = 1255;
  }
  if (spelerY < 340) {
    spelerY = 340;
  }
  if (spelerY > 695) {
    spelerY = 695;
  }
  // vijand

  // kogel
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  image(img4, 0, 0, 1280, 720);

  // vijand

  image(img2, vijandX, vijandY, 130, 200)

  // kogel

  // speler
  noSmooth()
  if (spelerDirection === RIGHT && spelerWalking === true) {
    image(speler_reversed, spelerX - 120, spelerY - 200, spelerGrootteX, spelerGrootteY)
  }
  if (spelerDirection === LEFT && spelerWalking === true) {
    image(speler, spelerX - 120, spelerY - 200, spelerGrootteX, spelerGrootteY)
  }
  if (spelerDirection === RIGHT && spelerWalking === false) {
    image(speler_reversed, spelerX - 120, spelerY - 200, spelerGrootteX, spelerGrootteY)
  }
  if (spelerDirection === LEFT && spelerWalking === false) {
    image(speler, spelerX - 120, spelerY - 200, spelerGrootteX, spelerGrootteY)
  }
  smooth()
  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {

  if (spelerX - vijandX < 120 &&
    spelerX - vijandX > 0 &&
    spelerY - vijandY < 340 &&
    spelerY - vijandY > 0) {
    aantal = aantal + 1;
    console.log("aaauuu!!!!!!!!!");
    return true;
  }
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}


function preload() {
  speler = loadImage('images/speler.gif')
  speler_reversed = loadImage('images/speler-reversed.gif')
  img2 = loadImage('images/walker2.gif')
  img4 = loadImage('images/achtergrond.jpg')
  img6 = loadImage('images/gameoversign.gif')
  img8 = loadImage('images/insert-coin.png')
  img9 = loadImage('images/insert-coin-big.png')

}
/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("game over");
    fill('black')
    rect(0, 0, 1280, 720);
    image(img5, 20, 40);
    image(img7, 1000, 40);
    image(img6, 300, 100, 675, 230)
  }


  if (spelStatus === UITLEG) {
    //teken uitleg scherm
    console.log("uitleg");
  }
}

