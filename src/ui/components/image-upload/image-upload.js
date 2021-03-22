import React, {useState} from 'react'
import {Button, Box} from "@material-ui/core";
import {uploadImage} from "../../../services/image-upload";

const ImageUpload = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInput = React.useRef(null);

    const fileChangedHandler = (event) => {
        // cannot be larger than 2M
        if(event.target.files[0].size > 2097152){
            alert("File is too big! Maximum file size is 2MB.");
        } else {
            setSelectedFile(event.target.files[0]);
        }
    }

    const handleClick = (event) => {
        fileInput.current.click();
    }

    const uploadHandler = (event) => {
        const fd = new FormData();
        // create file name from timestamp
        const keys = selectedFile.name.split('.');
        const fileName = new Date().getTime().toString() + "." + keys[keys.length-1];
        fd.append('image', selectedFile, fileName)
        uploadImage(fd).then(res => {
            if (res.status === 200) {
                props.passImageName(res.data)
            } else {
                alert("File upload unsuccessful. Please try again.")
            }
        })
    }


    return (
        <div>
            <input
                style={{display: 'none'}}
                type="file"
                accept="image/*"
                onChange={fileChangedHandler}
                ref={fileInput}/>
            <Box py={2}>
                <Button
                    variant={"contained"}
                    size={"medium"}
                    color={"primary"}
                    onClick={handleClick}
                    text={"Choose an image"}>
                    Choose an image
                </Button>
                {selectedFile ? selectedFile.name : "No file selected"}
            </Box>
            <Box>
                <Button
                    variant={"contained"}
                    size={"medium"}
                    color={"primary"}
                    onClick={uploadHandler}
                    text={"Upload"}>
                    Upload
                </Button>
            </Box>
        </div>
    );
};

export default ImageUpload;
