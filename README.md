# boom-steps-ui

This is the UI repo for the application hosted in https://boom-tools.casantiago.com


# Development

### Clone the repo
```sh
$ git clone https://github.com/ca-santiago/boom-steps-ui
```

### Install dependencies
Make sure to nvm use to set the correct node version
```sh
$ npm ci
```

### Update API endpoint
You need a deployed backend or boom-api running locally. Setup the URL on the `.env.local` file following `.env.example`.


### Run the app
```sh
$ npm run dev
```
Navigate to http://localhost:5173/
