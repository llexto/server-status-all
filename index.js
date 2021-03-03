function status(ip, port, consoleResponse) {
  const net = require("net");
  const sock = new net.Socket();
  const fs = require("fs");
  const server = [[ip, port]];
  const startMs = Date.now();

  function jsonWriteData(jsonDataType, jsonDataMs) {
    const jsonData = {
      "type": `${jsonDataType}`,
      "ms": `${jsonDataMs}`
    };
    const data = JSON.stringify(jsonData);

    fs.writeFile('./data.json', data, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  server.forEach(function(item) {
    sock.setTimeout(3000);
    sock.on("connect", function() {
      const endMs = Date.now() - startMs;
      const jsonDataType = "connect";

      if (consoleResponse === true) {
        console.log(`
-----Informations concernant le serveur-----
        Ip : ${item[0]} 
        Port : ${item[1]} 
        Statut : Opérationnel (${endMs}ms)`)
      } else {
        return;;
      };
      jsonWriteData(jsonDataType, endMs);
      sock.destroy();
    }).on("error", function(e) {
      const endMs = 0;
      const jsonDataType = "error";

      if (consoleResponse === true) {
        console.log(`
-----Informations concernant le serveur-----
          Ip : ${item[0]} 
          Port : ${item[1]} 
          Statut : Indisponible
          Erreur : ${e.message}`);
      } else {
        return;
      };
      jsonWriteData(jsonDataType, endMs);
    }).on("timeout", function(e) {
      const endMs = 0;
      const jsonDataType = "timeout";

      if (consoleResponse === true) {
        console.log(`
-----Informations concernant le serveur-----
          Ip : ${item[0]} 
          Port : ${item[1]} 
          Statut : Connexion dépassé (timeout)`);
      } else {
        return;
      };
      jsonWriteData(jsonDataType, endMs);
    }).connect(item[1], item[0]);
  });
};

function getType() {
  const fs = require("fs");

  fs.readFile('./json/data.json', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data.toString());
    console.log(jsonData.type);
  });
}

function getMs() {
  const fs = require("fs");

  fs.readFile('./json/data.json', 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data.toString());
    console.log(jsonData.ms);
  });
}

module.exports = status;
module.exports.getType = getType;
module.exports.getMs = getMs;