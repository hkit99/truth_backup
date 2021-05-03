const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const crawlChannelData = async(nextToken)=>{
    let baseUrl = "https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UC6of7UYhctnYmqABjUqzuxw&maxResults=25&key="+process.env.API_KEY;
    if(nextToken) baseUrl = baseUrl+'&pageToken='+nextToken;
    axios.get(baseUrl)
    .then(async(response)=>{
      // handle success
      console.log(response.data.items);
      let rawdata = fs.readFileSync('./json/rthk.json');
      let videos_list = JSON.parse(rawdata);
      const newJson = videos_list.concat(response.data.items);
      fs.writeFileSync('./json/rthk.json', JSON.stringify(newJson));
    //   console.log('New Json',newJson);
      if(response.data.nextPageToken){
          await crawlChannelData(response.data.nextPageToken);
      } else {
          return true;
      }
      return (response.data.nextPageToken) ? response.data.nextPageToken : null;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

const main = async()=>{
    const crawlRes = await crawlChannelData(null);
}

main();