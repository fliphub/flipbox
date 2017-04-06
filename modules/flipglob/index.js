// * Matches 0 or more characters in a single path portion
// ? Matches 1 character
// [...] Matches a range of characters, similar to a RegExp range.
// If the first character of the range is ! or ^ then it matches any character not in the range.
// !(pattern|pattern|pattern) Matches anything that does not match any of the patterns provided.
// ?(pattern|pattern|pattern) Matches zero or one occurrence of the patterns provided.
// +(pattern|pattern|pattern) Matches one or more occurrences of the patterns provided.
// *(a|b|c) Matches zero or more occurrences of the patterns provided
// @(pattern|pat*|pat?erN) Matches exactly one of the patterns provided
// ** If a "globstar" is alone in a path portion, then it matches zero or more directories and subdirectories searching for matches. It does not crawl symlinked directories.
// Dots
//
// If a file or directory path portion has a . as the first character, then it will not match any glob pattern unless that pattern's corresponding path part also has a . as its first character.
//
// For example, the pattern a/.*/c would match the file at a/.b/c. However the pattern a/*/c would not, because * does not start with a dot character.
//
// You can make glob treat dots as normal characters by setting dot:true in the options.
const glob = require('glob')
const minimatch = require('minimatch')
const toarr = require('to-arr')
const ChainedMap = require('flipchain/ChainedMapExtendable')
const isGlob = require('izz/glob')

// @TODO: take the glonb filling I did in inferno-cli
class Glob extends ChainedMap {
  static start(parent) {
    return new Glob(parent)
  }
  constructor(parent) {
    super(parent)
    this.extend([
      // log info, like how it does not go through symlinks
      'debug',
      'cache',
      'allPatterns',
    ])
    this.str = ''
    // alias things here
  }

  // can be array and auto transform to a pattern
  anyWithExt() {}

  onlyOne() {}

  // '+(' + apps.join('|') + ')'
  any(names) {
    this.str += '+(' + toarr(names).join('|') + ')'
    return this
  }


  anyOne() {}

  // make multiple globs to
  folders() {}

  // to give it back in compatible format such as
  //
  asArray() {}

  // or() {}
  // pattern() {}
  // patterns() {}

  // valid() {
  //   return izz.glob()
  // }

  /**
   * @TODO:
   * - [x] use the existing globtester (minimatch)
   * - [ ] highlight in cli
   * https://github.com/carrot/globtester/blob/master/assets/js/main.coffee
   *
   * @example
   * .doesItMatch(`tests/eh.js`)
   * .doesItMatch(`tests/folders/canada.js`)
   * .doesItMatch(`src/canada/-test.js`)
   */
  doesItMatch(globs) {
    return minimatch(globs)
  }

  isGlob(glob) {
    return isGlob(glob)
  }

  // could output like commander
  help() {}

  toString() {
    return this.str
  }
}


// to do globs.glob.glob to do multiple globs more simply
class Globs {

}

module.exports = Glob
