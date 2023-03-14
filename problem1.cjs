/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/


const { rejects } = require('assert');
const { resolveCname } = require('dns/promises');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

function createDirectoryAndDeleteTheDirectoryFiles() {

    let directoryName = './createdDirectory';
    let fileRefrenceArray = new Array(10);
    fileRefrenceArray.fill(0);

    function creatingDirectory(directoryName) {

        return new Promise((resolve, rejects) => {

            fs.mkdir(path.join(__dirname, directoryName), (error) => {

                if (error) {

                    rejects(error);

                } else {

                    resolve('directory created');

                }

            });

        });

    }

    let createdDirectory = creatingDirectory(directoryName);

    createdDirectory.then((data) => {

        console.log(data.toString());

    });

    function filesCreation(fileRefrenceArray) {

        return new Promise((resolve, rejects) => {

            let creationMessage = fileRefrenceArray.map((elment, index, array) => {

                fs.writeFile(

                    `${path.join(__dirname, `${directoryName}`,
                        `file${index + 1}.json`)}`,

                    JSON.stringify({ 'name': 'Sanjeev', 'roll_no': 100 }),

                    (error) => {

                        if (error) {

                            rejects(error);

                        } else {

                            resolve('files created');

                        }

                    });

                return 'All files created';

            });

        });

    }

    let fileCreated = filesCreation(fileRefrenceArray);

    fileCreated.then((message) => {

        console.log(message);

    });

    function fileDeletion(fileName) {

        return new Promise((resolve, rejects) => {

            fs.unlink(fileName, (error) => {

                if (error) {

                    rejects(error);

                } else {

                    resolve('files deleted');

                }

            });

        });

    }

    let message = fileRefrenceArray.map((nums, index) => {

        fileDeletion(`${path.join(__dirname, `${directoryName}`,
            `file${index + 1}.json`)}`);

        return 'Files deleted';

    });

    console.log(message);

}

module.exports = createDirectoryAndDeleteTheDirectoryFiles;