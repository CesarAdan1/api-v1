const express = require('express');
const fileupload = require('express-fileupload')

const app = express();

app.use(fileUpload());

app.put('/upload', function(request, response){

    if(!request, files){

    
    return response.status(400)
        .json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningun archivo'
            }
        });
    } 
    let samplefile = request.files.upload;

    archivo.mv('/uploads/filename.jpg', (err) =>{
        if(err)
            return response.status(400)
    })
})