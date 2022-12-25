const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./Contacts');

//menambahkan contact baru
yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'Nomor handphone',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    simpanContact(argv.nama, argv.email, argv.noHP);
  }
}).demandCommand();

//menampilkan daftar nama dan nomor contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan daftar contact',
  handler() {
    listContact();
  },
});

//menampilkan detail contact berdasarkan nama
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

//menghapus contact berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();