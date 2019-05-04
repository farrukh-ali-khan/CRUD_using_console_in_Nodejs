const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

crud();
function crud() {
    readline.question('Choose the option?\n1: Create\n2: Read\n3: Update\n4: Delete\n5: Close the program\nOption = ', function (option) {
        // Create
        if (Number(option) === 1) {
            readline.question('File name you want to create = ', (fname) => {
                readline.question('Enter Data in File = ', (data) => {
                    fs.writeFileSync(`${fname}.txt`, data);
                    fs.readFile(`${fname}.txt`, (err, data) => {
                        console.log(`File "${fname}" create with data = ` + data);
                        crud();
                    });
                });
            });
        }
        // Read
        else if (Number(option) === 2) {
            readline.question('File name you want to read = ', (file) => {
                fs.readFile(`${file}.txt`, (err, data) => {
                    console.log(`Current data in "${file}" file = ` + data);
                    crud();
                });
            })
        }
        // Update
        else if (Number(option) === 3) {
            readline.question('File name you want to update = ', (upfile) => {
                if (fs.existsSync(`${upfile}.txt`)) {
                    readline.question('Data you want to update = ', (updata) => {
                        fs.writeFileSync(`${upfile}.txt`, updata);
                        fs.readFile(`${upfile}.txt`, (err, data) => {
                            console.log(`Updated data in "${upfile}" file with data = ` + data);
                            crud();
                        });
                    });
                } else {
                    console.log('File doesn\'t exist');
                    crud();
                }
            })
        }
        else if (Number(option) === 4) {
            readline.question('File name you want to delete = ', (dfname) => {
                fs.unlink(`${dfname}.txt`, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                    crud();
                });
            })
        } else if (Number(option) === 5) {
            console.log('Program Closed');
            readline.close();
        } else {
            console.log('Wrong option');
            crud();
        }
    });
}