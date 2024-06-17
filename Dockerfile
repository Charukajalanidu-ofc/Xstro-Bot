FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/AstroLegends/Xstro-Bot /root/bot
WORKDIR /root/bot/
RUN npm install npm@latest
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
