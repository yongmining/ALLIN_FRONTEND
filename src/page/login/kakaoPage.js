import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { callKakaoLoginAPI } from '../../api/loginApi';
import { useDispatch } from 'react-redux';
import { getCurrentMember } from '../../api/memberApi';

function KakaoPage() {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(callKakaoLoginAPI(code)).then(() => {
      const token = JSON.parse(window.localStorage.getItem('accessToken'));
      dispatch(getCurrentMember(token.memberNo)).then((member) => {
        if (member === '새로운 회원') {
          navigate('/profil', { replace: true });
        } else {
          navigate('/takepictureanalyze', { replace: true });
        }
      });
    });
  }, [code, dispatch, navigate]);

  return null;
}

export default KakaoPage;
