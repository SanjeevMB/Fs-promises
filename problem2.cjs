/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the lowerCaseContent, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.        
*/

const { rejects } = require('assert');
const { resolveSoa } = require('dns');
const fs = require('fs');
const { resolve } = require('path');

function readFile(fileName) {

    return new Promise((resolve, rejects) => {

        fs.readFile(fileName, (error, data) => {

            if (error) {

                rejects(error);

            } else {

                resolve(data);

            }

        });

    });

}

function writeFile(fileName, content) {

    return new Promise((resolve, rejects) => {

        fs.writeFile(fileName, content, (error) => {

            if (error) {

                rejects(error);

            } else {

                resolve(fileName);

            }

        });

    });

}

function appendFile(fileName, content) {

    return new Promise((resolve, rejects) => {

        fs.appendFile(fileName, content + '\n', (error) => {

            if (error) {

                rejects(error);

            } else {

                resolve(content);
            }

        });

    });

}

function deleteFile(fileName) {

    return new Promise((resolve, rejects) => {

        fs.unlink(fileName, (error) => {

            if (error) {

                rejects(error);

            } else {

                resolve(`${fileName} deleted`);

            }

        });

    });

}

function mainFunction() {

    let lipsumContent = readFile('./lipsum.txt')

    lipsumContent.then((data) => {

        let lipsumContent = data.toString();

        console.log(lipsumContent);

        let upperCaseContent = lipsumContent.toUpperCase();
        let upperCaseContentFile = 'upperCase.txt';

        let writeUpperCase = writeFile(upperCaseContentFile, upperCaseContent);

        appendFile('filename.txt', upperCaseContentFile);

        writeUpperCase.then((data) => {

            let upperCaseFile = data.toString();

            let readingUpperCaseContent = readFile(upperCaseFile)

            readingUpperCaseContent.then((data) => {

                let upperCaseContent = data.toString();

                console.log(upperCaseContent);

                let lowerCaseContent = upperCaseContent.toLowerCase()
                    .split('.')
                    .join('\n');

                let lowerCaseFile = 'lowerCase.txt';

                let writeLowerCase = writeFile(lowerCaseFile, lowerCaseContent);

                appendFile('filename.txt', lowerCaseFile);

                writeLowerCase.then((data) => {

                    let lowerCaseFile = data.toString();
                    let readingLowerCaseContent = readFile(lowerCaseFile);

                    readingLowerCaseContent.then((data) => {

                        let lowerCaseContent = data.toString()

                        console.log(lowerCaseContent);

                        let sortedContent = lowerCaseContent.split('\n')
                            .sort()
                            .join('\n');

                        let soretdFile = 'sortedContent.txt';

                        let writeSoretedFile = writeFile(soretdFile, sortedContent);

                        appendFile('filename.txt', soretdFile);

                        let readFilename = readFile('filename.txt');

                        readFilename.then((data) => {

                            let allFiles = data.toString()
                                .split('\n')
                                .slice(1, -1)

                            let deletedMessage = allFiles.map((file) => {

                                let deletedFiles = deleteFile(file);

                                deletedFiles.then((data) => {

                                    console.log(data.toString());

                                    return data.toString();

                                });

                            });

                        });

                    });

                });

            });

        });

    });

}

module.exports = mainFunction;