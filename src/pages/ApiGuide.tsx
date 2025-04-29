import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'

import t1 from '../assets/tutorial/t1.png'
import t2 from '../assets/tutorial/t2.png'
import t3 from '../assets/tutorial/t3.png'
import t4 from '../assets/tutorial/t4.png'
import t5 from '../assets/tutorial/t5.png'
import t6 from '../assets/tutorial/t6.png'
import Title from '../components/common/Title'

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
        spaceBetween={70}
        slidesPerView={1}
        className="h-full w-full p-16">
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
            <Title size="medium"> 1. 사이트 접속 및 로그인</Title>
            <a
              target="_blank"
              href="https://openapi.nexon.com">
              <p>https://openapi.nexon.com 접속 및 로그인</p>
            </a>
            <img src={t1} />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
            <Title size="medium">
              2. 마이페이지 → Nexon Open API → 애플리케이션 등록
            </Title>
            <img src={t2} />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
            <Title size="medium">3.1 애플리케이션 등록하기</Title>
            <div className="flex gap-6 items-center">
              <img
                src={t3}
                className="w-1/2"
              />
              <div className="flex flex-col gap-6">
                <p>1. Open API 서비스 이용약관 동의</p>
                <p>2.메이플스토리</p>
                <p>3. 서비스 단계</p>
                <p>4. ex) 메이플링크</p>
                <p>5. 길드원 및 일정 관리</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
            <Title size="medium">3.2 애플리케이션 등록하기</Title>

            <div className="flex gap-6 items-center">
              <img
                src={t4}
                className="w-1/2"
              />
              <div className="flex flex-col gap-6">
                <p>6. WEB</p>
                <p>7. https://maplelink.com</p>
                <p>8. 등록</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
            <Title size="medium">
              4. 발급한 API Key 확인하기(마이페이지 → Nexon Open API →
              애플리케이션 목록)
            </Title>

            <img src={t5} />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center">
          <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
            <Title size="medium">5. API Key 복사하기</Title>
            <img src={t6} />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
