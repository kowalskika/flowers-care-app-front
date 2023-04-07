import React from 'react';

export const UploadInput = (props: { uploadImage(event: any): Promise<void> }) => {
  const { uploadImage } = props;
  return (
    <div>
      <label
        htmlFor="dropzone-file"
      >Kliknij aby dodać zdjęcie.
        <p>
          Akceptowalne rozszerzenia: SVG, PNG, JPG or GIF
        </p>
        <input
          onChange={uploadImage}
          id="dropzone-file"
          type="file"
          className="hidden"
          multiple
        />
      </label>
    </div>
  );
};
