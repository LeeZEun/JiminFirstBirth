<script lang="ts" setup>
import backImg from '@/assets/images/background_img.jpeg'
import { onMounted, ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

const isPageVisible = ref(false)

// 구글맵 API 키 설정
const googleMapApiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY

const coordinate = {
  lat: 37.520024279048,
  lng: 126.94006969488,
}

const markerOptions = { position: coordinate, title: '워킹온더클라우드' }

const eventDateTime = ref('2024. 12. 28. SAT PM 1:30')
const invitationMessage = ref(
  '함께 맞이하는 특별한 날,\n저희 아기의 첫 돌잔치에 초대합니다.\n많은 축복과 사랑 부탁드립니다.',
)
const galleryPhotos = ref([
  './src/assets/images/second/1.jpeg',
  './src/assets/images/second/2.jpeg',
  './src/assets/images/second/3.jpeg',
  './src/assets/images/second/4.jpeg',
  './src/assets/images/second/5.jpeg',
  './src/assets/images/second/6.jpeg',
  './src/assets/images/first/1.jpeg',
  './src/assets/images/first/2.jpeg',
  './src/assets/images/first/3.jpeg',
  './src/assets/images/first/4.jpeg',
  './src/assets/images/first/5.jpeg',
  './src/assets/images/first/6.jpeg',
  './src/assets/images/third/1.jpeg',
  './src/assets/images/third/2.jpeg',
  './src/assets/images/third/3.jpeg',
  './src/assets/images/third/4.jpeg',
  './src/assets/images/third/5.jpeg',
  './src/assets/images/third/6.jpeg',
  './src/assets/images/fourth/1.JPG',
  './src/assets/images/fourth/2.JPG',
  './src/assets/images/fourth/3.JPG',
  './src/assets/images/fourth/4.JPG',
  './src/assets/images/fourth/5.JPG',
  './src/assets/images/fourth/6.JPG',
])
const locationName = ref('63빌딩 워킹온더클라우드')
const locationAddress = ref('서울시 영등포구 63로 50 한화생명빌딩 59층')

const isModalOpen = ref(false)
const currentImage = ref('')

const generateSnowflakeStyle = () => {
  return {
    left: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 10}s`,
    animationDelay: `${Math.random() * 10}s`,
  }
}

// 갤러리 이미지 클릭 시 모달 열기
function openModal(image: string) {
  currentImage.value = image
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

// 모달 외부 클릭 시 모달 닫기
function closeModal() {
  isModalOpen.value = false
  currentImage.value = ''
  document.body.style.overflow = 'auto'
}

onMounted(() => {
  setTimeout(() => {
    isPageVisible.value = true
  }, 50)
})
</script>

<template>
  <div class="page fade-in" v-show="isPageVisible">
    <!-- 초대장 전체 영역 -->
    <div class="invitation">
      <!-- 눈송이 애니메이션 -->
      <div v-for="i in 20" :key="i" class="snowflake" :style="generateSnowflakeStyle()">🌼</div>

      <!-- 상단 이미지와 타이틀 -->
      <div class="header">
        <img :src="backImg" alt="배경 이미지" class="background-image" />
        <div class="header-content">
          <p class="event-title">{{ eventDateTime }}</p>
        </div>
      </div>

      <!-- 초대 메시지 -->
      <div class="invitation-message">
        <h3>Jimin's First Birthday :)</h3>
        <p class="message-text">{{ invitationMessage }}</p>
      </div>

      <!-- 갤러리 -->
      <div class="gallery">
        <h3>Gallery :)</h3>
        <div class="gallery-grid">
          <div v-for="(photo, index) in galleryPhotos" :key="index" class="gallery-item-container">
            <div class="gallery-item">
              <img :src="photo" alt="gallery image" @click="openModal(photo)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 위치 정보 -->
      <div class="location">
        <h3>Location :)</h3>
        <p class="location-name">{{ locationName }}</p>
        <p class="location-address">{{ locationAddress }}</p>

        <!-- 구글맵 -->
        <GoogleMap
          :apiKey="googleMapApiKey"
          :center="coordinate"
          :zoom="17"
          style="width: 100%; height: 400px"
        >
          <Marker :options="markerOptions" />
        </GoogleMap>
        <!-- <img :src="mapImg" alt="지도 이미지" class="map-image" /> -->
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="modal" @click="closeModal()">
    <div class="modal-content" @click.stop>
      <img :src="currentImage" alt="current image" class="modal-image" />
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f8f9fa;
  min-height: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  display: none;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(0);
  animation: fadeIn 1.2s ease-out forwards;
}

.page.fade-in {
  display: flex;
}

.invitation {
  background-color: white;
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  color: #333;
  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.header-content {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px 15px;
  border-radius: 8px;
  z-index: 2;
  white-space: nowrap;
  width: auto;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.message-text {
  white-space: pre-line;
}

.invitation-message {
  background-color: #fff9e6;
  padding: 20px;
  margin-top: -10px;
  border-radius: 8px;
}

.invitation-message h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.invitation-message p {
  font-size: 1rem;
  line-height: 1.6;
}

.gallery {
  margin: 20px 0;
}

.gallery h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.gallery-item-container {
  width: 100%;
  position: relative;
  padding-top: 100%;
  overflow: hidden;
}

.gallery-item {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.gallery-item img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.location {
  margin: 20px 0;
}

.location h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.location-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.location-address {
  font-size: 1rem;
  margin: 10px 0;
}

.map-image {
  width: 100%;
  border-radius: 8px;
}

.snowflake {
  position: absolute;
  animation: snowflakeFall linear infinite;
  font-size: 1.5rem;
  color: white;
  user-select: none;
  pointer-events: none;
  z-index: 9999;
  opacity: 0;
  top: -10%;
}

@keyframes snowflakeFall {
  0% {
    top: -10%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  position: relative;
}

.modal-image {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}
</style>
