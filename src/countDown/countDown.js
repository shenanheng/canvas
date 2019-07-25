class CountDown extends Canvas {
  constructor(id, data) {
    super(id, data);
    // 比例值的计算(为了放大与变小)是以1000为基准
    this.scale = this.canvasWidth / 1000;
    // 点阵图的集合
    this.lattice = data;
    // 点阵图一行有10个
    this.latticeLength = 10;
    // 倒计时小球球的半径
    this.r = 6;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawTime(); // 画倒计时的时钟
    // this.ctx.restore();
  }
  start() {
    this.draw();
    setInterval(() => {
      this.draw();
    }, 1000);
  }
  // 画出倒计时的时间
  drawTime() {
    // this.ctx.save();
    let hms = moment().format("h:mm:ss");
    console.log(hms)
    hms.split("").forEach((item, i) => {
      this.drawNum(item, 2 * this.r * this.latticeLength * i);
    });
  }
  // 画出相应的类型的点证图
  drawNum(num, space) {
    // 对应数字点阵值
    let value = this.lattice[num];
    this.ctx.fillStyle = "red";
    value.forEach((item, i) => {
      item.forEach((one, j) => {
        let x = 2 * (this.r+1) * j + space;
        let y = 2 * (this.r+1) * i;
        if (one) {
          this.ctx.beginPath();
          this.ctx.arc(x, y, this.r, 0, WHOLE_CIRCULAR_RADIAN);
          this.ctx.fill();
        }
      });
    });
  }
}
