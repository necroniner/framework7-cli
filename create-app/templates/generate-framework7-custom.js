const indent = require('../utils/indent');

module.exports = (options) => {
  const {
    components = [],
    themes = [],
    rtl = false,
  } = options.customBuildConfig || {};

  const componentsImportsJS = components.map((c) => {
    const name = c
      .split('-')
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join('');
    return `import ${name} from 'framework7/components/${c}/${c}.js';`;
  });
  const componentsNamesJS = components.map((c) => {
    return c
      .split('-')
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join('');
  });

  const scripts = indent(0, `
    import Framework7 from 'framework7';
    ${componentsImportsJS.join('\n    ')}

    Framework7.use([
      ${componentsNamesJS.join(',\n      ')}
    ]);

    export default Framework7;
  `);

  const componentsImportsLESS = components.map((c) => {
    return `@import url('../../node_modules/framework7/components/${c}/${c}.less');`;
  });
  const styles = indent(0, `
    & {
      @import url('../../node_modules/framework7/framework7.less');
      ${componentsImportsLESS.join('\n      ')}

      @includeIosTheme: ${themes.indexOf('ios') >= 0};
      @includeMdTheme: ${themes.indexOf('md') >= 0};
      @includeAuroraTheme: ${themes.indexOf('aurora') >= 0};

      @rtl: ${rtl}
    }
  `);

  return {
    styles,
    scripts,
  };
};
