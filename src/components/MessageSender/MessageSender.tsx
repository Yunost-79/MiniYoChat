import { useContext, useRef, useState } from 'react';

import ClickAwayListener from 'react-click-away-listener';
import EmojiPicker, { Theme } from 'emoji-picker-react';

import { MessageTextField } from '../MuiUI/TextFields.styled/MessageTextField.styled';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

import { MAIN_LIGHT_SAGE_COLOR, MAIN_PRIMARY_YELLOW_COLOR, WHITE_COLOR } from '../../variables/variables';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../../lib/firebase/firebase';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { EFirebase } from '../../lib/hooks/useAuth/useAuth.types';
import { useChatStore } from '../../lib/zustand/useChatStore';
import { AuthContext } from '../../context/AuthContext';

interface IMessageSender {
  messageValue: string;
  setMessageValue: React.Dispatch<React.SetStateAction<string>>;
}

const MessageSender = (props: IMessageSender) => {
  const { messageValue, setMessageValue } = props;

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [, setUploadProgress] = useState<number>(0);

  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [isHoverFile, setIsHoverFile] = useState<boolean>(false);
  const [isHoverEmoji, setIsHoverEmoji] = useState<boolean>(false);
  const [isHoverSendBtn, setIsHoverSendBtn] = useState<boolean>(false);

  const { currentUser } = useContext(AuthContext);
  const { userInfoState } = useChatStore();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const toggleEmojiBar = () => {
    setOpenEmoji(!openEmoji);
  };

  const handleSetEmoji = (e: { emoji: string }) => {
    setMessageValue((messageValue) => messageValue + e.emoji);
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      const fileURL = URL.createObjectURL(file);
      setPreviewImage(fileURL);
    }
  };

  const handleDeletePreviewImage = () => {
    setPreviewImage('');
  };

  const handleKeyDown = (e: { code: string }) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!currentUser || !userInfoState) {
      console.error('User information is missing');
      return;
    }

    const { chatId, user } = userInfoState;

    if (!chatId || !user?.uid) {
      console.error('Chat ID or user ID is null');
      return;
    }

    try {
      if (image) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, image);
        handleDeletePreviewImage();

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const speedUpload = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(speedUpload);
          },
          (error) => {
            console.error('Upload error:', error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await updateDoc(doc(db, EFirebase.chats, chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: messageValue,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            } catch (error) {
              console.error('Error updating document:', error);
            } finally {
              setUploadProgress(0);
            }
          }
        );
      } else {
        if (!messageValue) {
          return;
        }
        await updateDoc(doc(db, EFirebase.chats, chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: messageValue,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      const userChatUpdate = {
        [`${chatId}.lastMessage`]: {
          text: messageValue,
        },
        [`${chatId}.date`]: serverTimestamp(),
      };

      await updateDoc(doc(db, EFirebase.userChats, currentUser.uid), userChatUpdate);
      await updateDoc(doc(db, EFirebase.userChats, user.uid), userChatUpdate);

      setMessageValue('');
      setImage(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message_sender">
      {/* <span className="upload_progress">{uploadProgress}</span> */}

      <MessageTextField
        className="input message_input"
        type="text"
        variant="filled"
        margin="none"
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        label="Write a message..."
      />
      {previewImage && (
        <div className="preview_image">
          <CloseIcon className="close_icon" onClick={handleDeletePreviewImage} />

          <img src={previewImage} alt="" />
        </div>
      )}
      <div className="message_items">
        <input id="file" type="file" name="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <AttachFileIcon
          className="icon_item"
          style={{ color: isHoverFile ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }}
          onClick={handleIconClick}
          onMouseEnter={() => setIsHoverFile(true)}
          onMouseLeave={() => setIsHoverFile(false)}
        />
        {openEmoji && (
          <ClickAwayListener onClickAway={toggleEmojiBar}>
            <div className="picker">
              <EmojiPicker open={openEmoji} theme={Theme.DARK} skinTonesDisabled={true} onEmojiClick={handleSetEmoji} />
            </div>
          </ClickAwayListener>
        )}
        <EmojiEmotionsIcon
          className="icon_item"
          style={{ color: isHoverEmoji ? MAIN_PRIMARY_YELLOW_COLOR : WHITE_COLOR }}
          onClick={toggleEmojiBar}
          onMouseEnter={() => setIsHoverEmoji(true)}
          onMouseLeave={() => setIsHoverEmoji(false)}
        />
      </div>
      <div className="send_item" onClick={handleSend} onMouseEnter={() => setIsHoverSendBtn(true)} onMouseLeave={() => setIsHoverSendBtn(false)}>
        <SendIcon style={{ color: isHoverSendBtn ? MAIN_LIGHT_SAGE_COLOR : WHITE_COLOR }} />
      </div>
    </div>
  );
};

export default MessageSender;
