class Llist {
  constructor() {
    this.front = null;
    this.tail = null;
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
      this.tail = newNode;
    }
    this.size++;
    if (this.size > 0) {
      // document.getElementById("index").max = this.size;
    }
    this.resize();
  }

  remove() {
    // Check if the list is empty or has only one node
    if (!this.front) {
      console.log("List is empty, nothing to remove");
      return;
    }

    if (!this.front.getNext()) {
      // If there's only one element, remove it and set both front and tail to null
      this.front = null;
      this.tail = null;
      console.log("Removed the last element, list is now empty");
      this.size = 0;
      this.resize();
      return;
    }

    // Start with the front node
    let newTail = this.front;
    let curr = this.front.getNext();

    // Traverse the list until we find the second-to-last node
    while (curr.getNext()) {
      newTail = curr;
      curr = curr.getNext();
    }

    // Update the tail to the second-to-last node
    this.tail = newTail;
    this.tail.setNext(null); // Ensure the new tail points to null
    console.log("New tail is", this.tail.data);

    // Decrease the size of the list
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
      if (current == this.tail) {
        current.displayTop();
      }
      if (mouseIsPressed) {
        current.select();
      }
      current = current.getNext();
    }
  }
}
