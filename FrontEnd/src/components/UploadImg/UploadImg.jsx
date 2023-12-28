import { useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
const UploadImg = ({ handleUploadToCloudify }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewName, setPreviewName] = useState(null);
  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setPreviewName(e.target.files[0].name);
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
  };
  const handleDeleteImg = () => {
    setPreviewName(null);
    setPreviewUrl(null);
  };

  const handleSendFile = () => {
    handleUploadToCloudify(file);
  };

  return (
    <div className=" flex w-full flex-col items-center justify-center gap-8 rounded-lg border-2 border-dashed border-textLink bg-slate-200 p-4 px-8 opacity-80 outline-none focus:opacity-100">
      <label htmlFor="file-upload">
        <RiImageAddFill className="mx-auto text-[40px] text-textLink hover:text-slate-900" />
        <p>Browse file to upload</p>
        <input type="file" id="file-upload" hidden onChange={handleChange} />
      </label>
      {previewUrl && (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="h-[100px] w-[100px] rounded-full">
            <img
              src={previewUrl}
              alt="preview photo"
              className="h-full w-full rounded-full object-cover object-center"
            />
          </div>
          <div className="flex items-center justify-between">
            <AiFillFileImage />
            <p className="ml-4">{previewName}</p>
          </div>
          <div className="flex w-full items-center justify-between">
            <button
              type="button"
              className=" flex items-center justify-start rounded-md bg-slate-900 p-2 text-white hover:bg-slate-700"
              onClick={handleSendFile}
            >
              <MdCloudUpload />
              <p className="ml-4">Upload</p>
            </button>
            <button
              onClick={handleDeleteImg}
              type="button"
              className=" flex items-center justify-start rounded-md bg-red-900 p-2 text-white hover:bg-red-600"
            >
              <MdDelete />
              <p className="ml-4">Delete</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImg;
