## 배포주소
[https://fe-yeon-jeong-cho-czdn.vercel.app/](https://fe-yeon-jeong-cho-czdn.vercel.app/).

## Getting Started

```
bun dev // 개발환경 시작 명령어
bun run build // 빌드환경 시작 명령어
```

## 버전 정보
```
next": "15.1.7,
tailwindcss": "^3.4.1",
```

## 주요 기능
1.드래그 앤 드롭 기능
- @dnd-kit 라이브러리를 사용하여 구현
- 보드 간 이동 가능
- 카드의 보드 내 이동 및 보드 간 이동 가능

2.보드 관리
- 보드 추가
- 보드 제목 수정 -> 보드의 제목을 누르면, textField로 변환되어 수정
- 보드 삭제 -> x버튼을 누르면, 모달을 통해 한번 더 삭제 확인
- 보드 순서 변경

3.카드 관리
- 카드 추가
- 카드 내용 수정 -> 카드 내용을 누르면, textField로 변환되어 수정
- 카드 삭제 -> '-'버튼을 누르면, 바로 삭제
- 카드 순서 변경
- 카드의 보드 간 이동

4. 기타 내용
-  localStorage를 사용하여 데이터를 저장
