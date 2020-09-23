# 판례요지봇

###  🤖🐧👩🏻‍⚖️
![last](https://img.shields.io/github/last-commit/MaxKim-J/supreme-court-API) ![tweet](https://img.shields.io/twitter/follow/precedent_bot?label=%40precedent_bot&style=social)

![appImage](./appImage.png)

트위터 판례요지봇 개인 프로젝트에 대한 문서입니다.  
프로젝트는 총 3개의 레포지토리로 이루어져 있고, 편의상 본 레포에 프로젝트에 관한 모든 내용을 모두 정리합니다.

- [트위터 계정 @precedent_bot](https://twitter.com/precedent_bot)
- [판례보기 웹앱](https://tweet-bot-client.vercel.app/)

## 🗂 Repo

### [1. supreme-court-API](https://github.com/MaxKim-J/supreme-court-API)

> 판례를 저장하는 DB와 REST API(현재 레포)

- Express.js(+TypeScript)
- TypeORM
- postgreSQL
- Jest
- AWS EC2
- AWS Route 53

### [2. supreme-court-serverless](https://github.com/MaxKim-J/supreme-court-severless)

> 판례 크롤러와 트윗봇은 firebase functions를 이용한 서버리스 아키텍쳐로 구현했습니다.

- firebase functions
- firebase realtime database
- google cloud platform scheduler

### [3. tweet-bot-client](https://github.com/MaxKim-J/tweet-bot-client)

> 판례요지를 보여주기 위한 React 앱웹입니다.

- React.js(+TypeScript)
- React Router
- SCSS

## 📖  Key Note

### 프로젝트 구조

### 스택, 구현 포인트

## 📈 데이터 출처
[대한민국 법원 종합법률정보](https://glaw.scourt.go.kr/wsjo/intesrch/sjo022.do)