// https://orm.drizzle.team/docs/get-started/expo-new#step-6---setup-metro-config
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });
config.resolver.sourceExts.push("sql");
module.exports = withNativeWind(config, { input: './global.css' });
