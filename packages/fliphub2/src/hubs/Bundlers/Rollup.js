const ChainedMapExtendable = require('flipchain/ChainedMapExtendable')
const Config = require('./Config')
const timer = require('fliptime')
const log = require('fliplog')

// https://github.com/rollup/rollup-plugin-commonjs/issues/137
// https://github.com/thgh/rollup-plugin-serve
// https://github.com/rollup/rollup-watch
module.exports = class Rollup extends ChainedMapExtendable {
  constructor(parent) {
    super(parent)
    this.config = new Config(this)
  }
  toConfig() { return this.config.toConfig() }

  build() {
    timer.start('rollup')
    const config = this.config.toConfig()
    const rollup = require('rollup')
    log.data({config}).text('rollup').tags('rollup,config,bundler').echo()

    rollup.rollup(config).then(function(bundle) {
      // write it out ourselves...
      // Generate bundle + sourcemap
      // var result = bundle.generate({
      //   // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
      //   format: 'cjs',
      // })
      // fs.writeFileSync(config.outFile, result.code)

      // Alternatively, let Rollup do it for you
      // (this returns a promise). This is much
      // easier if you're generating a sourcemap
      bundle.write({
        format: 'cjs',
        dest: 'bundle.js',
      })

      timer.stop('rollup').log('rollup')
    })
  }
}