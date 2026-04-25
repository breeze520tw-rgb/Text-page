let input;
let slider;
let button;
let dropdown;
let radio;
let iframe;
let container;
let isJumping = false; // 控制是否跳動的開關

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 建立中間的 DIV 容器
  container = createDiv('');
  container.position(200, 120); // 將起始 y 座標上移，騰出更多空間
  container.size(windowWidth - 400, windowHeight - 220); // 增加高度（減少上下邊距的總扣除量）
  container.style('border', '1px solid #ccc');
  container.style('overflow', 'hidden');
  
  // 在 DIV 內建立 iframe
  iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.tku.edu.tw');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('border', 'none');
  iframe.parent(container);

  input = createInput('請輸入文字'); // 預設文字
  input.position(20, 20);
  input.size(400, 50); // 增加文字框的寬度至 400px，高度維持 50px
  
  // 建立按鈕：放在文字框右邊
  button = createButton('切換跳動');
  button.position(430, 20);
  button.size(100, 50);
  button.mousePressed(() => isJumping = !isJumping);

  // 建立下拉式選單
  dropdown = createSelect();
  dropdown.position(540, 20);
  dropdown.size(150, 50);
  dropdown.option('淡江大學', 'https://www.tku.edu.tw');
  dropdown.option('p5.js', 'https://p5js.org');
  dropdown.option('Google (Embed)', 'https://www.google.com/search?igu=1');
  dropdown.changed(() => iframe.attribute('src', dropdown.value()));

  // 建立單選鈕
  radio = createRadio();
  radio.position(710, 20);
  radio.option('一般性');
  radio.option('旋轉');
  radio.option('大小');
  radio.selected('一般性');

  // 建立滑桿：最小值 15, 最大值 80, 初始值 30
  slider = createSlider(15, 80, 30);
  slider.position(20, 80); // 將滑桿移到下方
  
  textAlign(LEFT, CENTER); // 讓文字繪製時以 y 軸為中心對齊
}

function draw() {
  background('#f0f8ff'); // 設定背景為接近白色的淡藍色 (AliceBlue)
  let fontSize = slider.value(); // 取得滑桿數值
  textSize(fontSize);

  let txt = input.value();
  let mode = radio.value();

  if (txt.length > 0) {
    let tw = textWidth(txt);
    // 從 y = 100 開始，每一排間隔 50px 產生整排文字
    for (let y = 100; y <= height; y += 50) {
      for (let x = 0; x < width; x += tw) {
        let offsetY = 0;
        if (isJumping) {
          offsetY = sin(frameCount * 0.1 + x * 0.01 + y * 0.02) * 20;
        }

        push();
        translate(x, y + offsetY);

        if (mode === '旋轉') {
          // -90度到90度旋轉 (radians 轉換)
          let angle = map(sin(frameCount * 0.05 + x * 0.01), -1, 1, -PI/2, PI/2);
          rotate(angle);
        } else if (mode === '大小') {
          // 變大30% (1.0 到 1.3)
          let s = 1 + (sin(frameCount * 0.1 + x * 0.05) * 0.5 + 0.5) * 0.3;
          scale(s);
        }

        text(txt, 0, 0);
        pop();
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  container.size(windowWidth - 400, windowHeight - 220);
}
