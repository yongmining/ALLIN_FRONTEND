import { Link } from 'react-router-dom';
function Header() {
  return (
    <div>
      <div className="headerLogo">
        <img src="/img/logo.png" alt="Logo" />
        <Link to="/" className="custom-link">
          All-in
        </Link>
        <div className="username">
          <h5>사용자 이름</h5>
        </div>
      </div>
    </div>
  );
}
export default Header;
