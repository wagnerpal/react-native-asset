const fs = require('fs');
const path = require('path');

module.exports = ({ rootPath, rnConfig }) => {
  const iosPath = path.resolve(rootPath, rnConfig?.project?.ios?.sourceDir ?? 'ios');
  const androidPath = path.resolve(rootPath, rnConfig?.project?.android?.sourceDir ?? 'android');

  const iosExists = fs.existsSync(iosPath);
  const xcodeprojName = iosExists
    ? fs.readdirSync(iosPath).find(file => path.extname(file) === '.xcodeproj')
    : null;
  const pbxprojPath = (xcodeprojName !== null)
    ? path.resolve(iosPath, xcodeprojName, 'project.pbxproj')
    : null;

  return {
    ios: {
      exists: iosExists,
      path: iosPath,
      pbxprojPath,
      sourceDir: iosPath,
    },
    android: {
      exists: fs.existsSync(androidPath),
      path: androidPath,
    },
  };
};
