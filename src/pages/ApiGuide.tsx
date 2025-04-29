import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

export const ApiGuide = () => {
  const nav = useNavigate()
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-4 left-4 z-10">
        <Button
          size="small"
          scheme="outlined"
          onClick={() => nav('/')}>
          뒤로가기
        </Button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={50}
        slidesPerView={1}
        className="h-full w-full">
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow">
            1. 사이트 접속 및 로그인
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow">
            2. 마이페이지 → Nexon Open API → 애플리케이션 등록
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow">
            3. 애플리케이션 등록하기
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow">
            4. 발급한 API Key 확인하기
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
