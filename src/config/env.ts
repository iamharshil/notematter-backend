import dotenv from "dotenv-safe";

dotenv.config({
	sample: ".env.example",
	allowEmptyValues: false,
});

const env = {
	PORT: process.env.PORT || 4000,
	LOG_LEVEL: process.env.NODE_ENV === "production" ? "info" : "debug",
	DB_URI: process.env.DB_URI || "mongodb://localhost:27017/notematter",
};

export default env;