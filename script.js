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
var spelerY = 300;// y-positie van speler
var spelerGrootteX = 240;
var spelerGrootteY = 240;
var spelerSpeed = 4; // snelheid van speler
var spelerWalking = false; // houdt bij of de speler aan het lopen is
var spelerDirection = RIGHT; // richting van de speler

var vijandX = 600;
var vijandY = 450;
var vijandGrootteX = 150;
var vijandGrootteY = 230;

var speler;
var speler_reversed;
var speler_walk;
var speler_walk_reversed;
var vijand1;
var vijand1reversed;
var img4;
var img6;
var retrybuttonhover;
var retrybutton;
/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  spelerWalking = false //walk is standaard false
  
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

  if (spelerX < 55) {
    spelerX = 55;
  }
  if (spelerX > 1240) {
    spelerX = 1240;
  }
  if (spelerY < 260) {
    spelerY = 260;
  }
  if (spelerY > 590) {
    spelerY = 590;
  }
  // vijand 
  if (spelerX < vijandX) {
    vijandX = vijandX - 1;
  }
  if (spelerX > vijandX) {
    vijandX = vijandX + 1;
  }
  if (spelerY < vijandY) {
    vijandY = vijandY - 1;
  }
  if (spelerY > vijandY) {
    vijandY = vijandY + 1;
  }
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
  var vijandToUse = vijand1;

if (spelerX < vijandX) {
   vijandToUse = vijand1reversed;
  }
  if (spelerX > vijandX) {
    vijandToUse = vijand1;
  }
  
noSmooth()
  image (vijandToUse, vijandX - 0.5 * vijandGrootteX, vijandY - 0.5 * vijandGrootteY, vijandGrootteX, vijandGrootteY)
smooth()
  // kogel

  // speler
  var imageToUse = speler;
  
  if (spelerDirection === RIGHT && spelerWalking === false) {
    imageToUse = speler;
  }
  if (spelerDirection === LEFT && spelerWalking === false) {
    imageToUse = speler_reversed;
  }
  if (spelerDirection === RIGHT && spelerWalking === true) {
    imageToUse = speler_walk;
  }
  if (spelerDirection === LEFT && spelerWalking === true) {
    imageToUse = speler_walk_reversed;
  }
  

  noSmooth()
  image(imageToUse, spelerX - 0.5 * spelerGrootteX, spelerY - 0.5 * spelerGrootteY, spelerGrootteX, spelerGrootteY)
  smooth()

  // coördinaat afdrukken
  stroke('white')
  fill ('white')
  text("("+spelerX + ", "+ spelerY +")", spelerX, spelerY)
  noStroke()

  stroke('white')
  fill ('white')
  text("("+vijandX + ", "+ vijandY +")", vijandX, vijandY)
  noStroke()

  stroke('white')
  fill ('white')
  textSize (20)
  text("("+mouseX + ", "+ mouseY +")", mouseX, mouseY)
  noStroke()
  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function() {

  if (spelerX - vijandX < 80 &&
    spelerX - vijandX > -50 &&
    spelerY - vijandY < 45 &&
    spelerY - vijandY > -120) {
    aantal = aantal + 1;
    console.log("aaauuu!!!!!!!!!");
    return true;
  }
  return false;
  // check of HP 0 is , of tijd op is, of ...
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
  speler_walk = loadImage('images/speler-walk.gif')
  speler_walk_reversed = loadImage('images/speler-walk-reversed.gif')
  vijand1 = loadImage('images/walker2.gif')
  vijand1reversed = loadImage('images/walker2reversed.gif')
  img4 = loadImage('images/achtergrond.jpg')
  img6 = loadImage('images/gameoversign.gif')
  retrybuttonhover = loadImage('images/retryhover.png')
  retrybutton = loadImage('images/retry.png')

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
    image(img6, 300, 100, 675, 200)
    image(retrybutton, 470, 360, 350, 200)
    
    if(mouseX > 530 && mouseX < 745 && mouseY > 415 && mouseY < 500){
            image(retrybuttonhover, 465, 355, 360, 210);
            if(mouseIsPressed === true){
              spelerX = 100;
              spelerY = 300;
              vijandX = 600;
              vijandY = 450;
              spelStatus = SPELEN
            }
        }
  }


  if (spelStatus === UITLEG) {
    //teken uitleg scherm
    console.log("uitleg");
  }
}

