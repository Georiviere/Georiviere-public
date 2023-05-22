# Georiviere

Georiviere is the public web application displaying the interface you can use to value your waterways.


## Development

Installation in development:

### Prerequisite

- You need to use a node version above 18
- Use nvm and then:

```bash
nvm use 18
```

Install yarn

```bash
npm install -g yarn
```

### Install dependencies

```bash
yarn
```

### Environnements variables

```bash
cp .env.dist .env
```

Open the `.env` file and modify its contents with your own API url and portal number..

### Start the application in development mode

Once your dependencies are installed and the `.env` is filled in, start your server in development mode by running :

```bash
yarn dev
```

### Start the app for the production 

```bash
yarn build
yarn start
```
