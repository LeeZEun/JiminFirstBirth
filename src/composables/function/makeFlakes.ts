export interface Flake {
  x: number
  y: number
  radius: number
}

export class MakeFlakes {
  private flakes: Flake[] = []
  private W: number
  private H: number
  private numberFlakes: number
  private angle: number = 0

  constructor(W: number, H: number, numberFlakes: number) {
    this.W = W
    this.H = H
    this.numberFlakes = numberFlakes
    this.createFlakes()
  }

  private createFlakes() {
    for (let i = 0; i < this.numberFlakes; i++) {
      this.flakes.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        radius: Math.random() * 8 + 1,
      })
    }
  }

  public resizeCanvas(W: number, H: number) {
    this.W = W
    this.H = H
  }

  public moveFlakes() {
    this.angle += 0.01
    for (let i = 0; i < this.numberFlakes; i++) {
      const f = this.flakes[i]
      f.y += Math.cos(this.angle) + 1 + f.radius / 2
      f.x += Math.sin(this.angle) * 2

      if (f.x > this.W + 5 || f.x < -5 || f.y > this.H) {
        if (i % 3 > 0) {
          this.flakes[i] = { x: Math.random() * this.W, y: -10, radius: f.radius }
        } else {
          if (Math.sin(this.angle) > 0) {
            this.flakes[i] = { x: -5, y: Math.random() * this.H, radius: f.radius }
          } else {
            this.flakes[i] = { x: this.W + 5, y: Math.random() * this.H, radius: f.radius }
          }
        }
      }
    }
  }

  public drawFlakes(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.W, this.H)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'

    // 그림자 설정: 진한 그림자 효과
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
    ctx.shadowBlur = 20

    // 그림자 방향을 설정하지 않음 (0, 0)으로 둬서 원 주변에 균일하게 그림자 효과 적용
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0

    // 원을 그리기
    ctx.beginPath()
    for (let i = 0; i < this.numberFlakes; i++) {
      const f = this.flakes[i]
      ctx.moveTo(f.x, f.y)
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true)
    }
    ctx.fill()

    // 그림자 효과를 다른 그리기에서 영향을 미치지 않도록 제거
    ctx.shadowColor = 'transparent'
  }
}
