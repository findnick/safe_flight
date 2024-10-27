import React, { useEffect, useState } from "react";
import { Button, Image, Upload } from "antd";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { APIS, useAPI, WORKING_LINK } from "../api/config";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function EditCampaignBackground() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUpload, uploading] = useAPI(APIS.uploadImage);
  const [getImage, imgLoading] = useAPI(APIS.fetchImage);
  const [fileList, setFileList] = useState([]);
  const [imgUrl, setImgUrl] = useState(`${WORKING_LINK}/bgImage/fetchImage`);
  const navigate = useNavigate();
  // const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
      className="flex flex-col justify-center items-center gap-1"
    >
      <FaPlus size={32} />
      <div>Upload</div>
    </button>
  );
  return (
    <div className="flex flex-col my-5 gap-5">
      <img src={imgUrl} style={{ height: "12rem" }} className="object-cover" />
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      <Button
        type="primary"
        block
        disabled={fileList.length < 1 || uploading}
        onClick={async () => {
          try {
            const form = new FormData();
            form.append("image", fileList);
            const res = await imageUpload({ image: fileList[0].originFileObj });
            if (res?.status == 200) {
              setImgUrl(imgUrl);
            }
            // navigate("/confirm-prescription", { state: { data: res.data } });
          } catch (err) {
            console.error(err);
          }
          // navigate("/confirm-prescription");
        }}
      >
        Upload
      </Button>
    </div>
  );
}
