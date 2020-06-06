# StockProf API

This webapp is a realtime crypto-currency trading simulator.

Feature:
- create account
- get realtime price for a list of height crypto currencies (Bitcoin, Ethereum, XRP....)
- buy/sell currencies
- follow other users and see their updates in your timeline
- chat with other users

This App was started in 2018 as my final projects for Ifocop JS Bootcamp.

### Legacy deployment (June 2018)

https://stocks-carb11.herokuapp.com/

* Free Heroku dyno need sometimes up to 45s to start up

* Do not forget to `$ heroku config:set NPM_CONFIG_PRODUCTION=false --app stocks-carb11`



## May 2020 refactor !

### Refactor
- Fixed realtime currency pricing
- Removed babel-node ontime compilation
- Moved backend code and added Babel build logic

### ECS Deployment !
- Docker image pushed on ECR: 680637963852.dkr.ecr.us-east-1.amazonaws.com/stockprof
- Deployed on ECS / Fargate


### To do
- Refactor completly outdated session logic based on fileSystem read/write 🙈🙈🙈
- ...