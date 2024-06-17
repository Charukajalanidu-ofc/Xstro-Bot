const {cmd } = require('../lib')
cmd({
        pattern: "insta",
        desc: "download instagram post.",
        category: "downloader",
        filename: __filename
    },
    async(Void, xstro,text,{isCreator}) => {
        const { Insta } = require('../lib')
if(!text) return xstro.reply('Need post url.')
let response = await Insta(text)
for (let i=0;i<response.length;i++) {
await Void.sendFileUrl(xstro.chat, response[i], `*Downloaded Media from instagram.*`, xstro)
}
    });
