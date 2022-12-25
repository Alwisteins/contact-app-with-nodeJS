const { TulisPertanyaan, simpanContact } = require('./contacts');

const main = async() => {
  const nama = await TulisPertanyaan('Masukan nama anda : ');
  const email = await TulisPertanyaan ('Masukan email anda : ');
  const nomorHP = await TulisPertanyaan('Masukan nomor HP anda : ');
  
  simpanContact(nama, email, nomorHP);
}

main();