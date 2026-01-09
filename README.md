# 🍁 MapleLink: 메이플스토리 통합 관리 플랫폼

> **"데이터 기반의 더 스마트한 길드 관리"**  
> Nexon Open API를 활용하여 길드원 정보를 실시간 조회하고 관리의 번거로움을 해결하는 유저 통합 플랫폼입니다.

<br/>

## 🛠 Tech Stack

### Frontend

- **Core**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query), Axios

### Data & Backend

- **API**: Nexon Open API
- **Database/Auth**: Firebase

### Tools

- **Code Quality**: ESLint, Prettier

<br/>

## ✨ Key Features

### 🔍 강력한 캐릭터 & 길드 탐색

- **상세 스탯 조회**: 전투력, 장비, 어빌리티 등 40여 항목의 상세 정보를 실시간으로 조회합니다.
- **다중 길드 비교**: 최대 4개 길드를 동시에 비교하여 성장 수치를 분석합니다.

### 🛡️ 지능형 길드 관리

- **변동 사항 추적**: DB와 게임 데이터를 비교하여 가입 및 탈퇴를 자동 탐지합니다.
- **본캐/부캐 판별**: 넥슨 API 데이터를 분석하여 사용자의 메인 캐릭터를 자동으로 구분합니다.

<br/>

## ⚡ Trouble Shooting & Optimization

<details>
<summary><strong>1. API Rate Limit 대응 및 로딩 속도 최적화</strong></summary>

### 🚨 Problem

반복적인 API 호출로 잦은 429(Rate Limit) 에러 발생 및 과도한 로딩 대기

### ✅ Solution

TanStack Query의 캐싱 전략(`staleTime`, `refetchOnWindowFocus`) 적용

### 📈 Result

불필요한 네트워크 비용을 70% 감소시키고 즉각적인 데이터 확인 경험 제공

</details>

<details>
<summary><strong>2. 부분 캐시 갱신을 통한 UX 개선</strong></summary>

### 🚨 Problem

정보 갱신 시 전체 데이터를 다시 불러오는 비효율로 인해 긴 대기 시간 발생

### ✅ Solution

`setQueryData`를 활용하여 변경된 특정 멤버 데이터만 부분적으로 업데이트

### 📈 Result

UI 반영 시간을 10초에서 0초 수준으로 단축하여 실시간 업데이트 느낌 구현

</details>

<br/>

## 🏗 Project Structure

```bash
src
├── apis        # API integration modules
├── assets      # Static assets (images, icons)
├── components  # Shared UI components
├── config      # Configuration files
├── constants   # Global constants
├── context     # React Context providers
├── data        # Static data
├── hooks       # Custom React hooks
├── pages       # Page components (Routes)
├── store       # State management (Zustand)
├── style       # Global styles
├── types       # TypeScript type definitions
└── utils       # Utility functions
```

<br/>

## 🏆 Achievements & Lessons Learned

- **API 최적화 및 캐싱 전략**: TanStack Query를 활용하여 불필요한 API 호출을 줄이고, 사용자 경험을 위한 효과적인 데이터 캐싱 전략을 수립하여 적용했습니다.
- **대규모 데이터 처리 경험**: 넥슨 Open API의 방대한 캐릭터 및 길드 데이터를 효율적으로 가공하고 시각화하는 경험을 쌓았습니다.
- **사용자 경험(UX) 개선**: 데이터 로딩 지연 시간을 최소화하기 위한 낙관적 업데이트(Optimistic Updates) 및 부분 렌더링 기술을 도입하여 앱의 반응성을 높였습니다.
- **트러블슈팅과 문제 해결**: 개발 과정에서 발생한 Rate Limit 문제와 렌더링 성능 이슈를 주도적으로 분석하고 해결하며 엔지니어링 역량을 강화했습니다.
