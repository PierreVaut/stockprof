# StockProf API


### Local

```$ NPM run dev```

* Do not forget to `export`  env variables!

* Removed  `"postinstall": "npm install --prefix client"` from package.json, so you'll need to run `npm install` in the client directory

### Deployment

https://stocks-carb11.herokuapp.com/

* Free Heroku dyno need sometimes up to 45s to start up

* Do not forget to `$ heroku config:set NPM_CONFIG_PRODUCTION=false --app stocks-carb11`

