const fs = require('fs')
const chalk = require('chalk')

function getNotes() {
    var notes = readNotesFromDisk();
    
    for (i=0; i<notes.length; i++)
        console.log(`Title=${notes[i].title} Body=${notes[i].body}`);

    debugger
    
    console.log('FORMAT');
    notes.forEach(element => {
        console.log(element.title);
    })
}

function readNote(title) {
    var notes = readNotesFromDisk();   
    var note = notes.find(element => element.title === title);

    if (note === undefined) {
        console.error(chalk.red(`there is no note with title ${title}`));
    }
    else {
        console.log(`title=${note.title} body=${note.body}`);
    }
}

function addNote(title, body) {
    console.log(`[notes::addNotes] Title:${title} Body:${body}`)
    var notes = readNotesFromDisk();
    if (checkDuplicate(notes, title) == true) {
        console.log(chalk.red(`title ${title} already in use!`));
    }
    else {
        notes.push({
            title: title,
            body: body            
        });
        saveNotesToDisk(notes);    
    }
}
/**
 * 
 * @param {title to remove} title 
 */
function removeNote(title) {
 //   console.log(`[notes::removeNote] Title:${title}`)
    var notes = readNotesFromDisk()

    //check if the array has the note with given title
    var index2Remove = -1;
    for (i=0; i<notes.length; i++) {
        if (notes[i].title === title) {
            index2Remove = i;
            break;
        }
    }
    if (index2Remove < 0) {
        console.warn(chalk.red.bold(`[noteModule::removeNote] cannot find the note to remove with title: ${title}`));
        return;
    }
    else {
        notes[index2Remove] = notes[notes.length-1];
        notes.pop();
        saveNotesToDisk(notes);
        console.log(chalk.green.bold(`[noteModule::removeNote] Removed the note with title: ${title}`));
    }
}

function checkDuplicate(notes, title) {
    
    for (i=0; i<notes.length; i++) {
        //console.log(`note#${i}: ${notes[i].title} ${notes[i].body}`);
        if (notes[i].title === title)
            return true;        
    }
    return false;
}

const fileName = "notes.json";

function saveNotesToDisk(notes) {

    if (notes === undefined) {
        console.error(chalk.red.bold("no notes provided!"));
        return;
    }

    var notesJson = JSON.stringify(notes);    
    fs.writeFileSync(fileName, notesJson)
    console.log(chalk.blue("[notes::saveNotesToDisk]Notes file updated"));
}

function readNotesFromDisk() {
    try {
        var buffer = fs.readFileSync(fileName);
        var notes = JSON.parse(buffer.toString());
        return notes;
    }
    catch (e) {
        //console.error("[readNotesFromDisk]" + e.toString());
        return [];
    }
}

//module.exports.getNotes = getNotes;
module.exports = {
    getNotes:   getNotes,
    addNote:    addNote,
    removeNote: removeNote,
    readNote: readNote
};