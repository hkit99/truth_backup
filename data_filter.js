const fs = require('fs');

const main = async()=>{
    let rawdata = fs.readFileSync('./json/rthk.json');
    let videos_list = JSON.parse(rawdata);
    let filterList = [];
    videos_list.map((video)=>{
        if(video.snippet.title.includes("鏗鏘")){
            filterList = filterList.concat([video]);
        }
    })
    fs.writeFileSync('./json/rthk_鏗鏘.json', JSON.stringify(filterList));
}

main();