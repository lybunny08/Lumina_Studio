import { Texture } from "three";

export class CursorTexture {
  constructor(options) {
    this.$el = options.el;
    this.debug = options.debug;
    this.sizeMultiplier = options.sizeMultiplier || 0.1;
    this.radiusMultiplier = options.radiusMultiplier || 1;

    // Options
    this.size = 100;
    this.points = [];
    this.radius = this.size * this.sizeMultiplier;
    this.width = this.size;
    this.height = this.size;
    this.maxAge = 50;

    if (this.debug) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.radius = this.width * 0.1;
    }

    this.initTexture();

    if (this.debug) {
      this.$el
        ? this.$el.append(this.canvas)
        : document.body.append(this.canvas);
    }
  }

  initTexture() {
    this.canvas = document.createElement("canvas");

    if (this.$el && this.debug) {
      this.canvas.classList.add("cursor-texture");

      const r = this.$el.getBoundingClientRect();

      this.canvas.width = r.width;
      this.canvas.height = r.height;
    } else {
      this.canvas.id = "cursor-texture";
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    this.ctx = this.canvas.getContext("2d", { alpha: false });

    this.texture = new Texture(this.canvas);

    this.clear();
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addPoint(point) {
    let vx = 0;
    let vy = 0;
    let force = 0;
    const last = this.last;

    if (last) {
      const relativeX = point.x - last.x;
      const relativeY = point.y - last.y;

      // Distance formula
      const distanceSquared = relativeX * relativeX + relativeY * relativeY;
      const distance = Math.sqrt(distanceSquared);

      // Calculate Unit Vector
      vx = relativeX / distance;
      vy = relativeY / distance;

      force = Math.min(distanceSquared * 10000, 1);
    }

    this.last = {
      x: point.x,
      y: point.y,
    };

    this.points.push({
      x: point.x,
      y: point.y,
      vx,
      vy,
      force,
      age: 0,
    });
  }
  easeOutSine(t, b, c, d) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  }

  easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  }

  drawPoint(point) {
    // Convert normalized position into canvas coordinates
    const pos = {
      x: point.x * this.width,
      y: point.y * this.height,
    };

    const radius = this.radius;
    const ctx = this.ctx;

    let intensity = 1;

    // intensity = 1 - point.age / this.maxAge;

    if (point.age < this.maxAge * 0.3) {
      intensity = this.easeOutSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = this.easeOutQuad(
        1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7),
        0,
        1,
        1
      );
    }

    intensity *= point.force;

    console.log(intensity);

    const red = ((point.vx + 1) / 2) * 255;
    const green = ((point.vy + 1) / 2) * 255;

    // B = Unit vector
    const blue = intensity * 255;
    const color = `${red}, ${green}, ${blue}`;
    // const color = "255,255,255";

    const offset = this.width * 5;

    // 1. Give the shadow a high offset
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius * this.radiusMultiplier;
    ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";

    // 2. Move the circle to the other direction of the offset
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update() {
    this.clear();
    let agePart = 1 / this.maxAge;

    if (this.points.length > 0) {
      this.points.forEach((point, i) => {
        let slowAsOlder = 1 - point.age / this.maxAge;
        // let force = point.force * agePart * slowAsOlder;

        point.age += 1;

        if (point.age > this.maxAge) this.points.splice(i, 1);
      });

      this.points.forEach((point) => {
        this.drawPoint(point);
      });

      this.texture.needsUpdate = true;
    }
  }
}
