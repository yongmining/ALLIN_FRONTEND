import React, { useState } from 'react';

const Unlogin = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="unlogin">
      <button
        type="button"
        onClick={() => {
          setLogin(true);
        }}
      >
        비회원 로그인
      </button>
    </div>
  );
};

export default Unlogin;
