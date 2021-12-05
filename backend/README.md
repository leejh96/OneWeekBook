# OneWeekBook


## 알게된 것

### sequelize
- sequelize를 사용할 때 mysql을 같이 깔아주는 이유는 sequelize 설정 시 config.json 파일에서 dialect를 설정하게 될 때 설정한 db로 드라이버를 설정하기 때문이다.
- sequelize-cli를 설치하고 sequelize init 명령어를 사용하면 sequelize설정에 필요한 폴더 및 파일을 알아서 생성
- config.use_env_variable는 sequelize에서 개발환경을 알아서 인식해주는 속성
- 테이블 생성시 id값은 자동적으로 생성된다.
- sequelize는 default로 createAt, updateAt을 생성한다.
- sequelize.sync()를 사용하면 테이블이 생성되거나 삭제될 때 모든 모델을 동기화시킴
- AccessDeniedError [SequelizeAccessDeniedError]: (conn=66, no: 1045, SQLState: 28000) Access denied for user 'oneweekbookadmin'@'localhost' (using password: YES)이 에러 너무남