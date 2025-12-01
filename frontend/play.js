const token = localStorage.getItem("token");
if (!token) window.location.href = "index.html";






score = 0;
cross = true;

audio = new Audio('Audio/SoundTrack.mp3');
audioJ= new Audio('Audio/Jump.mp3')
audiogo = new Audio('Audio/Gameover.mp3');
setTimeout(() => {
    audio.play()
}, 700);

document.onkeydown = function (e) {
    console.log("key pressed :", e.key)
    if (e.keyCode == 38 || e.keyCode == 32 || e.keyCode == 87 || e.keyCode == 104) {
        mario = document.querySelector('.mario');
        mario.classList.add('animatemario');
        audioJ.play();
        audioJ.volume = 0.2;
        // setTimeout(() => {
        //     audioJ.pause();
        // }, 1500);
        setTimeout(() => {
            mario.classList.remove('animatemario')
            // audioJ.pause();
        }, 700);
        setTimeout(() => {
            audioJ.pause();
        }, 1500);
    }
    if (e.keyCode == 39 || e.keyCode == 68 || e.keyCode == 102) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = marioX + 30 + "px";
    }
    if (e.keyCode == 37 || e.keyCode == 65 || e.keyCode == 100) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (marioX - 30) + "px";
    }
}

setInterval(() => {
    mario = document.querySelector('.mario');
    gameover = document.querySelector('.gameover');
    obstacle = document.querySelector('.obstacle');
    back = document.querySelector('.ground');
    m = document.querySelector('.mountain');
    c = document.querySelector('.cloud');

    dx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY);
    if (offsetX < 70 && offsetY < 80) {
        gameover.style.visibility = 'visible';
        scoreC.style.visibility = 'hidden';
        obstacle.classList.remove('obstacleani');
        back.classList.remove('groundani');
        m.classList.remove('mountainani');
        c.classList.remove('cloudani');
        mario.style.left = "15vh";
        audiogo.play();
        audio.pause();

        saveHighScore(score);
        presscore.innerHTML = score;
    }
    else if (offsetX < 50 && cross) {
        score += 1;
        updatescore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        // setTimeout(() => {
        //     anidur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        //     newdur = anidur - 0.1;
        //     obstacle.style.animationDuration = newdur + 's';
        // }, 500);

    }

}, 10);

function updatescore(score) {
    scoreC.innerHTML = "Score : " + score
}







async function saveHighScore(score) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("⚠️ No token found, user not logged in.");
    window.location.href = "index.html";
    return;
  }

  if (typeof score !== "number" || score < 0) {
    console.error("Invalid score:", score);
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://mario-4c9y.onrender.com/api/scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ score }),
    });

    const data = await response.json();
    console.log("Save Score Response:", data);

    if (!response.ok) {
      console.error("Failed to save score:", data);
      return;
    }

    console.log(`✅ ${data.msg} → High Score: ${data.highScore}`);
  } catch (err) {
    console.error("Error saving score:", err);
  }

  const highScoreEl = document.getElementById("highScore");

    fetch("https://mario-4c9y.onrender.com/api/auth/me", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Unauthorized");
        }
        return res.json();
    })
    .then(data => {
        highScoreEl.textContent = data.highScore || 0;
    })
    .catch(err => {
        console.error(err);
        alert("Session expired, please login again.");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

}

