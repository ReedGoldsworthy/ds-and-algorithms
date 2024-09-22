class Node {
  constructor(data, x, y) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.level = 6;
    this.color = [255, 255, 255];

    this.x = x;
    this.y = y;
    this.size = 50;
    this.stroke = 0;
    this.selected = false;
    this.play = false;
  }

  addNode(n) {
    n.level = n.level - 1.5;
    if (n.level < 0) {
      n.level = 1;
    }
    if (n.data < this.data) {
      if (this.left) {
        this.left.addNode(n);
      } else {
        this.left = n;
        this.left.x = this.x - n.level * 50;
        this.left.y = this.y + 50;
      }
    } else {
      if (this.right) {
        this.right.addNode(n);
      } else {
        this.right = n;
        this.right.x = this.x + n.level * 50;
        this.right.y = this.y + 50;
      }
    }
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

  setColor(color) {
    this.color = color;
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
    fill(this.color);
    stroke(this.stroke);
    rect(this.x, this.y, this.size, this.size);
    fill(0);
    strokeWeight(1);
    textSize(30);
    textAlign(CENTER);
    text(this.data, this.x + this.size / 2, this.y + this.size * 0.6);
    strokeWeight(5);
    stroke(0);
    if (this.left) {
      // Line going left and down
      line(
        this.x + this.size * 0.5, // Start from the middle horizontally
        this.y + this.size, // Start from the bottom of the node
        this.x - this.level * 30, // Going left
        this.y + this.size + 50 // Going down
      );
    }
    if (this.right) {
      // Line going right and down
      line(
        this.x + this.size * 0.5, // Start from the middle horizontally
        this.y + this.size, // Start from the bottom of the node
        this.x + this.level * 35, // Going right
        this.y + this.size + 50 // Going down
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
