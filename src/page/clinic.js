import React from 'react';
import '../css/clinic.css';

function Clinic() {
  return (
    <div className="container">
      전문가와 상담을 해보시는 것은 어떨가요??
      <br />
      <br />
      <div className="cliniNum"> 자살예방상담 번호 : 1393</div>
      <br />
      <div className="cliniNum"> 생명의전화 번호 : 1588-9191</div>
      <br />
      <div className="cliniNum"> 정신건강 상담 번호 : 1577-0199</div>
      <br />
      <a href="http://suicideprevention.or.kr/04_sub/05_sub.html">그외 자살 예방 방지센터</a>
    </div>
  );
}

export default Clinic;
