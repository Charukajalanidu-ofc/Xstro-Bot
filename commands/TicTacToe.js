/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : @samapndey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

 const { cmd, parseJid,getAdmin,tlang } = require("../lib/");
 const eco = require('discord-mongoose-economy')
 const ty = eco.connect(mongodb);
cmd(
  {
    pattern: "delttt",
    desc: "deletes TicTacToe running session.",
    filename: __filename,
    category: "game",
  },
  async (Void,xstro,text,{isCreator}) => {
        if (!xstro.isGroup) return xstro.reply(tlang().group);
        const groupMetadata = xstro.isGroup ? await Void.groupMetadata(xstro.chat).catch((e) => {}) : "";
        const participants = xstro.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, xstro)
        const isAdmins = xstro.isGroup ? groupAdmins.includes(xstro.sender) : false;
        if(!isAdmins && !isCreator) return xstro.reply('This command is only for Group Admin and my owner.')
         this.game = this.game ? this.game : false
         if (
        Object.values(this.game).find(
          (room) =>
            room.id.startsWith("tictactoe")
        )
      ) {
        delete this.game
        return xstro.reply(`_Successfully Deleted running TicTacToe game._`);
        } else {
              return xstro.reply(`No TicTacToe game🎮 is running.`)
                    
        }
  })
  
cmd(
  {
    pattern: "ttt",
    desc: "Play TicTacToe",
    filename: __filename,
    category: "game",
  },
  async (Void,xstro,text) => {
    if (!xstro.isGroup) return xstro.reply(tlang().group);
    let {prefix} = require('../lib')
    {
      let TicTacToe = require("../lib/ttt");
      this.game = this.game ? this.game : {};
      if (
        Object.values(this.game).find(
          (room) =>
            room.id.startsWith("tictactoe") &&
            [room.game.playerX, room.game.playerO].includes(xstro.sender)
        )
      )
        return xstro.reply("_A game is already going on_");
      let room = Object.values(this.game).find(
        (room) =>
          room.state === "WAITING" && (text ? room.name === text : true)
      );
      if (room) {
        room.o = xstro.chat;
        room.game.playerO = xstro.sender || xstro.mentionedJid[0] 
        room.state = "PLAYING";
        let arr = room.game.render().map((v) => {
          return {
            X: "❌",
            O: "⭕",
            1: "1️⃣",
            2: "2️⃣",
            3: "3️⃣",
            4: "4️⃣",
            5: "5️⃣",
            6: "6️⃣",
            7: "7️⃣",
            8: "8️⃣",
            9: "9️⃣", 
          }[v];
        });
        let str = `
Current turn: @${room.game.currentTurn.split("@")[0]}
Room ID: ${room.id}
${arr.slice(0, 3).join("  ")}
${arr.slice(3, 6).join("  ")}
${arr.slice(6).join("  ")}
`;

        return await Void.sendMessage(xstro.chat, {
          text: str,
          mentions: [room.game.currentTurn],
        });
      } else {
        room = {
          id: "tictactoe-" + +new Date(),
          x: xstro.chat,
          o: "",
          game: new TicTacToe(xstro.sender, "o"),
          state: "WAITING",
        };
        if (text) room.name = text;
        xstro.reply("_Waiting for player,use .ttt to join this game._ ");
        this.game[room.id] = room;
      }
    }
  }
);

cmd(
  {
    on: "text"
  },
  async (Void,xstro,text) => {
    if(!xstro.isGroup) return
    let {prefix} = require('../lib')
    this.game = this.game ? this.game : {};
    let room = Object.values(this.game).find(
      (room) =>
        room.id &&
        room.game &&
        room.state &&
        room.id.startsWith("tictactoe") &&
        [room.game.playerX, room.game.playerO].includes(xstro.sender) &&
        room.state == "PLAYING"
    );

    if (room) {
      let ok;
      let isWin = !1;
      let isTie = !1;
      let isSurrender = !1;
      if (!/^([1-9]|(me)?give_up|surr?ender|off|skip)$/i.test(xstro.text)) return;
      isSurrender = !/^[1-9]$/.test(xstro.text);
      if (xstro.sender !== room.game.currentTurn) {
        if (!isSurrender) return !0;
      }
      if (
        !isSurrender &&
        1 >
          (ok = room.game.turn(
            xstro.sender === room.game.playerO,
            parseInt(xstro.text) - 1
          ))
      ) {
        xstro.reply(
          {
            "-3": "The game is over.",
            "-2": "Invalid",
            "-1": "_Invalid Position_",
            0: "_Invalid Position_",
          }[ok]
        );
        return !0;
      }
      if (xstro.sender === room.game.winner) isWin = true;
      else if (room.game.board === 511) isTie = true;
      let arr = room.game.render().map((v) => {
        return {
          X: "❌",
          O: "⭕",
          1: "1️⃣",
          2: "2️⃣",
          3: "3️⃣",
          4: "4️⃣",
          5: "5️⃣",
          6: "6️⃣",
          7: "7️⃣",
          8: "8️⃣",
          9: "9️⃣",
        }[v];
      });
      if (isSurrender) {
        room.game._currentTurn = xstro.sender === room.game.playerX;
        isWin = true;
      }
      let winner = isSurrender ? room.game.currentTurn : room.game.winner;
      let str = `Room ID: ${room.id}
      
${arr.slice(0, 3).join("  ")}
${arr.slice(3, 6).join("  ")}
${arr.slice(6).join("  ")}
${
  isWin
    ? `@${winner.split("@")[0]} Won ! and got 2000💎 in wallet🤑`
    : isTie
    ? `Game Tied,well done to both of you players.`
    : `Current Turn ${["❌", "⭕"][1 * room.game._currentTurn]} @${
        room.game.currentTurn.split("@")[0]
      }`
}
⭕:- @${room.game.playerO.split("@")[0]}
❌:- @${room.game.playerX.split("@")[0]}`;

      if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== xstro.chat)
        room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = xstro.chat;
        if(isWin){
        await eco.give(xstro.sender, "secktor", 2000);
        }
      if (isWin || isTie) {
        await Void.sendMessage(xstro.chat, {
          text: str,
          mentions: [room.game.playerO,room.game.playerX],
        });
      } else {
        await Void.sendMessage(xstro.chat, {
          text: str,
          mentions: [room.game.playerO,room.game.playerX],
        });
      }
      if (isTie || isWin) {
        delete this.game[room.id];
      }
    }
  }
);

cmd({ pattern: "ship" , category: "fun" }, async(Void, xstro, text) => {
    const { tlang } = require('../lib')
   if (!xstro.isGroup) return xstro.reply(tlang().group);
   const groupMetadata = xstro.isGroup ? await Void.groupMetadata(xstro.chat).catch((e) => {}) : "";
	 const participants = xstro.isGroup ? await groupMetadata.participants : "";
   let members = participants.map(u => u.id)
   const percentage = Math.floor(Math.random() * 100)
    async function couple(percent) {
         var text;
        if (percent < 25) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\tThere's still time to reconsider your choices`
        } else if (percent < 50) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t Good enough, I guess! 💫`
        } else if (percent < 75) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\t\t\tStay together and you'll find a way ⭐️`
        } else if (percent < 90) {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tAmazing! You two will be a good couple 💖 `
        } else {
            text = `\t\t\t\t\t*ShipCent : ${percentage}%* \n\tYou two are fated to be together 💙`
        }
        return text
        }
       var user = xstro.mentionedJid ? xstro.mentionedJid[0] : xstro.msg.contextInfo.participant || false;
       var shiper;
       if (user) {
       shiper = user
       } else {
       shiper = members[Math.floor(Math.random() * members.length)]
       }
       let caption = `\t❣️ *Matchmaking...* ❣️ \n`
        caption += `\t\t✯────────────────────✯\n`
        caption += `@${xstro.sender.split('@')[0]}  x  @${shiper.split('@')[0]}\n`
        caption += `\t\t✯────────────────────✯\n`
        caption += await couple(percentage)
        if(xstro.sender.split('@')[0]===shiper.split('@')[0]) return xstro.reply('```'+'Wait... What!!!,You wanna do matchmaking with yourself'+'```')
        await Void.sendMessage(xstro.chat,{text: caption,mentions: [xstro.sender,shiper]},{quoted:xstro})
   }
)
// IDEA of Shipcent from => https://github.com/iamherok/WhatsApp-Botto-Ruka/blob/master/handler/message.js#L842
