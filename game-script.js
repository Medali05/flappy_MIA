 const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    const MIAImg = new Image();
    const bgImg = new Image();
    const pipeUp = new Image();
    const pipeDown = new Image();
    const ground1 = new Image();
    const ground2 = new Image();
    const cloud1 = new Image();
    const cloud2 = new Image();

    MIAImg.src = "FlyingMia.png";
    pipeUp.src = "pipeUp.png";
    pipeDown.src = "pipeDown.png";
    cloud1.src = "cloud1.png";
    cloud2.src = "cloud2.png"
    ground1.src = "ground1.png"
    ground2.src = "ground2.png"

    const MIA = {
      x: 80,
      y: 150,
      width: 30,
      height: 30,
      gravity: 0.6,
      lift: -10,
      velocity: 0
    };

    const pipes = [];
    const pipeWidth = 60;
    const pipeGap = 150;
    let frame = 0;
    let score = 0;
    let gameOver = false;

    // Contrôle (espace ou toute touche)
    document.addEventListener("keydown", () => {
      if (!gameOver) {
        MIA.velocity = MIA.lift;
      } else {
        location.reload(); // redémarre le jeu
      }
    });

    function drawMIA() {
      ctx.drawImage(MIAImg, MIA.x, MIA.y, MIA.width, MIA.height);
    }

    function drawPipe(pipe) {
    
      ctx.drawImage(pipeUp, pipe.x +20 , 20 , pipeWidth , pipe.top);
      ctx.drawImage(pipeDown, pipe.x +20  , pipe.bottom +20, pipeWidth, canvas.height - pipe.bottom);
    }
    
    function drawground(){
      ctx.drawImage(ground1, 0, canvas.height - 40, canvas.width, 40);
      ctx.drawImage(ground2, 50, canvas.height - 40, canvas.width, 40);
    }
function drawclouds(){

}

    function update() {
      if (gameOver) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mise à jour de MIA
      MIA.velocity += MIA.gravity;
      MIA.y += MIA.velocity;
      drawMIA();

      // Ajouter des pipes
      if (frame % 100 === 0) {
        const top = Math.random() * 250 + 20;
        pipes.push({
          x: canvas.width,
          top: top,
          bottom: top + pipeGap,
          scored: false
        });
      }

      // Mise à jour des pipes
      for (let i = pipes.length - 1; i >= 0; i--) {
        const p = pipes[i];
        p.x -= 2;
        drawPipe(p);
        drawground();

        // Collision
        if (
          MIA.x < p.x + pipeWidth &&
          MIA.x + MIA.width > p.x &&
          (MIA.y < p.top || MIA.y + MIA.height > p.bottom)
        ) {
          gameOver = true;
        }

        // Score
        if (!p.scored && p.x + pipeWidth < MIA.x) {
          score++;
          p.scored = true;
        }

        // Retirer les pipes sortis de l'écran
        if (p.x + pipeWidth < 0) {
          pipes.splice(i, 1);
        }
      }

      // Collision avec le sol ou le haut de MIA
      if (MIA.y + MIA.height > canvas.height || MIA.y < 0) {
        gameOver = true;
      }

      // Affichage du score
      ctx.fillStyle = "blue";
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, 10, 30);

      // Fin de jeu
      if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "40px sans-serif";
        ctx.fillText("Game Over!", 90, canvas.height / 2 - 20);
        ctx.fillText("votre score est :" +score ,60 ,canvas.height / 2 - 60);
      } else {
        frame++;
        requestAnimationFrame(update);
      }
    }

    // Lancer le jeu quand les images sont chargées
     window.onload = () => {
    update();
      };