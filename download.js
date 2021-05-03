const fs = require('fs');
const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

const main = async()=>{
    let rawdata = fs.readFileSync('./json/rthk_鏗鏘.json');
    let videos_list = JSON.parse(rawdata);
    // let filterList = [];
    videos_list.map((video)=>{
      ytdl(video.id.videoId)
        .pipe(fs.createWriteStream('./download/'+video.id.videoId+'.mp4'));
    })
    // fs.writeFileSync('./json/rthk_鏗鏘.json', JSON.stringify(filterList));
}

main();