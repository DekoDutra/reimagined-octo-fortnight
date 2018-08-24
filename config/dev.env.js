'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API: '"http://api-teste.twig.cloudforestdns.com"',
  // API: '"http://cloudforestdns.com:32623"',
  // API: '"http://35.198.43.168:8059"',
  API: '"https://api.somar.cloudforest.com.br"',
})
