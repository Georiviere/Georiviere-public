# Georiviere

Georiviere is the public web application displaying the interface you can use to value your waterways and where users can contribute.

[1. Installation for production](#install)  
[2. Customize your application](#customization)  
[3. Documentation for developers](#development)

## Installation for production

### With docker (recommended)

<a name="install"/>

#### Installation

Follow those instructions in order to install the application on your server :

1. Download `zip archive <https://github.com/Georiviere/Georiviere-admin/releases/latest/download/install.zip>`
```bash
unzip install.zip
cd georiviere-public
cp .env.dist .env
```
2. Modify .env as needed and [change your customization](#customization)

3. Build your image
```bash
docker compose build
```
*Note : Whenever you need to change your translation or the .env. You have to rebuild the image.*

4. Launch the service :
```bash
docker compose up -d
```

You can now access the application by visiting [http://localhost:8080/](http://localhost:8080/) ! 🎉

#### Maintenance

Whenever you change the settings you need to relaunch the service :
```bash
docker compose down
docker compose up -d
```

### Without docker (not recommended)

You can locally build and launch the application using yarn, following the same method used in development.

```bash
yarn build
yarn start
```

#### Process manager

In order to have a more robust solution to serve your node server, if you don't want to use Docker which is the main method, our advice is to use [pm2](https://pm2.keymetrics.io/).

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

<a name="customization"/>

## Customization

Edit the following files to personalize your application:
- CSS settings: You can modify [/src/styles/global.css](https://github.com/Georiviere/Georiviere-public/blob/main/src/styles/globals.css). The project uses [Tailwind CSS](https://tailwindcss.com/). 
 You can also modify colors variables (defined in HSL; See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information). 
 - Locale messages for the application [/transation/fr.json](https://github.com/Georiviere/Georiviere-public/blob/main/translations/fr.json). For the moment there is only the french version available.
 - Global customization settings (header/footer/homepage) defined in [/src/customization/settings.json](https://github.com/Georiviere/Georiviere-public/blob/main/src/customization/settings.json).
 - If you need to store images (or others medias), you can drop it in `/public/medias`. To define your favicons, you need to override `favicon-16x16.png`, `favicon.png`, and `apple-touch-icon.png` in the same folder.

<a name="development"/>

## Development

To install the app in development, follow those steps:

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

Once your dependencies are installed and the `.env` file and your [customization](#customization)   are defined, start your server in development mode by running:

```bash
yarn dev
```
