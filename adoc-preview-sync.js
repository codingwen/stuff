
const port = 3000

const asciidoctor = require('asciidoctor')()
const bs = require("browser-sync").create();

bs.init({
    watch: true, 
    server: {
        baseDir: ".",
        directory: true
    },
    startPath: "output",
    files: ['./**/*.jpg', './**/*.png']
});

bs.watch('**/*.adoc', {
    ignored: /node_modules\//
}, function(event, file) {
    console.log(`file is ${file}`);
    var path = file.substring(0, file.lastIndexOf("/"));
    var to_dir = 'output/' + path;
    var images_dir = '/' + path;
    var html = asciidoctor.convertFile(file, {'safe': 'safe', 'attributes':{'imagesdir': './images', 'outdir': to_dir, 'outfile': file}, 
    'catalog_assets': true, 'mkdirs': true });
    bs.reload(html);
});
