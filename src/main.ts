import "./style.css";
import P5 from "p5";

new P5(sketch);
function sketch(p: P5) {
  const a = 20;
  const b = 28;
  const c = 8 / 3;
  let dt = 0.008;
  let x = 0.1;
  let y = 0.2;
  let z = 0.3;
  let dx;
  let dy;
  let dz;
  let px;
  let py;
  let pz;
  const hueStart = 90;
  const hueEnd = 255;
  let hue = hueStart;
  let hueDirection: "increase" | "decrease" = "increase";

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    p.background(0);
  };

  /*
   *          x
   *          |
   *          |
   *          |
   * z --------
   */
  p.draw = () => {
    dx = a * (y - x) * dt;
    dy = (x * (b - z) - y) * dt;
    dz = (x * y - c * z) * dt;

    px = x;
    py = y;
    pz = z;
    x += dx;
    y += dy;
    z += dz;

    p.rotateX(p.HALF_PI);
    p.rotateY(-p.HALF_PI);
    p.colorMode("hsb");
    p.stroke(hue, 255, 255);
    p.scale(7);
    p.line(px, py, pz, x, y, z);
    p.line(px, py, -pz, x, y, -z);

    if (hueDirection === "increase") {
      hue += 0.3;

      if (hue >= hueEnd) {
        hueDirection = "decrease";
      }
    } else {
      hue -= 0.3;

      if (hue <= hueStart) {
        hueDirection = "increase";
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    x = 0.1;
    y = 0.2;
    z = 0.3;
  };
}
