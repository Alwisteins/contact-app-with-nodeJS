const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

//MEMBUAT FOLDER DATA JIKA BELUM ADA
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
//MEMBUAT FILE JSON JIKA BELUM ADA
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

//data contacts atau muatan contacts.json
const loadContact = () => {
  const fileBuffer = fs.readFileSync('./data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

//MENYIMPAN CONTACT
const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();
  
  //VERIFIKASI CONTACT DUPLIKAT
  const nomorSama = contacts.find((contacts) => contacts.noHP === noHP);
  const namaSama = contacts.find((contacts) => contacts.nama === nama);
  
  if(nomorSama && namaSama){
    console.log(chalk.red.inverse.bold('Contact sudah terdaftar. Silahkan gunakan nomor dan nama yang lain!'));
    return false;
  }else if(nomorSama){
    console.log(chalk.red.inverse.bold('Contact sudah terdaftar. Silahkan gunakan nomor yang lain!'));
    return false;
  }else if(namaSama){
    console.log(chalk.red.inverse.bold('Contact sudah terdaftar. Silahkan gunakan nama lain!'));
    return false;
  }
  //VERIVIKASI EMAIL
  if(email){
    if(!validator.isEmail(email)){
      console.log(chalk.red.inverse.bold('Email tidak valid. Silahkan masukan email yang valid!'));
      return false;
    }
  }
  //VERIFIKASI NOMOR HP
  if(!validator.isMobilePhone(noHP, 'id-ID')){
      console.log(chalk.red.inverse.bold('Nomor tidak valid. Silahkan masukan nomor yang valid!'));
      return false;
    }

  contacts.push(contact);
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold('Terimakasih. Kontak anda berhasil disimpan'));
};

//melihat list contact
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold('Daftar kontak : '));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

//mencari detail contact berdasarkan nama
const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  
  if(!contact){
    console.log(chalk.red.inverse.bold(`Kontak dengan nama "${nama}" tidak ditemukan!`));
      return false;
  }
  
  console.log(chalk.green.inverse.bold(`Kontak dengan nama "${contact.nama}" ditemukan`));
  console.log(`Nomor: ${contact.noHP}`);
  if(contact.email){
    console.log(`Email: ${contact.email}`);
  }
}

//menghapus contact berdasarkan nama
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
  
  if(contacts.length === newContacts.length){
    console.log(chalk.red.inverse.bold(`Kontak dengan nama ${nama} tidak ditemukan!`));
      return false;
  }
  
  fs.writeFileSync('./data/contacts.json', JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold(`Terimakasih. Kontak dengan nama ${nama} berhasil dihapus`));
}

module.exports = { simpanContact, listContact, detailContact, deleteContact };