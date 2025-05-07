# Todo Calendar App

할 일 관리를 위한 캘린더 기반 Todo 애플리케이션입니다.

## 주요 기능

- 캘린더 기반 할 일 관리
- 할 일 추가/수정/삭제
- 우선순위 설정 (높음/중간/낮음)
- 완료 상태 토글
- 날짜별 할 일 그룹화
- 달력에 할 일 개수 표시

## 기술 스택

### Frontend
- React
- Emotion (Styled Components)
- Axios
- React Calendar
- date-fns

### Backend
- Spring Boot
- MyBatis
- MySQL

## 실행 방법

### Backend
1. MySQL 데이터베이스 설정
2. `application.properties` 파일에서 데이터베이스 연결 정보 설정
3. 프로젝트 루트 디렉토리에서 다음 명령어 실행:
```bash
./mvnw spring-boot:run
```

### Frontend
1. frontend 디렉토리로 이동
2. 의존성 설치:
```bash
npm install
```
3. 개발 서버 실행:
```bash
npm start
```

## API 엔드포인트

- `GET /api/todos`: 모든 할 일 조회
- `POST /api/todos`: 새로운 할 일 추가
- `GET /api/todos/{id}`: 특정 할 일 조회
- `PUT /api/todos/{id}`: 할 일 수정
- `DELETE /api/todos/{id}`: 할 일 삭제

## 프로젝트 구조

```
todoapp/
├── frontend/          # React 프론트엔드
│   ├── src/
│   │   ├── App.js    # 메인 애플리케이션 컴포넌트
│   │   └── ...
│   └── package.json
│
└── src/              # Spring Boot 백엔드
    ├── main/
    │   ├── java/
    │   │   └── com/todoapp/backend/
    │   │       ├── controller/
    │   │       ├── service/
    │   │       ├── mapper/
    │   │       └── domain/
    │   └── resources/
    │       ├── mapper/
    │       └── application.properties
    └── pom.xml
```
