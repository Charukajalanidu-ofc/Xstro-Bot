const axios = require('axios');
const cheerio = require('cheerio');

const mediafireDl = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const downloadLink = $('a#downloadButton').attr('href');
    const downloadSize = $('a#downloadButton')
      .text()
      .replace('Download', '')
      .replace('(', '')
      .replace(')', '')
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const fileNameParts = downloadLink.split('/').pop().split('.');
    const fileName = fileNameParts.slice(0, -1).join('.');
    const fileExtension = fileNameParts.pop();

    const result = {
      name: fileName,
      size: downloadSize,
      date: new Date().toISOString(),
      mime: getMimeType(fileExtension),
      link: downloadLink,
    };

    return result;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};

const getMimeType = (extension) => {
  const mimeTypes = {
    rar: 'application/x-rar',
    zip: 'application/zip',
    '7z': 'application/x-7z-compressed',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Add more extensions and MIME types as needed
  };

  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
};

module.exports = { mediafireDl, mediafire: mediafireDl };