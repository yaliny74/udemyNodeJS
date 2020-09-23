const chalk = require('chalk');
const yargs = require('yargs')
const notesModule = require('./notes.js')

console.log(chalk.bold.blue('hello amk'));

yargs.command({
    command: 'add',
    describe: 'add amk',
    builder: {
        title: {
            describe: 'baslik amk',
            demandOption: true,
            type: 'string'
        },        
        body: {
            describe: 'note icerigi amk',
            demandOption: true,
            type: 'string'
        }       
    },
    handler: (argv) => notesModule.addNote(argv.title, argv.body)    
    /*
    handler: function(argv) {
        //console.log(`ekliyoruz amk title:${argv.title} body:${argv.body}`)        
        notesModule.addNote(argv.title, argv.body)
    }
    */   
});

yargs.command({
    command: 'list',
    describe: 'listele amk',
    handler() {
        notesModule.getNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'read the note',
    builder: {
        title: {
            describe: "title iste",
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => notesModule.readNote(argv.title)    
});

yargs.command({
    command: 'remove',
    describe: 'sil  amk',
    builder: {
        title: {
            describe: 'silinecek title amk',
            demandOption: true,
            type: 'string'
        },                    
    },    
    handler: (argv) => notesModule.removeNote(argv.title)
});

yargs.parse();