import dotenv from "dotenv-safe";

dotenv.config({
	sample: ".env.example",
	allowEmptyValues: false,
});

const env = {
	isProd: process.env.NODE_ENV === "production",
	isDev: process.env.NODE_ENV === "development",
	PORT: process.env.PORT || 4000,
	LOG_LEVEL: process.env.NODE_ENV === "production" ? "info" : "debug",
	DB_URI: process.env.DB_URI || "mongodb://localhost:27017/notematter",
	SESSION_SECRET: process.env.SESSION_SECRET || "supersecretsessionkey",
	SITE_URL: process.env.SITE_URL || "http://localhost:3000",
};

export default env;