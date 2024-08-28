const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const config = require('./config.js');
const fs = require('fs');
const chalk = require('chalk');

const app = express();

app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'images');

    if (!fs.existsSync(imagesDir)) {
        return res.status(404).send('/images folder is not found.');
    }

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error when check the filmes.');
        }

        const imageFiles = files.filter(file => {
            return ['.jpg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
        });

        if (imageFiles.length === 0) {
            return res.status(404).send('Not founded image in /images folder.');
        }

        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        const imagePath = path.join(imagesDir, randomImage);

        res.sendFile(imagePath);
    });
});

const PORT = config.port;
app.listen(PORT, () => {
    console.log(chalk.green("✔ ") + chalk.gray(`Successfully start.`));
});