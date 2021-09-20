const fs = require("fs");
const shaderPath = __dirname + "./../src/shaders";

fs.readdir(shaderPath, async function(err, files) {
    
    console.log(err);
    
    let data = [];
    for (let i=0; i < files.length; i++) {
        data.push({
            name: undefined,
            vert: undefined,
            frag: undefined
        });
    }

    for (let index=0; index < data.length; index++) {
        const name = files[index];
        const PATH = `src/shaders/${name}/`;
        let shader_names = [`${PATH}shader.vert`, `${PATH}shader.frag`];
        let promises = shader_names.map(shader_name => fs.readFileSync(shader_name));
        const shader_content = await Promise.all(promises);
        data[index].name = name;
        data[index].vert = shader_content[0].toString('utf-8');
        data[index].frag = shader_content[1].toString('utf-8');
    }

    fs.writeFileSync("src/shaderlist.js", `export let shaderlist = ${JSON.stringify(data)};`);
});