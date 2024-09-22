class BinaryTree {
  constructor() {
    this.root = null;
  }

  addVal(val) {
    let newNode = new Node(val);
    if (this.root == null) {
      this.root = newNode;
      this.root.x = width / 2;
      this.root.y = 16;
    } else {
      this.root.addNode(newNode);
    }
  }

  preOrder(n) {
    if (n == null) {
      return;
    }

    n.display();
    if (mouseIsPressed) {
      n.select();
    }

    this.preOrder(n.left);
    this.preOrder(n.right);
  }

  async preOrderColor(n) {
    if (n == null) {
      return;
    }

    n.setColor([255, 255, 0]);
    if (mouseIsPressed) {
      n.select();
    }

    await this.sleep(1000);

    // Recursively call for the left and right nodes
    await this.preOrderColor(n.left);
    n.setColor([0, 255, 0]);
    await this.sleep(1500);

    await this.preOrderColor(n.right);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  display() {
    // let current = this.root;
    this.preOrder(this.root);
  }

  colorDisplay() {
    this.preOrderColor(this.root);
  }
}
