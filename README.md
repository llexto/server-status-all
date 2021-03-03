<h1>server-status-all</h1>

[![npm version](https://img.shields.io/npm/v/server-status-all?label=version)](https://www.npmjs.com/package/server-status-all)
[![License](https://img.shields.io/npm/l/server-status-all)](https://llexto/server-status-all/blob/master/LICENSE)
![npm weekly downloads](https://img.shields.io/npm/dw/server-status-all)
[![GitHub open issues](https://img.shields.io/github/issues-raw/llexto/server-status-all)](https://github.com/llexto/server-status-all/issues)

Un module Node.Js pour envoyer un ping à un serveur avec l'ip et le port.

*Des nouvelles fonctionnalités vont arriver*

## Documentation 

### Avoir le statut d'un serveur Minecraft

```js
const status = require('server-status-all');

status('play.hypixel.net', 19132)
```

### Résultat 
```console
-----Informations concernant le serveur-----
        Ip : play.hypixel.net
        Port : 19132
        Statut : Opérationnel (77ms)
```

### Comment activer le message dans la console ? 

Il faut mettre true après le port avec une virgule.

```js
status('play.hypixel.net', 19132, true)
```

### Comment avoir le nombre d'ms du serveur en dehors du message de console et savoir son statut ? 

```js
const status = require('server-status-all');

status.ms() //77

status.type() //connect, error, timeout
```

