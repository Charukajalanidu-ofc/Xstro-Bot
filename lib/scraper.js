const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const cheerio = require("cheerio");
const { spawn } = require("child_process");
const fetch = require('node-fetch');
let BodyForm = require("form-data");
const FormData = require('form-data');

async function pinterest(query) {
  try {
    const response = await axios.get(`https://api.maher-zubair.tech/search/pinterest?q=${query}`);
    
    if (response.status === 200) {
      const data = response.data;
      const images = data.result;
      
      // Manipulate the URLs as needed
      const processedImages = images.map(url => url.replace(/236/g, "736"));
      
      return processedImages;
    } else {
      throw new Error('Failed to fetch data from Pinterest API');
    }
  } catch (error) {
    console.error('Error fetching Pinterest data:', error);
    throw error;
  }
}

async function wallpaper(title, page = "1") {
  try {
    const response = await fetch(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch wallpaper data. Status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const hasil = [];
    
    $("div.grid-item").each((a, b) => {
      const title = $(b).find("div.info > a > h3").text();
      const type = $(b).find("div.info > a:nth-child(2)").text();
      const source = "https://www.besthdwallpaper.com/" + $(b).find("div > a:nth-child(3)").attr("href");
      const image = [
        $(b).find("picture > img").attr("data-src") || $(b).find("picture > img").attr("src"),
        $(b).find("picture > source:nth-child(1)").attr("srcset"),
        $(b).find("picture > source:nth-child(2)").attr("srcset"),
      ];
      
      hasil.push({ title, type, source, image });
    });
    
    return hasil;
  } catch (error) {
    console.error('Error fetching wallpaper data:', error);
    throw error;
  }
}

async function TelegraPh(Path) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(Path)) return reject(new Error("File not Found"));
    
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(Path));
      
      const response = await fetch("https://telegra.ph/upload", {
        method: "POST",
        headers: {
          ...form.getHeaders()
        },
        body: form
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }
      
      const data = await response.json();
      resolve("https://telegra.ph" + data[0].src);
    } catch (err) {
      reject(new Error(String(err)));
    }
  });
}


async function UploadFileUgu(input) {
	return new Promise(async (resolve, reject) => {
	  const form = new FormData();
	  form.append("files[]", fs.createReadStream(input));
	  
	  try {
		const response = await fetch("https://uguu.se/upload.php", {
		  method: "POST",
		  headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
			...form.getHeaders()
		  },
		  body: form
		});
		
		if (!response.ok) {
		  throw new Error(`Failed to upload file: ${response.statusText}`);
		}
		
		const data = await response.json();
		resolve(data.files[0]);
	  } catch (err) {
		reject(err);
	  }
	});
  }
  

  async function webp2mp4File(path) {
	return new Promise(async (resolve, reject) => {
	  const form = new FormData();
	  form.append("new-image-url", "");
	  form.append("new-image", fs.createReadStream(path));
	  
	  try {
		const response = await fetch("https://s6.ezgif.com/webp-to-mp4", {
		  method: "POST",
		  body: form,
		  headers: {
			"Content-Type": `multipart/form-data; boundary=${form.getBoundary()}`
		  }
		});
		
		if (!response.ok) {
		  throw new Error(`Failed to convert WebP to MP4: ${response.statusText}`);
		}
		
		const html = await response.text();
		const $ = cheerio.load(html);
		const file = $('input[name="file"]').attr("value");
		
		const bodyFormThen = new FormData();
		bodyFormThen.append("file", file);
		bodyFormThen.append("convert", "Convert WebP to MP4!");
		
		const responseThen = await fetch(`https://ezgif.com/webp-to-mp4/${file}`, {
		  method: "POST",
		  body: bodyFormThen,
		  headers: {
			"Content-Type": `multipart/form-data; boundary=${bodyFormThen.getBoundary()}`
		  }
		});
		
		if (!responseThen.ok) {
		  throw new Error(`Failed to convert WebP to MP4: ${responseThen.statusText}`);
		}
		
		const htmlThen = await responseThen.text();
		const $$ = cheerio.load(htmlThen);
		const result = "https:" + $$('div#output > p.outfile > video > source').attr('src');
		
		resolve({
		  status: true,
		  message: 'Created By Secktor Botto',
		  result: result
		});
	  } catch (err) {
		reject(err);
	  }
	});
  }
  

  async function wikimedia(title) {
	return new Promise(async (resolve, reject) => {
	  try {
		const response = await fetch(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`);
		
		if (!response.ok) {
		  throw new Error(`Failed to fetch Wikimedia data: ${response.statusText}`);
		}
		
		const html = await response.text();
		const $ = cheerio.load(html);
		
		const hasil = [];
		$(".sdms-search-results__list-wrapper > div > a").each((a, b) => {
		  const title = $(b).find("img").attr("alt");
		  const source = $(b).attr("href");
		  const image = $(b).find("img").attr("data-src") || $(b).find("img").attr("src");
		  
		  hasil.push({ title, source, image });
		});
		
		resolve(hasil);
	  } catch (err) {
		reject(err);
	  }
	});
  }
  

function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
 return new Promise(async (resolve, reject) => {
  try {
   let tmp = path.join(__dirname, "./", +new Date() + "." + ext);
   let out = tmp + "." + ext2;
   await fs.promises.writeFile(tmp, buffer);
   spawn("ffmpeg", ["-y", "-i", tmp, ...args, out])
    .on("error", reject)
    .on("close", async code => {
     try {
      await fs.promises.unlink(tmp);
      if (code !== 0) return reject(code);
      resolve(await fs.promises.readFile(out));
      await fs.promises.unlink(out);
     } catch (e) {
      reject(e);
     }
    });
  } catch (e) {
   reject(e);
  }
 });
}
/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
function toAudio(buffer, ext) {
 return ffmpeg(buffer, ["-vn", "-ac", "2", "-b:a", "128k", "-ar", "44100", "-f", "mp3"], ext, "mp3");
}
/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
function toPTT(buffer, ext) {
 return ffmpeg(buffer, ["-vn", "-c:a", "libopus", "-b:a", "128k", "-vbr", "on", "-compression_level", "10"], ext, "opus");
}
/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension
 */
function toVideo(buffer, ext) {
 return ffmpeg(buffer, ["-c:v", "libx264", "-c:a", "aac", "-ab", "128k", "-ar", "44100", "-crf", "32", "-preset", "slow"], ext, "mp4");
}

const Config = require("../config");
if (fs.existsSync("./src/" + Config.LANG + ".json")) {
 var json = JSON.parse(fs.readFileSync("./src/" + Config.LANG + ".json"));
} else {
 var json = JSON.parse(fs.readFileSync("./src/main.json"));
}

async function ffancy(teks) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`http://qaz.wtf/u/convert.cgi?text=${encodeURIComponent(teks)}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch fancy text data: ${response.statusText}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      const hasil = [];
      $("table > tbody > tr").each((a, b) => {
        const name = $(b).find("td:nth-child(1) > span").text();
        const result = $(b).find("td:nth-child(2)").text().trim();
        hasil.push({ name, result });
      });
      
      resolve(hasil);
    } catch (err) {
      reject(err);
    }
  });
}


async function fancy(teks, num) {
 try {
  let huhh = await ffancy(teks);
  return huhh[num].result;
 } catch (e) {
  console.log(e);
 }
}
async function randomfancy(teks, num) {
 try {
  let huhh = await ffancy(teks);
  return huhh[num].result;
 } catch (e) {
  console.log(e);
 }
}
function getString(file) {
 return json["STRINGS"][file];
}
function tlang() {
 let LangG = getString("global");
 return LangG;
}
function botpic() {
 return new Promise((resolve, reject) => {
  let LangG = getString("global");
  let todlink = [`${LangG.pic1}`, `${LangG.pic2}`, `${LangG.pic3}`, `${LangG.pic4}`, `${LangG.pic5}`, `${LangG.pic6}`];
  const picsecktorh = todlink[Math.floor(Math.random() * todlink.length)];
  resolve(picsecktorh);
 });
}
async function checkcard(id) {
 let cdata = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
 return cdata.data.data[0];
}
async function updatedb() {
 const simpleGit = require("simple-git");
 const git = simpleGit();
 const Heroku = require("heroku-client");
 const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
 await git.fetch();
 var commits = await git.log(["main" + "..origin/" + "main"]);
 if (commits.total === 0) {
  return "ʏᴏᴜ..ʜᴀᴠᴇ...ᴀʟʀᴇᴅʏ..ᴜᴘᴅᴀᴛᴇᴅ...";
 } else {
  var app = await heroku.get("/apps/" + process.env.HEROKU_APP_NAME);
  git.fetch("upstream", "main");
  git.reset("hard", ["FETCH_HEAD"]);

  var git_url = app.git_url.replace("https://", "https://api:" + process.env.HEROKU_API_KEY + "@");
  try {
   await git.addRemote("heroku", git_url);
  } catch {
   console.log("heroku remote adding error");
  }
  await git.push("heroku", "main");

  return "*ʙᴏᴛ ᴜᴘᴅᴀᴛᴇᴅ...*\n_Restarting._";
 }
}
const fetch = require('node-fetch');

async function claim(id, user) {
  try {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch card data: ${response.statusText}`);
    }
    
    const cdata = await response.json();
    const data = cdata.data[0]; // Assuming the structure of the response remains the same
    
    // Assuming `card` is a model for saving data
    const { card } = require("./path_to_card_model"); // Replace with the correct path
    
    // Save card data to database
    await new card({
      user: user,
      id: data.id,
      name: data.name,
      desc: data.desc,
      atk: data.atk,
      def: data.def,
      race: data.race,
      image: data.card_images[0].image_url,
      price: data.card_prices[0].amazon_price * 1000,
    }).save();
    
    return data;
  } catch (error) {
    throw new Error(`Error in claim function: ${error.message}`);
  }
}

async function collection(h) {
 const { card } = require(".");
 let getGroups = await card.find().where("user").in(h);
 return getGroups;
}
async function install(h) {
 let huh = require("fs");
 let AxiosData = await axios.get(h);
 let data = AxiosData.data;
 let fname = await huh.writeFileSync(__dirname + "/../commands/System/1.js", data, "utf8");
 console.log("fname " + fname);
 const command = require(__dirname + "/../commands/System/1.js", data, "utf8");
 console.log("command " + command.name);
 const { plugindb } = require(".");
 await new plugindb({
  id: command.name,
  url: h,
 }).save();
 fs.unlinkSync(fname);
 return command.name;
}
async function remove(h) {
 var jj;
 try {
  const { plugindb } = require(".");
  await plugindb.findOneAndDelete({
   id: h,
  });
  jj = `Plugin ${h} deleted from mongodb.`;
 } catch {
  jj = "No such plugins installed.";
 }
 return jj;
}
async function allnotes() {
 const { notes } = require(".");
 let leadtext = ` `;
 let check = await notes.find({});
 for (let i = 0; i < check.length; i++) {
  let gudbmro = i;
  leadtext += `${gudbmro + 1} *ID:-* ${check[i].id}\n*Note:-* ${check[i].note}\n\n`;
 }
 return leadtext;
}
async function plugins() {
 const { plugindb } = require(".");
 let check = await plugindb.find({});
 let h = " ";
 for (let i = 0; i < check.length; i++) {
  let duh = check[i].url;
  let gudbmro = i;
  h += `*${gudbmro + 1}:-* ${check[i].id} \n*URL:* ${check[i].url}\n\n`;
 }
 return h;
}
async function addnote(text) {
 const { notes } = require(".");
 let idd = await notes.countDocuments();
 await new notes({
  id: idd + 1,
  note: text,
 }).save();
 return;
}
async function delallnote() {
 const { notes } = require(".");
 await notes.collection.drop();
 return;
}
async function delnote(id) {
 const { notes } = require(".");
 await notes.deleteOne({
  id: id,
 });
 return;
}
async function divorce(id) {
 const { haigu } = require(".");
 let idd = await haigu.findOne({ id: id });
 await haigu.deleteOne({
  id: idd,
 });
}

async function checkmarried(id) {
 const { Character } = require("mailist");
 const { haigu } = require(".");
 let idd = await haigu.findOne({ id: id });
 let gg = idd.haig;
 //  console.log(gg)
 const client = new Character();
 const chara = await client.character(gg).catch(err => {
  data2 = "No haigusha for uh";
  return data2;
 });
 let texty = "";
 texty += `*🏮Name:* ${chara.data.characters.results[0].name.full}*\n`;
 texty += `*🌐Source:* ${chara.data.characters.results[0].media.edges[0].node.title.userPreferred}*\n\n`;
 texty += `*📶URL:* ${chara.data.characters.results[0].siteUrl}*\n\n`;
 const { data: char } = (await axios.get(`https://api.jikan.moe/v4/characters?q=${chara.data.characters.results[0].name.full}`)).data;
 const { data: anime } = (await axios.get(`https://api.jikan.moe/v4/characters/${char[0].mal_id}/anime`)).data;
 const { data: voice } = (await axios.get(`https://api.jikan.moe/v4/characters/${char[0].mal_id}/voices`)).data;
 let data2 = `*🏮Name:* ${char[0].name}\n*🎗About:* ${char[0].about}\n*🔍MAL_ID:* ${char[0].mal_id}\n🔗 *URL:*  ${chara.data.characters.results[0].siteUrl}\n`;
 return data2;
}
async function marry(id, text) {
 const { haigu } = require(".");
 await new haigu({
  id: id,
  haig: text,
 }).save();
}
async function isAdmin(Void, jid, sender) {
 const groupMetadata = xstro.isGroup ? await Void.groupMetadata(jid).catch(e => {}) : "";
 const participants = xstro.isGroup ? await groupMetadata.participants : "";
 const groupAdminss = participants => {
  admins = [];
  for (let i of participants) {
   i.admin === "admin" || i.admin === "superadmin" ? admins.push(i.id) : "";
  }
  return admins;
 };
 const groupAdmins = xstro.isGroup ? await groupAdminss(participants) : "";
 const isAdmins = xstro.isGroup ? groupAdmins.includes(sender) : false;
 return isAdmins;
}

async function isBotAdmin(Void, jid, sender) {
 const groupMetadata = xstro.isGroup ? await Void.groupMetadata(xstro.chat).catch(e => {}) : "";
 const participants = xstro.isGroup ? await groupMetadata.participants : "";
 const groupAdminss = participants => {
  admins = [];
  for (let i of participants) {
   i.admin === "admin" || i.admin === "superadmin" ? admins.push(i.id) : "";
  }
  return admins;
 };
 const groupAdmins = xstro.isGroup ? await groupAdminss(participants) : "";
 const botNumber = await Void.decodeJid(Void.user.id);
 const isBotAdmins = xstro.isGroup ? groupAdmins.includes(botNumber) : false;
 return isBotAdmins;
}

async function syncgit() {
 const simpleGit = require("simple-git");
 const git = simpleGit();
 await git.fetch();
 var commits = await git.log(["main" + "..origin/" + "main"]);
 return commits;
}
async function sync() {
 const simpleGit = require("simple-git");
 const git = simpleGit();
 await git.fetch();
 var commits = await git.log(["main" + "..origin/" + "main"]);
 const { prefix } = require("../config");
 var availupdate = "ᴜᴘᴅᴀᴛᴇ ᴀᴠᴀɪʟᴀʙʟᴇ";
 commits["all"].map(commit => {
  availupdate += "● [" + commit.date.substring(0, 10) + "]: " + commit.message + "\n- By:" + commit.author_name + "\n";
 });
 return availupdate;
}
async function Insta(match) {
  const result = [];

  try {
    const response = await axios.get(`https://api.maher-zubair.tech/download/instagram?url=${match}`);
    
    if (response.status === 200) {
      const data = response.data;
      
      // Assuming 'result' array is directly under 'data.result'
      if (data.status === 200 && Array.isArray(data.result)) {
        data.result.forEach(item => {
          if (item.url) {
            result.push(item.url);
          }
        });
      } else {
        throw new Error('Invalid response structure from API');
      }
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching Instagram data:', error.message);
    // Handle error as needed
  }

  return result;
}

async function twitter(tweetUrl) {
  try {
    const response = await fetch(`https://api.maher-zubair.tech/download/twitter?url=${encodeURIComponent(tweetUrl)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from API: ${response.statusText}`);
    }

    const json = await response.json();

    const result = {
      HD: json.data.HD,
      username: json.data.username,
      caption: json.data.caption,
      thumbnail: json.data.thumbnail,
    };

    return result;

  } catch (error) {
    console.error('Error fetching Twitter data:', error.message);
    throw error;
  }
}

// Example usage:
const tweetUrl = 'https://twitter.com/Ibai/status/1569798259333275653';
twitter(tweetUrl).then(data => {
  console.log('Twitter data:', data);
}).catch(err => {
  console.error('Error:', err);
});

async function facebook(Link) {
    try {
        const apiUrl = `https://api-smd.onrender.com/api/fbdown?url=${encodeURIComponent(Link)}`;
        const response = await fetch(apiUrl);
        const responseData = await response.json();

        // Extracting relevant data from the API response
        const { Normal_video, HD, audio } = responseData.result;

        // Creating the result object in the desired format
        const result = {
            status: true,
            result: {
                link_hd: HD,
                audio: audio,
                normal: Normal_video,
            }
        };

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { status: false, error: error.message }; // Handle errors appropriately
    }
}

function Igstory(username) {
 return new Promise(async (resolve, reject) => {
  axios
   .request({
    url: "https://www.instagramsave.com/instagram-story-downloader.php",
    method: "GET",
    headers: {
     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
     cookie:
      "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
    },
   })
   .then(({ data }) => {
    const $ = cheerio.load(data);
    const token = $("#token").attr("value");
    let config = {
     headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      cookie:
       "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
     },
     data: {
      url: "https://www.instagram.com/" + username,
      action: "story",
      token: token,
     },
    };
    axios.post("https://www.instagramsave.com/system/action.php", qs.stringify(config.data), { headers: config.headers }).then(({ data }) => {
     resolve(data.medias);
    });
   })
   .catch(reject);
 });
}
module.exports = {
 Insta,
 Igstory,
 ttdl: twitter,
 fbdl: facebook,
 pinterest,
 delallnote,
 marry,
 checkmarried,
 divorce,
 addnote,
 claim,
 install,
 allnotes,
 remove,
 plugins,
 tlang,
 collection,
 checkcard,
 botpic,
 language: json,
 getString: getString,
 wallpaper,
 delnote,
 wikimedia,
 toAudio,
 toPTT,
 toVideo,
 sync,
 syncgit,
 ffmpeg,
 updatedb,
 TelegraPh,
 UploadFileUgu,
 webp2mp4File,
 fancy,
 randomfancy,
};
