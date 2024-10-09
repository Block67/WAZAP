function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

async function generateUniqueId(model, length) {
    let uniqueId;
    let exists;

    do {
        uniqueId = generateRandomString(length);
        exists = await model.findOne({ where: { [model.name]: uniqueId } });
    } while (exists);

    return uniqueId;
}

module.exports = { generateUniqueId };
