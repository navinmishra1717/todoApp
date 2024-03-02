# todo-app

## Prerequisite

- nodejs(>=16)
- typescript
- mongodb

## Getting started

Clone the repo

```
git clone git@github.com:navinmishra1717/todoApp.git
cd todoApp
```

### Install

Server

```
cd server
npm install
```

Client

```
cd ../client
npm install
```

### Server Environment setup

```
cd server
```

rename `.env.example` to `.env` and add variables
<br />
Default Database is cloud mongodb, replace `MONGO_URL` with `mongodb://localhost/todoapp` to run on db on local

### Run Server

Run the project for development

```
 npm run dev
```

Build the project

```
 npm run build
```

Run the project for production

```
 npm run start
```

### Run Client

After server is running, run the client

```
npm run start
```

### API documentation

For Api documentation, put the value of `APP_ENV` in `.env` file as `local` or `development` and open `http://localhost:4000/api-docs` in browser
