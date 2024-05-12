import React, { useState } from 'react';
import { Image, Upload } from 'antd';
import UpdatePhotoButton from './update-photo-button';

const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

function UploadProfilePhoto({ setPhoto }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [file, setFile] = useState({});

  const handlePreview = async (e) => {
    let preview;

    if (!e.url && !e.preview) {
      preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(e.url || preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ file: newFile }) => setFile(newFile);

  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        file={file}
        listType="picture-circle"
        onChange={handleChange}
        onPreview={handlePreview}
      >
        <UpdatePhotoButton setPhoto={setPhoto} />
      </Upload>

      {previewImage && (
      <Image
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(''),
        }}
        src={previewImage}
        wrapperStyle={{
          display: 'none',
        }}
      />
      )}
    </>
  );
}

export default UploadProfilePhoto;
