import { Swiper as SwiperClass } from 'swiper/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import t1 from '../assets/tutorial/t1.png'
import t2 from '../assets/tutorial/t2.png'
import t3 from '../assets/tutorial/t3.png'
import t4 from '../assets/tutorial/t4.png'
import t5 from '../assets/tutorial/t5.png'
import t6 from '../assets/tutorial/t6.png'
import Title from '../components/common/Title'

export const ApiGuide = () => {
  const nav = useNavigate()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: '사이트 접속 및 로그인',
      description: '넥슨 API 사이트에 접속하여 로그인합니다.',
      url: 'https://openapi.nexon.com',
      image: t1
    },
    {
      title: '애플리케이션 등록 화면으로 이동',
      description: '마이페이지 → Nexon Open API → 애플리케이션 등록',
      image: t2
    },
    {
      title: '애플리케이션 등록하기 (1)',
      description: 'API 서비스 이용 정보를 입력합니다.',
      details: [
        'Open API 서비스 이용약관 동의',
        '메이플스토리 선택',
        '서비스 단계 선택',
        '애플리케이션 이름 입력 (예: 메이플링크)',
        '설명 입력 (예: 길드원 및 일정 관리)'
      ],
      image: t3
    },
    {
      title: '애플리케이션 등록하기 (2)',
      description: '서비스 플랫폼 정보를 입력합니다.',
      details: [
        'WEB 선택',
        '서비스 URL 입력 (https://maplelink.com)',
        '등록 버튼 클릭'
      ],
      image: t4
    },
    {
      title: 'API Key 확인하기',
      description:
        '마이페이지 → Nexon Open API → 애플리케이션 목록에서 확인합니다.',
      image: t5
    },
    {
      title: 'API Key 복사하기',
      description: '발급된 API Key를 복사하여 메이플 링크에 사용합니다.',
      image: t6
    }
  ]

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveStep(swiper.activeIndex)
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-4 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* 헤더 영역 */}
      <div className="w-full max-w-5xl flex justify-center items-center mb-8 px-4">
        <div className="relative">
          <Title
            size="large"
            className="text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold py-2">
            Nexon API 키 발급 가이드
          </Title>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>

      {/* 스텝 인디케이터 */}
      <div className="w-full max-w-4xl px-4 mb-8">
        <div className="flex justify-between items-center relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center z-10">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all
                  ${activeStep >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'} 
                  ${activeStep === index ? 'ring-4 ring-blue-100' : ''}
                `}>
                {index + 1}
              </div>
              <span
                className={`text-xs mt-2 font-medium transition-all duration-300 ${activeStep === index ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.title.split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          ))}
          {/* 진행 바 */}
          <div className="absolute top-4 left-0 h-0.5 bg-gray-200 w-full -z-10"></div>
          <div
            className="absolute top-4 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-500"
            style={{ width: `${activeStep * 20}%` }}></div>
        </div>
      </div>

      {/* 슬라이더 영역 */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="h-full"
          onSlideChange={handleSlideChange}>
          {steps.map((step, index) => (
            <SwiperSlide
              key={index}
              className="p-6 sm:p-8">
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 bg-blue-50 py-2 rounded-lg inline-block px-6 mx-auto">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                  {step.url && (
                    <a
                      href={step.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline inline-block mt-2 font-medium">
                      {step.url} 접속하기
                    </a>
                  )}
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                  <div className="md:w-3/5 overflow-hidden rounded-lg shadow-md border border-blue-100 flex items-center justify-center bg-white p-4">
                    <div className="flex justify-center items-center w-full">
                      <img
                        src={step.image}
                        alt={`API 가이드 스텝 ${index + 1}`}
                        className="w-auto h-auto object-contain max-h-[350px]"
                      />
                    </div>
                  </div>

                  {step.details && (
                    <div className="md:w-2/5 bg-blue-50 rounded-lg p-5 border border-blue-100 shadow-sm">
                      <h4 className="font-bold text-gray-800 mb-4 text-lg border-b border-blue-200 pb-2">
                        세부 단계
                      </h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3">
                            <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                              {idx + 1}
                            </span>
                            <span className="text-gray-700 font-medium">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex gap-4 mb-8">
        <Button
          size="small"
          scheme="outlined"
          onClick={() => nav('/')}
          className="px-6 py-2 shadow-sm hover:shadow-md transition-all">
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
