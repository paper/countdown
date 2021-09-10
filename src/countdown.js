function noop() {
  // do nothing...
}

function countTime(fn = noop) {
  const t1 = Date.now();

  fn();

  const t2 = Date.now();
}

/**
 * 倒计时类
 *
 * @param {object} options - 配置
 * @param {number} [options.from] 开始的数字，默认：10
 * @param {number} [options.to] 结束的数字，默认：0
 * @param {number} [options.interval] 倒计时时间间隔（单位ms），默认 1000
 * @param {number} [options.step] 倒计时步长，默认 1
 * @param {boolean} [options.fix] 是否修正，默认 true
 */
function Countdown({
  from = 10,
  to = 0,
  interval = 1000,
  step = 1,
  fix = true,
} = {}) {
  this.from = from;
  this.i = from;
  this.to = to;

  this.interval = interval;
  this.step = step;
  this.fix = fix;

  this.countIndex = 1;
}

// TODO： 运行时的时间可能有误因为在间隔期间，可能其他的服务也占据了耗时
Countdown.prototype.start = function ({ callback = noop } = {}) {
  const t0 = Date.now();

  // 立马运行一次
  callback(this.i, this.from);

  const t1 = Date.now();

  const letsgo = (interval) => {
    setTimeout(() => {
      const t2 = Date.now();

      this.i -= this.step;

      if (this.i < this.to) {
        return;
      }

      // 建议运行时间不要超过 this.interval
      callback(this.i, this.from);

      const t3 = Date.now();

      console.log("====================================");
      console.log(
        `当前时间差是：${t3 - t0}ms，本来应该是 ${
          this.countIndex * this.interval
        }ms，共延迟了${t3 - t0 - this.countIndex * this.interval}ms`
      );

      const deviation = t3 - t2;
      const nextInterval = this.interval - deviation;

      console.log(
        `第${this.countIndex}次：当前误差${deviation}ms, 所以下一次的间隔时间是：${nextInterval}ms`
      );
      this.countIndex++;

      // 修正，如果触发修正，当运行时稍微长且不确定时，数字跳动可能出现快慢的“抖动”，但最终的数字结束会比较准确
      if (this.fix) {
        letsgo(nextInterval);
      } else {
        // 不修正，数字跳动到结尾时，大概率会比实际预期的要“晚”。
        letsgo(this.interval);
      }
    }, interval);
  };

  letsgo(this.interval - (t1 - t0));
};

Countdown.prototype.stop = function () {};

Countdown.prototype.pause = function () {};

Countdown.prototype.goon = function () {};

Countdown.prototype.reset = function () {};

export default Countdown;
