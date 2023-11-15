// proxy para contornar CORS
// configurar no package.json na parte de scripts
// "ng serve --proxy-config proxy.config.js" -- use proxy ao rodar projeto (utilizar npm run start)

const PROXY_CONFIG = [
  {
    context: ['/api'], // bom utilizar api, para saber diferenciar da chamada de rotas do front e back
    target: 'http://localhost:8080/',
    secure: false, // por enquanto não está usando ssl em local (https)
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;