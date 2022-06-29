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
  config: {
    minwidth: 0.2,
    minheight: 0.2,
    width: 0.3,
    height: 0.35,
  },
  setup(context) {
    const box = context.getBox();
    box.mountStyles(styles);

    const $content = document.createElement("div");
    $content.className = "app-dice";
    box.mountContent($content);

    const storage = context.storage;
    storage.ensureState({
      src: dice_1,
    });

    const $img = document.createElement("img");
    $img.className = "dice-img";
    $img.src = storage.state.src;
    $content.appendChild($img);

    $img.onclick = (ev) => {
      shake();
    };

    // 生成随机数
    function rand(min, max) {
      if (min > max) {
        var mid = min;
        min = max;
        max = mid;
      }
      return parseInt(Math.random() * (max - min + 1) + min);
    }

    //点击事件
    function shake() {
      if (storage.state.src != shake_7) {
        //若不在转动中，则执行下边的内容
        storage.setState({ src: shake_7 });

        //随机 1～3 秒后，将动态图替换为随机点数的图片
        var timer = setTimeout(function () {
          storage.setState({ src: dices[rand(1, 6)] });
        }, rand(1000, 2000));
      }
    }

    //监听到 storage 变化就刷新视图
    function refresh() {
      $img.src = storage.state.src;
    }
    const dispose = storage.addStateChangedListener(refresh);
    refresh();

    context.emitter.on("destroy", () => {
      dispose();
    });
  },
};

export default App_dice;
