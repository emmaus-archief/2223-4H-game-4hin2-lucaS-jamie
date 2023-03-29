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
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

// mogelijkheden voor de richting van vijandjes en speler
const LEFT = 0;
const RIGHT = 1;

var spelerX = 100; // x-positie van speler
var spelerY = 640; // y-positie van speler
var spelerSpeed = 5; // snelheid van speler
var spelerWalking = false; // houdt bij of de speler aan het lopen is
var spelerDirection = RIGHT; // richting van de speler


var vijandX = 600;
var vijandY = 250;

var img;
var img2;
var img3;
var img4;
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
  if (spelerY < 250) {
    spelerY = 250;
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
if (spelerX - vijandX < 120 &&
      spelerX - vijandX >0 &&
      spelerY - vijandY < 340 &&
      spelerY - vijandY > 0) {
      console.log("aaauuu!!!!!!!!!");
  }
  // botsing kogel tegen vijand

  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  image (img4, 0, 0, 1280, 720);
  
  // vijand
  
image (img2, vijandX, vijandY, 130, 200)
  
  // kogel

  // speler
  
  if(spelerDirection === RIGHT && spelerWalking === true){
    image (img3, spelerX - 120, spelerY - 200)
  }  
  if(spelerDirection === LEFT && spelerWalking === true){
    image (img, spelerX - 120, spelerY - 200)
  }
  if(spelerDirection === RIGHT && spelerWalking === false){
    image (img3, spelerX - 120, spelerY - 200)
  }  
  if(spelerDirection === LEFT && spelerWalking === false){
    image (img, spelerX - 120, spelerY - 200)
  }
  
  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {
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
  img = loadImage ('images/speler.gif')
  img2 = loadImage ('images/walker2.gif')
  img3 = loadImage ('images/speler1reversed.gif')
  img4 = loadImage ('images/achtergrond.jpg')
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

  }
}

