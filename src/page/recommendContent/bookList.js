import '../../css/booklist.css';
function BookList() {
  return (
    <div className="booklist-box">
      <div className="book-item">
        <div className="book-img">
          <img className="book-img-size" src="/img/book1.png" alt="내 이미지" />
        </div>
        <div className="book-text">
          <h4>우울함도 마음의 습관입니다.</h4>
          <h7>내 감정을 책임지고 행복한 삶을 사는 법</h7>
        </div>
      </div>

      <div className="book-item">
        <div className="book-img">
          <img className="book-img-size" src="/img/book2.png" alt="내 이미지" />
        </div>
        <div className="book-text">
          <h4>야무진 고양이는 오늘도 우울 6</h4>
          <h7>포미포미</h7>
        </div>
      </div>

      <div className="book-item">
        <div className="book-img">
          <img className="book-img-size" src="/img/book3.png" alt="내 이미지" />
        </div>
        <div className="book-text">
          <h4>우울의 고백</h4>
          <h7>인문학 클래식3</h7>
        </div>
      </div>

      <div className="book-item">
        <div className="book-img">
          <img className="book-img-size" src="/img/book4.png" alt="내 이미지" />
        </div>
        <div className="book-text">
          <h4>우울의 고백</h4>
          <h7>인문학 클래식3</h7>
        </div>
      </div>
    </div>
  );
}
export default BookList;
