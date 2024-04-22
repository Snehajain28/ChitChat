import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BiCamera } from "react-icons/bi";

const convertFileToUrl = (file) => URL.createObjectURL(file)

const ProfileUploader = ({ fieldChange, mediaUrl }) => {
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [fieldChange]
  );
  console.log(file);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="cursor-pointer flex justify-center">
        <img
          src={fileUrl}
          alt=""
          className="h-20 w-20 rounded-full object-cover object-top"
        />
        <div className=" relative ">
          <BiCamera className="absolute  -bottom-1 -right-2 text-[1.2rem]" />
        </div>
      </div>
    </div>
  );
};

export default ProfileUploader;