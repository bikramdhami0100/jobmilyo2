import React from 'react';
import { CldUploadButton } from 'next-cloudinary';

const UploadButton = () => {
  const handleSuccess = (result:any) => {
    console.log(result)
    console.log('Upload successful:', result.info.secure_url);
    // Handle successful upload, e.g., save the URL to state
  };

  const handleError = (error:any) => {
    console.error('Upload error:', error);
    // Handle upload error
  };

  return (
    <CldUploadButton
      onSuccess={handleSuccess}
      uploadPreset="wyyzhuyo"
    />
  );
};

export default UploadButton;
