export default layout => {
  const countryCodes = layout.match(/C/g);
  const extensionCodes = layout.match(/E/g);

  return {
    countryCode: countryCodes ? countryCodes.length : 0,
    extension: extensionCodes ? extensionCodes.length : 0
  };
};