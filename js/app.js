
var score = 0;
var highScore = 0;
var playerImages = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png"
]

// Used for creating random speed in case of Enemies and Select random image for player so declared out so both objects can use it.
var random = function(lower_limit,upper_limit){
    return Math.floor(Math.random()*(upper_limit-lower_limit+1)+lower_limit);
}

// Enemies our player must avoid
class Enemy  {
  constructor(x,y){
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.maxSpeed = 400;
    this.minSpeed = 100;
    this.speed =  random(this.maxSpeed,this.minSpeed);

  }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  update(dt) {
    this.x = this.x  + this.speed*dt;
    if(this.x > 550){
          this.speed = random(400,100);
          this.x = -50;
      }
    }

  // Draw the enemy on the screen, required method for game
  render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
class Player {
  constructor(x,y){
        this.x = x;
    this.y = y;
        this.sprite =playerImages[random(0,4)];
    }

  // This class requires an update(), render() and
  // a handleInput() method.
  update() {
     for (var i = 0 ; i < allEnemies.length ; i++) {
            if ((this.y === allEnemies[i].y) && (this.x < allEnemies[i].x + 80) && (this.x + 80 > allEnemies[i].x)){
                this .reset();
                score = 0;
            }
        }
        if(highScore < score){
            highScore = score;
        }

        document.getElementById('score').innerHTML = `Score : ${ score }   | High Score :  ${ highScore}`;
  }

  // Draw the player on the screen, required method for game
  render() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   }

  // Key inputs, on detection of key this function moves the player according to the kley pressed.
  handleInput(key) {
    switch(key){
       case 'left':
           if (this.x > 0){
               this.x -= 100;
           }
           break;
       case 'right': 
           if(this.x < 400){
               this.x += 100;
           }
           break;

        case 'up': 
           if (this.y > 40) {
               this.y -= 90;
       }else {
       window.alert("woooooooow !!! play again");
         score += 1;
       this.reset();
          }
          break;
      case 'down':
       if (this.y < 400) {
           this.y += 90;
       
     }
   }
 }

  // Changes the position of the player back to the initial.
  reset() {
       this.x = 200;
       this.y = 400;
   }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(0, 40),
    new Enemy(0, 130),
    new Enemy(0, 220)
];

// Place the player object in a variable called player
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    var allowedKeys = {
      37: 'left', // left  arrow key
      38: 'up',   // up    arrow key
      39: 'right',// right arrow key
      40: 'down', // down  arrow key
      65: 'left', // left  arrow key
      83: 'down', // down  arrow key
      68: 'right',// right arrow key
      87: 'up'    // up    arrow key
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
