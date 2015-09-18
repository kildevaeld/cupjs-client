


declare module "mobyjs" {
  import tmp = require('mobyjs/lib/index')
  export = tmp
}

declare module "mobyjs/lib/index" {
  import tmp = require('lib/index')
  export = tmp
}