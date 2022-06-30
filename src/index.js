/// <reference types="vite/client" />

import styles from "./style.css?inline";
import dice_1 from "./imgs/dice_1.png";
import dice_2 from "./imgs/dice_2.png";
import dice_3 from "./imgs/dice_3.png";
import dice_4 from "./imgs/dice_4.png";
import dice_5 from "./imgs/dice_5.png";
import dice_6 from "./imgs/dice_6.png";
import shake_7 from "./imgs/shake.gif";

const dices = [null, dice_1, dice_2, dice_3, dice_4, dice_5, dice_6];

/** @type {import("@netless/window-manager").NetlessApp} */
const App_dice = {
  kind: "Dice",
  // 配置默认窗口大小
  config: {
    minwidth: 0.2,
    minheight: 0.2,
    width: 0.3,
    height: 0.35,
  },
  setup(context) {
    // box 为插件所在的窗口
    const box = context.getBox();
    box.mountStyles(styles);
    // 创建一个 DOM 用来放内容
    const $content = document.createElement("div");
    $content.className = "app-dice";
    box.mountContent($content);

    // 创建并连接上同步服务 storage
    const storage = context.createStorage("App_dice", { src: dice_1 });

    // 骰子图片
    const $img = document.createElement("img");
    $img.className = "dice-img";
    $img.src = storage.state.src;
    $content.appendChild($img);

    $img.onclick = (ev) => {
      shake();
    };

    // 生成指定区间内的随机数
    function rand(min, max) {
      if (min > max) {
        var mid = min;
        min = max;
        max = mid;
      }
      return parseInt(Math.random() * (max - min + 1) + min);
    }

    // 点击事件
    function shake() {
      // 骰子正在转动中，点击不生效
      if (storage.state.src != shake_7) {
        // 保存动态图状态到同步服务
        storage.setState({ src: shake_7 });

        // 随机 1～2 秒后，将动态图替换为随机点数的图片
        var timer = setTimeout(function () {
          // 更新点数图片到状态到同步服务
          storage.setState({ src: dices[rand(1, 6)] });
        }, rand(1000, 2000));
      }
    }

    function refresh() {
      $img.src = storage.state.src;
    }
    //监听到 storage 变化就刷新视图
    const dispose = storage.addStateChangedListener(refresh);
    refresh();

    //关闭插件的时候销毁未使用的侦听器
    context.emitter.on("destroy", () => {
      dispose();
    });
  },
};

export default App_dice;
