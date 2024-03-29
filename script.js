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
var startTime;
var timerInterval; // interval ID for the timer

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

var kogelSnelheid = 10;
var kogelX = 0;
var kogelY = 0;
var kogelGrootteX = 20;
var kogelGrootteY = 20;
var kogelRichtingX = 0;
var kogelRichtingY = 0;
var isSchietend = false;
var isSpatieIngedrukt = false;

var speler;
var speler_reversed;
var speler_walk;
var speler_walk_reversed;
var speler_shoot;
var speler_shoot_reversed;
var vijand1;
var vijand1reversed;
var img4;
var img6;
var retrybuttonhover;
var retrybutton;
var kogel;

var timerValue = 0;
var score = 0;        // verstreken tijd in seconden
var highscore = 0;

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
  if (isSchietend) {
    var stapX = kogelRichtingX / sqrt(kogelRichtingX * kogelRichtingX + kogelRichtingY * kogelRichtingY) * kogelSnelheid;
    var stapY = kogelRichtingY / sqrt(kogelRichtingX * kogelRichtingX + kogelRichtingY * kogelRichtingY) * kogelSnelheid;

    kogelX += stapX;
    kogelY += stapY;

    // Controleer of de kogel de vijand raakt
    if (dist(kogelX, kogelY, vijandX, vijandY) < vijandGrootteX / 2) {
      // Kogel raakt de vijand, voeg hier je acties toe
      score++;
      console.log("Score: " + score);
      isSchietend = false; // Zet isSchietend op false om te stoppen met vliegen
    }
  }


  
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand

  // botsing kogel tegen vijand

  // Kogel raakt de vijand, voeg hier je acties toe


  // update punten en health
if (score > highscore) {
  highscore = score;
}
  
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

    // HP-balk van vijand
  var hpBalkBreedte = 100; // breedte van de HP-balk
  var hpBalkHoogte = 10; // hoogte van de HP-balk
  var hpPercentage = 100; // HP-percentage van de vijand (moet worden aangepast)

  var hpBalkX = vijandX - hpBalkBreedte / 2; // x-positie van de HP-balk
  var hpBalkY = vijandY - vijandGrootteY / 2 - hpBalkHoogte - 10; // y-positie van de HP-balk

  // teken de HP-balk
  noFill();
  strokeWeight(1);
  stroke('white');
  rect(hpBalkX, hpBalkY, hpBalkBreedte, hpBalkHoogte);

  // teken de gevulde HP-balk op basis van het HP-percentage
  fill('red');
  rect(hpBalkX, hpBalkY, hpBalkBreedte * (hpPercentage / 100), hpBalkHoogte);

  // kogel
  if (isSchietend) {
    image(kogel, kogelX, kogelY, kogelGrootteX, kogelGrootteY);
  }
  
  // kogel
if (isSchietend) {
  image(kogel, kogelX, kogelY, kogelGrootteX, kogelGrootteY);
}
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
  textSize(24);
  fill('white');
  text("Time: " + timerValue + "s", 20, 50);

  textSize(24);
  fill('white');
  text("Score: " + score, 20, 80);
  

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
  speler_shoot = loadImage('images/speler-shoot-2.gif')
  speler_shoot_reversed = loadImage('images/speler-shoot-2-reversed.gif')
  vijand1 = loadImage('images/walker2.gif')
  vijand1reversed = loadImage('images/walker2reversed.gif')
  img4 = loadImage('images/achtergrond.jpg')
  img6 = loadImage('images/gameoversign.png')
  retrybuttonhover = loadImage('images/retryhover.png')
  retrybutton = loadImage('images/retry.png')
  kogel = loadImage('images/kogel.gif')

}
/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function mousePressed() {
  if (!isSchietend) {
    isSchietend = true;
    kogelRichtingX = mouseX - spelerX;
    kogelRichtingY = mouseY - spelerY;
    kogelX = spelerX;
    kogelY = spelerY;
  }
}

function mouseReleased() {
  if (isSchietend) {
    isSchietend = false;
  }
}


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

      if (timerInterval) {
      clearInterval(timerInterval); // Stop the timer interval
      timerInterval = null; // Reset the interval ID
    }

    console.log("game over");
    fill('black')
    rect(0, 0, 1280, 720);
    
    image(img6, 300, 50, 675, 250)
    image(retrybutton, 470, 360, 350, 200)
    
    fill('white');
    textSize(40);
    text("Time: " + timerValue + " seconds", 500, 590);// Adjust the position as needed

    fill('white');
    textSize(40);
    text("Time: " + timerValue + " seconds", 500, 590); // Aanpassen indien nodig
    text("Score: " + score, 500, 640); // Voeg deze regel toe

    textSize(24);
    fill('white');
    text("Highscore: " + highscore, 20, 110);
    
    if(mouseX > 530 && mouseX < 745 && mouseY > 415 && mouseY < 500){
            image(retrybuttonhover, 465, 355, 360, 210);
            if(mouseIsPressed === true){
              spelerX = 100;
              spelerY = 300;
              vijandX = 600;
              vijandY = 450;
              spelStatus = SPELEN
              timerValue = 0;
              score = 0;
              clearInterval(timerInterval);
              timerInterval = setInterval(updateTimer, 1000);
            }
        }
  }

  if (spelStatus === UITLEG) {
    //teken uitleg scherm
    console.log("uitleg");
  }
}

function updateTimer() {
  timerValue++;
}

// start de timer bij het begin van het spel

var timerInterval = setInterval(updateTimer, 1000);


