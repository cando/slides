import { $, cd, fs, glob, within, echo, chalk } from 'zx'

const {
    yellowBright: yellow,
    greenBright: green,
} = chalk

$.env.FORCE_COLOR = '1'

const slideDirs = await glob('presentations/*', {
    onlyDirectories: true,
})


echo``
echo`[slides] ${green(`Clear last building files`)}`
await $`rm -rf index.html .site presentations/*/index.html presentations/*/dist`


echo``
echo`[build] ${green(`found slides`)} ${yellow(`[
  ${slideDirs.join(',\n  ')}
]`)}`


echo``
echo`[build] ${green(`Building index`)}`
await $`slidev build --base /slides/ --out .site index.md`


for (let dir of slideDirs) {
    const slide = dir.replace('presentations/', '')

    echo``
    echo`[build] ${green(`Building slide ${yellow(slide)}`)}`

    await within(async () => {
        await cd(dir)
        await $`slidev build --base /slides/${dir}/ index.md`
    })
}


echo``
echo`[build] ${green(`Composing slides pages`)}`

for (let dir of slideDirs) {
    await fs.copy(`${dir}/dist`, `.site/${dir}/`)
}

echo``
echo`[build] Build completed`
