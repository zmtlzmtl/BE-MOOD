# 👉[MOOD-CLASSIC WEB SITE][mood-link]

[mood-link]: https://fe-mood.vercel.app/ 'Mood 바로가기'

#### 클래식 음악을 통한 감정적인 치유와 공감을 드립니다.

Mood Classic 에서 특별히 엄선한 클래식 음악에 대한 소통을 통해 서로의 마음을 돌볼 수 있습니다.

---

## 프로젝트 소개

### 🏛 Architecture

![archibe](https://user-images.githubusercontent.com/63998542/231699355-40dd226d-252f-4ff6-8d59-831317103fd1.jpg)

<hr/>

### ⏳ 프로젝트 타임라인

- 3월 10일 실전 프로젝트 시작 
- 4월 12일 배포 & 마케팅 & UT 시작
- 4월 21일 최종 발표

<hr/>

### 🎹 기능


#### ✅ 영역별 감정 선택 

- 감정 영역 클릭 시에 백엔드에서 검수된 로직으로 감정에 알맞는 클래식을 추천합니다.

#### ✅ 무드 차트

- 좋아요 / 스트리밍 순 별로 조회 기준을 설정하여 실시간으로 인기 있는 차트를 보여줍니다.

#### ✅ 설문 조사

- 구체적인 질문을 통해 유저의 감정을 파악하고 그에 알맞는 클래식 음악을 추천합니다.

#### ✅ 감정 채팅방 (Socket.io)

- 감정에 따른 채팅방을 구별하여 같은 감정에 공감하는 유저들의 실시간 채팅 기능입니다.

#### ✅ 작곡가별 음악 조회

- 클래식 음악을 거장 작곡가별(베토벤, 쇼팽, 비발디, 모짜르트)로 구별하여 확인할 수 있습니다. 클래식 음악을 지속적으로 업데이트합니다.

#### ✅ 검색으로 작곡가 및 음악 조회

- 음악 검색 시에 태그(감정), 작곡가 이름(한, 영 둘 전부), 음악 제목별로 음악을 찾을 수 있습니다.

#### ✅ 음악 상세 조회 시 댓글 작성

- 특정 음악을 조회하면 그 음악에 대한 댓글 작성을 통해 음악에 대한 이야기를 공유할 수 있습니다.  

<hr/>

## 🔧 Tools

#### Design

<p>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<br>
  <img src="https://img.shields.io/badge/Adobe Photoshop-31A8FF?style=for-the-badge&logo=Adobe Photoshop&logoColor=white">
  <img src="https://img.shields.io/badge/Adobe Illustrator-FF9A00?style=for-the-badge&logo=Adobe Illustrator&logoColor=white">
</p>

#### Back-end


![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
<br>
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
<br>
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Amazon S3](https://img.shields.io/badge/Amazon%20S3-Latest-orange)
![Amazon CloudFront](https://img.shields.io/badge/Amazon%20CloudFront-Latest-orange)
![Amazon CodeDeploy](https://img.shields.io/badge/Amazon%20CodeDeploy-Latest-orange)
<br>
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
<br>
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
<br>
<img src="https://img.shields.io/badge/JSON Web Tokens-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white">
<br>
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)


#### Dev tools

<p> 
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white">
<br>

<hr>

| 이름       | 포지션       | 
| ---------- | ------------ | 
| **김상목** | `백엔드` | 
| **신동윤** | `백엔드` |
| **곽승민** | `백엔드` | 
| **이재욱** | `프론트엔드` | 
| **김명주** | `프론트엔드` | 
| **이인영** | `프론트엔드` | 
| **이예림** | `디자이너` |

## 🧨이슈 및 트러블슈팅

<details>
<summary><b>➡️ 문제1</b></summary>
  
> **문제** : redis 무한 루프 문제
>
> **해결** : ![image](https://user-images.githubusercontent.com/63998542/231757396-78c3cc6b-60fa-4bfe-b369-2e94844b3853.png)

  
</details>

<details>
<summary><b>➡️ 문제2</b></summary>
  
> **문제** : 카카오 로그인시 프론트와 백엔드 분업
>
> **해결** : ![image](https://user-images.githubusercontent.com/63998542/231757738-2a69d378-87b1-4989-a84c-71e1955c2a24.png)
</details>

<details>
<summary><b>➡️ 문제3</b></summary>
  
> **문제** : 응답 시간이 너무 오래걸리는 로직
>
> **해결** : ![image](https://user-images.githubusercontent.com/63998542/231757993-4ea0944d-0c89-410b-a8f2-d6fd42ee57f6.png)
</details>

<details>
<summary><b>➡️ 문제4</b></summary>
  
> **문제** : 음악의 분위기를 태그로 저장하여 검색에서 사용할 수 있게 구현
>
> **해결** : ![image](https://user-images.githubusercontent.com/63998542/231758778-57e6401f-413c-4525-85e7-13106296202a.png)
</details>

<details>
<summary><b>➡️ 문제5</b></summary>
  
> **문제** : 클래식 음악에 감정 결합하기
>
> **해결** : ![image](https://user-images.githubusercontent.com/63998542/231758892-191f1838-4993-403c-942c-f1e62460faa7.png)
</details>

<details>
<summary><b>➡️ 문제6</b></summary>
  
> **문제** : LAP(layerd architecture pattern) 환경에서 테스트 코드 작성시 DB Mocking 문제
>
> **해결** : LAP (layered architecture pattern) 아키텍쳐 환경에서의 repository layer 테스트 코드 작성시, repository layer에서 sequelize-cli 의 model 을 직접 가져와 사용하고 있었습니다. sequelize module에 의존하고 있는 repository layer 의 코드를 constructor injection 방식의 의존성 주입을 통해 테스트 코드 작성을 가능하게 했습니다. 

</details>
