import { RotatingLines } from 'react-loader-spinner';
import { MAIN_PRIMAL_SAGE_COLOR } from '../../../variables/variables';

import './AuthLoading.scss';

const AuthLoading = () => {
  return (
    <div className="auth_loader">
      <div className="spinner">
        <RotatingLines visible={true} width="60" strokeColor={MAIN_PRIMAL_SAGE_COLOR} />
      </div>
    </div>
  );
};

export default AuthLoading;
