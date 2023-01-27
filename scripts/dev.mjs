import { $, cd, argv } from 'zx'

$.env.FORCE_COLOR = '1'

const [slide] = argv._

if (slide) {
    await cd(`presentations/${slide}`)
}

await $`slidev index.md --log info --open`
