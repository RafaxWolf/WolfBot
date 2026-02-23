require("dotenv").config({ quiet: true });

const { TOKEN, CLIENTID, GUILD, VERIFICATION_CHANNEL, MONGODB_USER, MONGODB_PASSWD, GENIUS_API_KEY } = process.env;

if ( !TOKEN || !CLIENTID ) {
    console.error("❌ | Missing required environment variables. Please check your .env file.");
    process.exit(1);
}

if ( !MONGODB_USER || !MONGODB_PASSWD ) {
    console.error("❌ | Missing MongoDB credentials in environment variables. Please check your .env file.");
    process.exit(1);
}

module.exports = {
    TOKEN,
    CLIENTID,
    GUILD,
    VERIFICATION_CHANNEL,
    MONGODB_USER,
    MONGODB_PASSWD,
    GENIUS_API_KEY
};