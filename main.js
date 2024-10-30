// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 生成随机颜色值的函数

function randomColor() {
  const color = 'rgb(' +
                random(0, 255) + ',' +
                random(0, 255) + ',' +
                random(0, 255) + ')';
  return color;
}

// 定义 Ball 构造器

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// 定义彩球绘制函数

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 定义彩球更新函数

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 定义一个数组，生成并保存所有的球

let balls = [];

while(balls.length < 25) {
  const size = random(10,20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
  );
  balls.push(ball);
}

// 定义一个循环来不停地播放

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
// 定义恶魔圈对象
function DemonCircle(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}

// 绘制恶魔圈
DemonCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 5;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

// 检测球是否与恶魔圈相交
DemonCircle.prototype.checkCollision = function(ball) {
  const dx = this.x - ball.x;
  const dy = this.y - ball.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance < this.size + ball.size;
};

// 创建恶魔圈实例
const demonCircle = new DemonCircle(width / 2, height / 2, 10);

// 在动画循环中绘制恶魔圈并检测碰撞
function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  // 绘制恶魔圈
  demonCircle.draw(30, 300, 50);
  // 修改恶魔圈的位置
demonCircle.x = 1200; // 将x坐标改为300
demonCircle.y = 250; // 将y坐标改为250

  // 更新并检测每个球的碰撞
  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();

    // 检测球是否与恶魔圈相交
    if(demonCircle.checkCollision(balls[i])) {
      balls.splice(i, 1); // 从数组中移除球
      i--; // 调整索引以防止跳过下一个球
    }
  }
// 获取显示球数量的文本元素
const ballCountText = document.getElementById('ball-count');

// 在动画循环中更新显示球数量的文本位置
function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);

    // 绘制恶魔圈
    demonCircle.draw();

    // 更新并检测每个球的碰撞
    for(let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();

        // 检测球是否与恶魔圈相交
        if(demonCircle.checkCollision(balls[i])) {
            balls.splice(i, 1); // 从数组中移除球
            i--; // 调整索引以防止跳过下一个球
        }
    }

    // 更新显示球数量的文本位置
    ballCountText.style.top = (demonCircle.y - demonCircle.size - 10) + 'px'; // 恶魔圈顶部上方10像素
    ballCountText.style.left = (demonCircle.x + demonCircle.size + 10) + 'px'; // 恶魔圈右侧10像素

    // 更新显示球数量的文本
    ballCountText.textContent = '剩余小球数量: ' + balls.length;

    requestAnimationFrame(loop);
}
// 调用动画循环函数
  requestAnimationFrame(loop);
}

loop();

  requestAnimationFrame(loop);
}

loop();
