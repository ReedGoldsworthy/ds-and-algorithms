class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.x = 100;
    this.y = 25;
    this.size = 50;
    this.stroke = 0;
    this.selected = false;
    this.play = false;
  }

  getNext() {
    return this.next;
  }

  getData() {
    return this.data;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setNext(n) {
    this.next = n;
  }

  setData(data) {
    this.data = data;
  }

  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  display() {
    fill(255);
    stroke(this.stroke);
    rect(this.x, this.y, this.size, this.size);
    fill(0);
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER);
    text(this.data, this.x + this.size / 2, this.y + this.size * 0.6);
    strokeWeight(5);
    stroke(0);
    if (this.x + this.size + 50 < width) {
      line(
        this.x + this.size,
        this.y + this.size * 0.5,
        this.x + this.size + 50,
        this.y + this.size * 0.5
      );
      line(
        this.x + this.size + 35,
        this.y + this.size * 0.25,
        this.x + this.size + 50,
        this.y + this.size * 0.5
      );
      line(
        this.x + this.size + 35,
        this.y + this.size * 0.75,
        this.x + this.size + 50,
        this.y + this.size * 0.5
      );
    } else {
      line(
        this.x + this.size,
        this.y + this.size * 0.5,
        this.x + this.size + 25,
        this.y + this.size * 0.5
      );
      line(
        this.x + this.size + 25,
        this.y + this.size * 0.5,
        this.x + this.size + 25,
        this.y + this.size * 1.25
      );
      line(
        this.x + this.size + 25,
        this.y + this.size * 1.25,
        this.size / 2 + 5,
        this.y + this.size * 1.25
      );
      line(
        this.size / 2 + 5,
        this.y + this.size * 1.25,
        this.size / 2 + 5,
        this.y + this.size * 2
      );
      line(
        this.size / 2 + 5 - this.size * 0.25,
        this.y + this.size * 2 - 15,
        this.size / 2 + 5,
        this.y + this.size * 2
      );
      line(
        this.size / 2 + 5 + this.size * 0.25,
        this.y + this.size * 2 - 15,
        this.size / 2 + 5,
        this.y + this.size * 2
      );
    }
  }

  select() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.size &&
      mouseY > this.y &&
      mouseY < this.y + this.size
    ) {
      if (this.selected == false) {
        this.stroke = "#ff0000";
        this.selected = true;
      } else {
        this.stroke = "#000000";
        this.selected = false;
      }
    }
  }
}
