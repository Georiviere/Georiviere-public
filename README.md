# Georiviere

Georiviere is the public web application displaying the interface you can use to value your waterways and where users can contribute.

[1. Installation for production](#installation)
[2. Customize your application](#customization)  
[3. Documentation for developers](#development)

## Installation for production

### With docker (recommended)

#### Installation

Follow those instructions in order to install the application on your server :


1. Download the latest [zip archive](https://github.com/Georiviere/Georiviere-public/releases/latest/download/install.zip)
```bash
unzip install.zip
cd georiviere-public
```
2. Modify .env as needed and [change your customization](#customization) (take care it may be hidden by your file browser.)

3. Build your image
```bash
docker compose build
```
*Note : Whenever you need to change your translation. You have to rebuild the image.*

4. Launch the service :
```bash
docker compose up -d
```

You can now access the application by visiting [http://localhost:8080/](http://localhost:8080/) ! 🎉

#### Maintenance

Whenever you change the settings you need to relaunch and rebuild the service :
```bash
docker compose down
docker compose build
docker compose up -d
```

### Without docker (not recommended)

You can locally build and launch the application using yarn, following the same method used in development.

#### Prerequisite

- You need to use a node version 18
- Use nvm and then:

```bash
nvm use
```

Install yarn

```bash
npm install -g yarn
```

#### Install dependencies

```bash
yarn
```

#### Environnements variables

```bash
cp .env.dist .env
```

Open the `.env` file and modify its contents with your own API url and portal number.

#### Start the application

Once your dependencies are installed and the `.env` file and your [customization](#customization) are defined, start your server :

##### In production mode

```bash
yarn build
yarn start
```

##### Or in development mode by running:

```bash
yarn dev
```

#### Process manager

In order to have a more robust solution to serve your node server, if you don't want to use Docker which is the main method, our advice is to use [pm2](https://pm2.keymetrics.io/).

Here is a quick guide on how to use pm2 with an Ubuntu distribution (Make sure you've installed NodeJS and built the project following the previous step)

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

### Server configuration

You might need to configure your server to make sure it works properly.

Below you can find a `nginx` configuration example:

```nginx
location / {
    proxy_set_header   X-Forwarded-Host     $host;
    proxy_set_header   X-Forwarded-Server   $host;
    proxy_set_header   X-Forwarded-Proto    $http_x_forwarded_proto;
    proxy_set_header   X-Forwarded-For      $proxy_add_x_forwarded_for;
    proxy_set_header   X-Real-IP            $remote_addr;
    proxy_set_header   Host                 $http_host;
    proxy_redirect     off;
    keepalive_timeout 0;
    #proxy_pass         http://node;
    proxy_pass http://localhost:8080;
}
gzip on;
gzip_static on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_proxied any;
gzip_types text/text text/plain text/xml text/css application/x-javascript application/javascript application/json;

```

## Customization

Edit the following files to customize your application:
- CSS settings: You can modify [/src/styles/global.css](https://github.com/Georiviere/Georiviere-public/blob/main/src/styles/globals.css). The project uses [Tailwind CSS](https://tailwindcss.com/). 
 You can also modify colors variables (defined in HSL; See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information). 
 - Locale messages for the application [/transation/fr.json](https://github.com/Georiviere/Georiviere-public/blob/main/translations/fr.json). For the moment there is only the french version available.
 - Global customization settings (header/footer/homepage) defined in [/src/customization/settings.json](https://github.com/Georiviere/Georiviere-public/blob/main/src/customization/settings.json).
 - If you need to store images (or others medias), you can drop it in `/public/medias`. To define your favicons, you need to override `favicon-16x16.png`, `favicon.png`, and `apple-touch-icon.png` in the same folder.