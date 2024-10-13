// https://orm.drizzle.team/docs/get-started/expo-new#step-6---setup-metro-config
const { getDefaultConfig } = require("expo/metro-config");
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("sql");
module.exports = config;
