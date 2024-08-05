import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { ERROR_COLOR, MAIN_PRIMAL_GREY_COLOR, MAIN_PRIMAL_SAGE_COLOR } from '../../../variables/variables';

export const AuthTextField = styled(TextField)({
  '&.MuiTextField-root': {
    width: '100%',
    transition: '0.2s linear',
    paddingTop: '5px',

    '& .MuiInputBase-root.Mui-focused': {
      '& input': {
        color: MAIN_PRIMAL_SAGE_COLOR,
      },
    },

    '& .MuiInputBase-root': {
      transition: '0.3s linear',

      '& input': {
        paddingLeft: '3px',
        color: MAIN_PRIMAL_GREY_COLOR,
        '&.Mui-focused': {
          color: ERROR_COLOR,
        },
      },

      '&::before': {
        borderBottomColor: MAIN_PRIMAL_GREY_COLOR,
      },
      '&::after': {
        borderBottomColor: MAIN_PRIMAL_SAGE_COLOR,
      },
    },

    '& .MuiInputLabel-root': {
      color: MAIN_PRIMAL_SAGE_COLOR,
      '&.Mui-focused': {
        color: MAIN_PRIMAL_GREY_COLOR,
      },
    },
  },
}) as typeof TextField;
