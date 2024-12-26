<template>
  <transition name="slide-fade">
    <div class="canvas-wrap" v-if="showCanvas" @click="navigateToHome()">
      <canvas ref="canvas"></canvas>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { MakeFlakes } from '@/composables/function/makeFlakes.ts'
import router from '@/router'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

let makeFlakes: MakeFlakes
let W = window.innerWidth
let H = window.innerHeight
const numberFlakes = 100
const showCanvas = ref(true)

function navigateToHome() {
  showCanvas.value = false
  setTimeout(() => {
    router.push('/home')
  }, 500)
}

function resizeCanvas() {
  W = window.innerWidth
  H = window.innerHeight
  if (canvas.value) {
    canvas.value.width = W
    canvas.value.height = H
    if (makeFlakes) {
      makeFlakes.resizeCanvas(W, H)
    }
  }
}

function drawText() {
  if (ctx.value) {
    ctx.value.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.value.font = 'lighter 60px Georgia'
    ctx.value.textAlign = 'center'
    ctx.value.fillText('JIMIN', W / 2, H / 2.1)

    ctx.value.fillStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.value.font = 'lighter 80px'
    ctx.value.textAlign = 'center'
    ctx.value.fillText('IS', W / 2, H / 1.9)

    ctx.value.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.value.font = 'lighter 60px'
    ctx.value.textAlign = 'center'
    ctx.value.fillText('COMING', W / 2, H / 1.8)
  }
}

onMounted(() => {
  nextTick(() => {
    resizeCanvas()
  })

  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d')
    if (ctx.value) {
      makeFlakes = new MakeFlakes(W, H, numberFlakes)
    }

    window.addEventListener('resize', resizeCanvas)

    setInterval(() => {
      if (makeFlakes) {
        makeFlakes.moveFlakes()
        makeFlakes.drawFlakes(ctx.value!)
      }
      drawText()
    }, 30)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  background: #fff;
  min-height: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.canvas-wrap {
  display: flex;
  background: #000 no-repeat;
  position: relative;
}

canvas {
  display: block;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
