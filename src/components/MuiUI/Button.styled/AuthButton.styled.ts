import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { MAIN_PRIMAL_GREY_COLOR, MAIN_PRIMAL_SAGE_COLOR, MAIN_PRIMARY_YELLOW_COLOR } from '../../../variables/variables';

export const AuthButton = styled(Button)({
  '&.MuiButtonBase-root': {
    height: '100%',
    padding: '10px 20px',
    borderRadius: '5px',
    color: MAIN_PRIMARY_YELLOW_COLOR,
    backgroundColor: MAIN_PRIMAL_SAGE_COLOR,
    whiteSpace: 'nowrap',
    transition: 'background-color 0.3s, color 0.3s',

    '&:hover': {
      backgroundColor: 'rgba(73, 94, 87, 0.8)',
    },

    '&:focus': {
      backgroundColor: 'rgba(73, 94, 87, 1)',
    },

    '&:active': {
      backgroundColor: 'rgba(73, 94, 87, 0.9)',
    },
  },

  '& .MuiTouchRipple-root': {
    color: MAIN_PRIMAL_GREY_COLOR,
  },
}) as typeof Button;
