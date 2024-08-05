import styled from '@emotion/styled';

import { Modal } from '@mui/material';
import { MAIN_PRIMAL_GREY_COLOR, MAIN_PRIMAL_SAGE_COLOR, MAIN_PRIMARY_YELLOW_COLOR } from '../../../variables/variables';

export const AuthDragAndDropModal = styled(Modal)({
  '& .MuiBox-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    maxWidth: '45%',
    width: '100%',
    maxHeight: '45%',
    height: '100%',

    padding: '25px',

    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    backgroundColor: MAIN_PRIMARY_YELLOW_COLOR,

    '& .modal_content': {
      width: '100%',
      height: '100%',

      borderRadius: '10px',
      border: `3px dashed ${MAIN_PRIMAL_SAGE_COLOR}`,

      '&.active': {
        border: `3px dashed ${MAIN_PRIMAL_SAGE_COLOR}`,
      },

      '& .drag_and_drop_zone': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

        width: '100%',
        height: '100%',

        fontSize: 28,
        fontWeight: 500,
        transition: '0.3s linear',

        '&.drop_item': {
          color: MAIN_PRIMAL_GREY_COLOR,
        },

        '&.drag_item': {
          display: 'flex',
          gap: 8,
          color: MAIN_PRIMAL_SAGE_COLOR,
        },
        '& .drag_and_drop_title': {
          fontSize: 36,
        },

        '& .drag_and_drop_file_input': {
          '.file_upload_input': {
            display: 'none',
          },

          '.file_upload_label': {
            fontSize: 18,
            textDecoration: 'underline',
            cursor: 'pointer',

            '&:hover': {},
          },
        },

        '& .drag_and_drop_subtitle ': {
          fontSize: 18,
          fontWeight: 400,
        },
      },
    },
  },
}) as typeof Modal;
