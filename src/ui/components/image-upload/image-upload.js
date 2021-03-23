import React, {useState} from 'react'
import {Button, Box} from "@material-ui/core";
import {uploadImage} from "../../../services/image-upload";
import axios from "axios";

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

    // TODO: ux improvement during file upload
    const uploadHandler = (event) => {
        // create unique fileName with time stamp. fileName is used as key for s3 db
        const keys = selectedFile.name.split('.');
        const fileName = new Date().getTime().toString() + "." + keys[keys.length-1];

        const fd = new FormData();
        fd.append("photoFile", selectedFile, fileName)

        uploadImage(fd).then(res => {
            if (res.status === 200) {
                // update imageName in parent component
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
