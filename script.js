let highestZ = 1;
class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const handleMove = (clientX, clientY) => {
      if (!this.rotating) {
        this.velX = clientX - this.prevTouchX;
        this.velY = clientY - this.prevTouchY;
      }
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevTouchX = clientX;
        this.prevTouchY = clientY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };

    const handleStart = (clientX, clientY) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      this.prevTouchX = clientX;
      this.prevTouchY = clientY;
    };

    paper.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        handleStart(e.clientX, e.clientY);
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    paper.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    });

    const handleEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    document.addEventListener("mousemove", (e) => {
      handleMove(e.clientX, e.clientY);
    });

    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
