# 상황별 맛집 추천 웹 🍽️

당신의 순간에 딱 맞는 식당을 추천해주는 웹 애플리케이션입니다.
React + Vite + D3.js를 기반으로 직관적인 인터랙션과 데이터를 제공합니다.


## 🛠️ 초기 환경 설정

```bash
npm create vite@latest . -- --template react
npm install
npm install react-router-dom         # 페이지 이동
npm install styled-components        # 스타일링
npm install recharts                 # 버블차트 시각화
npm run dev
```

Node와 npm 버전 확인:
```bash
node -v
npm -v
```

---

## 📁 프로젝트 구조

```
src/
├── assets/                    # 이미지 및 리소스
│   └── react.svg
├── components/               # 공통 컴포넌트
│   ├── BubbleChart.jsx       # D3.js 기반 버블차트 컴포넌트
│   ├── Header.jsx            # 페이지 헤더
│   └── SituationButtons.jsx  # 상황 선택 버튼들
├── pages/                    # 라우팅되는 개별 페이지들
│   ├── Home.jsx              # 메인 상황 선택 페이지
│   ├── ChartPage.jsx         # 선택된 상황의 추천 식당 차트 페이지
│   └── DetailPage.jsx        # 식당 상세 정보 페이지 (준비 중)
├── App.jsx                   # 라우터 설정 및 전체 앱 구조
├── main.jsx                  # 앱 진입점
├── App.css                   # 전체 앱 스타일
└── index.css                 # 글로벌 스타일
```

---

## 📌 각 파일 역할 요약

- **App.jsx**: 라우터 연결, 전체 구조 정의
- **main.jsx**: React 앱 진입점
- **Home.jsx**: 상황 선택 메인 페이지
- **ChartPage.jsx**: 선택한 상황에 맞는 식당들을 D3.js 버블 차트로 시각화
- **BubbleChart.jsx**: D3.js를 활용한 원형 차트 컴포넌트
- **SituationButtons.jsx**: 상황별 버튼 UI
- **Header.jsx**: 페이지 상단 제목/설명 UI
- **DetailPage.jsx**: 식당 상세 페이지 구성 예정
- **App.css / index.css**: 전체 스타일 정의

---

## ✅ 실행 방법

```bash
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173) 로 접속하면 실행됩니다.

---

## 🎨 기술 스택

- React
- React Router DOM
- styled-components
- D3.js (pack 레이아웃)
- Vite

---

## 📌 향후 계획

- 상황별 데이터 연동 (API 또는 로컬 JSON)
- 지역 선택 기능 추가
- 식당 상세 페이지 구현
- 사용자 관심사 기반 추천 기능

---

> 🍽️ 오늘의 상황에 맞는 오늘의 맛집을 찾아보세요!
