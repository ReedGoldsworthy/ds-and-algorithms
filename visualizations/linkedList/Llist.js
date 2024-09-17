class Llist {
  constructor() {
    this.front = null;
    this.frontX = 5;
    this.lineY = 100;
    this.y = 25;
    this.size = 0;
  }

  addFront(n) {
    let newNode = new Node(n);
    if (this.front != null) {
      newNode.setNext(this.front);
      this.front = newNode;
    } else {
      newNode.setNext(this.front);
      this.front = newNode;
    }
    this.size++;
    if (this.size > 0) {
      document.getElementById("index").max = this.size;
    }
    this.resize();
  }

  remove() {
    let current = this.front;
    let previous = null;
    while (current.selected == false) {
      previous = current;
      current = current.getNext();
    }
    if (current == this.front) {
      this.front = current.getNext();
    } else {
      previous.setNext(current.getNext());
    }
    this.size--;
    this.resize();
  }

  insert(n, index) {
    let newNode = new Node(n);
    let current = this.front;
    let count = 0;
    while (current != null) {
      if (count == index - 1) {
        newNode.setNext(current.getNext());
        current.setNext(newNode);
        this.size++;
        break;
      } else {
        count++;
        current = current.getNext();
      }
    }
    this.resize();
  }

  resize() {
    let current = this.front;
    let cutoff = width / 100;
    for (let i = 0; i < this.size; i++) {
      let numLines = floor(i / cutoff);
      current.setX(this.frontX + (i % cutoff) * 100);
      current.setY(this.y + this.lineY * numLines);
      current = current.getNext();
    }
  }

  display() {
    let current = this.front;
    for (let i = 0; i < this.size; i++) {
      current.display();
      if (mouseIsPressed) {
        current.select();
      }
      current = current.getNext();
    }
  }
}
