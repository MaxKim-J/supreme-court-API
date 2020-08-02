# 대법원 판례 REST API

개인프로젝트 `트위터 판례봇`을 위한 REST API 서버를 빌드합니다.

## Stack

- Express.js(+TypeScipt)
- TypeORM
- postgreSQL
- Jest
- AWS EC2
- AWS Lambda(+cloudWatch)

## TODO

|번호|task|완료여부/날짜|
|:-:|-|:-:|
|1|초기 세팅|O/07.28|
|2|데이터베이스 구축(+모델링)|O/07.30|
|3|판례, 트윗 API 테스크 코드 작성 + 구현|X|
|4|인증 구현|X|
|5|배포, 마이그레이션|X|
|6|서버리스 크롤러 구축|X|
|7|트윗 API+트윗 봇 구축 + 스케쥴링|X|

## Git Convention

```bash
# 브랜치명
setting/test setting with jest

# 커밋명
refactor:seperate test helpers

# PR명
001: <setting/test setting with jest> to <develop>
```

- branch convention : 브랜치 디렉토리명(동사, behavior)/브랜치명(명사, target)
- git convention : 커밋 접두어:작업 내역
- PR convention :  번호:<작업 브랜치> to <합칠 브랜치>

### default branch

gitflow를 사용합니다

- master
- develop
- release
- 이외 브랜치는 기능(목적) 단위로 만들어서 develop에 합침
- develop에 합친거 master에 합치고, release 브랜치로 시맨틱 버전 찝기

### git prefix

말하자면 깃 접두어, 커밋의 `:`앞이나 브랜치 디렉토리명에 사용  
브랜치 디렉토리명은 해당 작업 단위를 가장 잘 표현할 수 있게 사용  

- `setting`: 초기세팅 관련된 브랜치
- `build`: 초기 기능 빌드(아예 없었던 기능)
- `feat`: 세부 기능 빌드(있었던 기능의 세부기능 확장 발전)
- `fix`: 기존에 빌드한거 픽스, 버그픽스, minor한 수정사항
- `refactor`: 기존에 빌드한거 토대로 리팩토링
- `README`: 리드미 수정