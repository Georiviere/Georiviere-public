# Georiviere

Georiviere is the public web application displaying the interface you can use to value your waterways.


## Development

Installation in development:

### Prerequisite

- You need to use a node version above 18
- Use nvm and then:

```bash
nvm use
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

Open the `.env` file and modify its contents with your own API url and portal number.

### Start the application in development mode

Once your dependencies are installed and the `.env` is filled in, start your server in development mode by running:

```bash
yarn dev
```

### Start the app for the production 

```bash
yarn build
yarn start
```

### Process manager

In order to have a more robust solution to serve your node server, our advice is to use [pm2](https://pm2.keymetrics.io/).

Here is a quick guide on how to use pm2 with an Ubuntu distribution (Make sure you've installed nodejs and built the project following the previous step)

```sh
sudo npm install -g pm2
```

```sh
PORT=3000 pm2 start yarn --name georiviere-public -- start
```

Here we specify that the port we want to run our server on is the 3000, that the starting command is `yarn start` and the name of our process should be `georiviere-public`.

You can see all your processes and their status by running:

```sh
pm2 status
```

To stop your process:

```sh
pm2 stop georiviere-public
```

To start your process:

```sh
pm2 start georiviere-public
```

You will also be able to see the application logs by running:

```sh
pm2 logs georiviere-public
```
