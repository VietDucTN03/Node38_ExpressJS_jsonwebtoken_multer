const uploadSingleAvatar = (req, res) => {
    res.send(req.file);
}

const uploadMultipleAvatar = (req, res) => {  
    res.send(req.files);
}

export {
    uploadSingleAvatar,
    uploadMultipleAvatar,
}