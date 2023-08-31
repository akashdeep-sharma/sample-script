var axios = require('axios');
const fs = require('fs');
var data = JSON.stringify({
  metafield: {
    namespace: 'facebookPixel',
    key: 'facebookPixelId',
    values: '[1]',
    type: 'number_integer',
  },
});
var config = {
  method: 'post',
  url: 'https://development-pixelify.myshopify.com/admin/api/2022-10/metafields.json',
  headers: {
    'X-Shopify-Access-Token': 'shpua_d00d339a0fcb26156e263f0b2058a3d2',
    'Content-Type': 'application/json',
  },
  data: data,
};
const session ={
    url:"development-pixelify.myshopify.com"
}
const replacePixel = async (pixelId, session) => {
    const config={
        method: 'get',
        url: `https://${session.url}/admin/api/2022-10/themes.json`,
        headers: {
          'X-Shopify-Access-Token': 'shpua_d00d339a0fcb26156e263f0b2058a3d2',
          'Content-Type': 'application/json',
        },
    }
  const {pixelTemplate} = JSON.parse(fs.readFileSync('./config.json'));
  console.log(pixelTemplate);
  finalPixel = await JSON.stringify(pixelTemplate).replace(
    '<YOUR-PIXEL-GOES-HERE>',
    1241241414
  );

  fs.writeFileSync('./finalPizel.js',finalPixel)
 
  const activeTheme =  () =>  axios(config).then((res)=>{
    console.log(res.data.themes)
return res.data.themes.filter(element=>{
  return element.role=='main'
})
  });
  async function getThemeBody (mainTheme)
  {
    console.log(mainTheme)
    const config={
      method: 'get',
      url: `https://development-pixelify.myshopify.com/admin/api/2022-10/themes/140576620833/assets.json?asset[key]=layout/theme.liquid`,
      headers: { 
        'X-Shopify-Access-Token': 'shpua_d00d339a0fcb26156e263f0b2058a3d2', 
        'Content-Type': 'application/json',
        'Accept-Encoding':'gzip,deflate,compress'
      }
    };
console.log("inside get thee")
let values;
await axios(config).then(res=>{
    values= res.data.asset.value
  })
return values;
  }
async function updateThemeWithPixel (){
  const mainTheme=await activeTheme()
  const themeBody = await getThemeBody(mainTheme[0])
  console.log(themeBody)
  fs.writeFileSync('./final.json',JSON.stringify(themeBody.replace('<head>','<head>'+finalPixel)))
  // fs.writeFileSync('./final.json',JSON.stringify(themeBody.replace('<head>','<head>'+finalPixel)))
  
  const config={
    method: 'get',
    url: ``,
    headers: {
      'X-Shopify-Access-Token': 'shpua_d00d339a0fcb26156e263f0b2058a3d2',
      'Content-Type': 'application/json',
    },
   
}


}
updateThemeWithPixel()
// const active=themes.filter((item)=>{
//   return item.role=='main'
// } )
// console.log(active())
}

replacePixel(12313,session)


