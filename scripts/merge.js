// const path = require("path");
// const fs = require("fs");

import path from 'path';
import fs from 'fs';

const root = path.resolve("./", "api");
const update = () => 
{
    const api = fs.readdirSync(root).reduce((api, file) => {
      if (api === undefined)
        api = {};

      if (path.extname(file) == ".json") {
        const endpoint = path.basename(file, path.extname(file));

        if (api[endpoint] === undefined)
          api[endpoint] = {};

        api[endpoint] = JSON.parse(fs.readFileSync(root + "/" + file, "utf-8"));
        return api;
      }
    }, {});

    fs.writeFile(root + "/../merged.json", JSON.stringify(api), err => {
      if (err)
          throw err;
    });
}

// 初回作成
update();

// jsonファイルを監視し, 監視ファイルに更新があるたびmerged.jsonを更新
fs.watch(root, (e, filename) => update());