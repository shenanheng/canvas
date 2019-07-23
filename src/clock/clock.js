// 整圆的弧度
const WHOLE_CIRCULAR_RADIAN = 2 * Math.PI;
const ONE_RADIAN = Math.PI / 180; // 1度等于多少弧度

/**
 * 时钟的绘制
 *
 */
class Clock extends Canvas {
  /**
   * 构造函数
   * @param {*} id ele所对应的id
   * @memberof Clock
   */
  constructor(id) {
    super(id);
    // 计时器用于时间的停止
    this.timer = null;
    // 初始化数据
    this.init();
  }
  // 初始化数据
  init() {
    // 以短的一边的长度为直径(为了避免宽高不一样)
    this.r =
      this.canvasWidth <= this.canvasHeight
        ? this.canvasWidth / 2
        : this.canvasHeight / 2;
    // 比例值的计算(为了放大与变小)是以200为基准
    this.scale = (this.r * 2) / 200;
  }
  // 开始
  start() {
    this.draw();
    this.timer = setInterval(() => {
      this.draw();
    }, 1000);
  }
  // 停止
  stop() {
    clearInterval(this.timer);
  }
  // 绘制出图形
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawArc(); // 画出外圆
    this.drawTime(); // 画出时间
    this.drawScale(); // 画出刻度盘
    let { hour, minute, second } = this.getNowTime();
    this.drawHour(hour, minute); // 画出时针
    this.drawMinute(minute, second); // 画出分针
    this.drawSecond(second); // 画出秒针
    this.drawCenter(); // 画出圆心
    this.ctx.restore();
  }
  getNowTime() {
    let date = new Date();
    return {
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    };
  }
  // 画出时钟的外圆
  drawArc() {
    // 保存画布最初的环境
    this.ctx.save();
    // 以canvas中心点作为坐标原点
    this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    this.ctx.beginPath();
    // 线圈的宽度,默认为
    this.ctx.lineWidth = 10 * this.scale;
    this.ctx.arc(
      0,
      0,
      this.r - this.ctx.lineWidth / 2,
      0,
      WHOLE_CIRCULAR_RADIAN
    );
    this.ctx.stroke();
  }
  // 画出时钟的整数值
  drawTime() {
    this.ctx.font = `${18 * this.scale}px bold`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2].forEach((item, i) => {
      let x = (this.r - 30 * this.scale) * Math.cos(ONE_RADIAN * i * 30);
      let y = (this.r - 30 * this.scale) * Math.sin(ONE_RADIAN * i * 30);
      this.ctx.fillText(item, x, y);
    });
  }
  // 画出刻度
  drawScale() {
    for (let i = 0; i < 60; i += 1) {
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      let x = (this.r - 18 * this.scale) * Math.cos(ONE_RADIAN * i * 6);
      let y = (this.r - 18 * this.scale) * Math.sin(ONE_RADIAN * i * 6);
      if (i % 5 !== 0) {
        this.ctx.fillStyle = "#ccc";
      } else {
        this.ctx.fillStyle = "#000";
      }
      this.ctx.arc(x, y, 2 * this.scale, 0, WHOLE_CIRCULAR_RADIAN);
      this.ctx.fill();
    }
  }
  // 画出时针
  drawHour(hour, minute) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 6 * this.scale;
    this.ctx.lineCap = "round";
    // 为何选择再上面
    this.ctx.rotate(ONE_RADIAN * 30 * hour + (ONE_RADIAN * 6 * minute) / 12);
    this.ctx.moveTo(0, 10 * this.scale);
    this.ctx.lineTo(0, -this.r / 2);
    this.ctx.stroke();
    this.ctx.restore();
  }
  //分针
  drawMinute(minute, second) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 3 * this.scale;
    this.ctx.lineCap = "round";
    this.ctx.rotate(ONE_RADIAN * 6 * minute + (ONE_RADIAN * 6 * second) / 60);
    this.ctx.moveTo(0, 10* this.scale);
    this.ctx.lineTo(0, -this.r + 30* this.scale);
    this.ctx.stroke();
    this.ctx.restore();
  }
  //秒针
  drawSecond(second) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 5 * this.scale;
    this.ctx.fillStyle = "red";
    this.ctx.rotate(ONE_RADIAN * 6 * second);
    this.ctx.moveTo(-2, 20 * this.scale);
    this.ctx.lineTo(2, 20 * this.scale);
    this.ctx.lineTo(1, -this.r + 18 * this.scale);
    this.ctx.lineTo(1, -this.r + 18 * this.scale);
    this.ctx.fill();
    this.ctx.restore();
  }
  // 画圆心
  drawCenter() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#fff";
    this.ctx.arc(0, 0, 6, 0, WHOLE_CIRCULAR_RADIAN);
    this.ctx.fill();
  }
}
