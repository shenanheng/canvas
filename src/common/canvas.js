class Canvas {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = this.ctx.canvas.width;
    this.canvasHeight = this.ctx.canvas.height;
  }
}
