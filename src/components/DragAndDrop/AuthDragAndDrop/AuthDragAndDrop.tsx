import React, { useState } from 'react';

import { Box } from '@mui/material';
import { AuthDragAndDropModal } from '../../MuiUI/DragAndDrop.styled/AuthDragAndDropModal.styled';

interface IAuthDragAndDrop {
  showModal: boolean;
  toggleShowModal: () => void;
}

const AuthDragAndDrop = (props: IAuthDragAndDrop) => {
  const { showModal, toggleShowModal } = props;
  const [drag, setDrag] = useState<boolean>(false);

  const handleDragStart = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file: File[] = [e.dataTransfer.files[0]];
    // const fileType: string = file[0].type;
    console.log(file);

    // if (file) {
    //   if (allowedImageTypes.includes(fileType)) {
    //     const imageRef = ref(storage, `images/user/${currentDate}/${file[0].name + v4()}`);
    //     await uploadBytes(imageRef, file[0]);
    //     const userProfileImageUrl = await getDownloadURL(imageRef);
    //     setUserNewImage(userProfileImageUrl);
    //     toggleShowModal();
    //     return;
    //   } else {
    //     setDrag(false);
    //     return;
    //   }
    // }
  };

  return (
    <AuthDragAndDropModal open={showModal} onClose={toggleShowModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box>
        <div className={`modal_content ${!drag && 'active'}`}>
          {drag ? (
            <div
              className="drag_and_drop_zone drop_item"
              onDragStart={(e) => handleDragStart(e)}
              onDragLeave={(e) => handleDragLeave(e)}
              onDragOver={(e) => handleDragStart(e)}
              onDrop={(e) => handleOnDrop(e)}
            >
              Drop files to upload
            </div>
          ) : (
            <>
              <div
                className="drag_and_drop_zone drag_item"
                onDragStart={(e) => handleDragStart(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onDragOver={(e) => handleDragStart(e)}
              >
                <div className="drag_and_drop_title">Drag files to upload</div>
                {/* <div className="drag_and_drop_file_input">
                  <label className="file_upload_label" htmlFor="file-upload">
                    Choose file
                  </label>
                  <input className="file_upload_input" id="input_file_upload" type="file" />
                </div> */}
                <div className="drag_and_drop_subtitle">File must be in png or jpeg format</div>
              </div>
            </>
          )}
        </div>
      </Box>
    </AuthDragAndDropModal>
  );
};

export default AuthDragAndDrop;
