import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { callGuestLoginAPI } from '../../api/loginApi';
import { useDispatch } from 'react-redux';
import { getGuestMember } from '../../api/memberApi';

function UnloginPage() {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callGuestLoginAPI(code)).then(() => {
      const token = JSON.parse(window.localStorage.getItem('guestCode'));
      dispatch(getGuestMember(token.code)).then((code) => {
        navigate('/profil', { replace: true });
      });
    });
  }, [code, dispatch, navigate]);

  return null;
}

export default UnloginPage;
