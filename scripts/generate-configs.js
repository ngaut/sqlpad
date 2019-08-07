const fs = require('fs');
const path = require('path');
const configItems = require('../server/lib/config/configItems')

let env = '';
let json = {};
let ini = '';

configItems.forEach(item => {
  env += `${item.envVar}=${item.default}\n`
  
  if (item.key !== 'config') {
    json[item.key] = item.default;

    if (item.description) {
      ini += `; ${item.description}\n${item.key}="${item.default}"\n\n`
    } else {
      ini += `${item.key}="${item.default}"\n`
    }
  }
})

const markdown = `
_This file was generated by \`scripts/generate-configs.js\` using \`server/lib/config/configItems.js\`._

# Configuration

SQLPad may be configured via environment variables, config file, or command line flag.

Config file path may be specified passing command line option \`--config\` or environment variable SQLPAD_CONFIG.
For example:

\`\`\`sh
sqlpad --config ~/.sqlpadrc
\`\`\`

Using a config file or environment variables recommended. For list of command line flags run \`sqlpad -h\`.

## Version 3 changes

Previously SQLPad supported a default dbPath of \`$HOME/sqlpad/db\` and a default config file path of \`$HOME/.sqlpadrc\`. 

These defaults have been removed in version 3.

## Environment Variables
\`\`\`sh
${env}
\`\`\`

## INI config
\`\`\`ini
${ini}
\`\`\`

## JSON config
\`\`\`json
${JSON.stringify(json, null, 2)}
\`\`\`
`

fs.writeFileSync(path.join(__dirname, '../CONFIGURATION.md'), markdown, { encoding: 'utf8'})