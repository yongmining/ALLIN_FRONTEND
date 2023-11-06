import '../../css/booklist.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bookList, guestBookList } from '../../api/bookApi';
import { useLocation } from 'react-router-dom';

function mapEmotionToImage(emotionResult, index) {
  const imagePath = `/img/${emotionResult}${(index % 10) + 1}.jpg`;
  return imagePath;
}

function BookList() {
  const books = useSelector((store) => store.bookReducer);
  const dispatch = useDispatch();

  const location = useLocation(); // 이 위치로 이동
  const { memberNo, guestNo } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      if (memberNo) {
        dispatch(bookList(memberNo));
      } else if (guestNo) {
        dispatch(guestBookList(guestNo));
      }
    };
    fetchData();
  }, [dispatch, memberNo, guestNo]); // `members` 제거

  return (
    <div className="bookcontainer">
      <div className="booklist-box">
        {books &&
          books.map((book, index) => (
            <div className="book-item" key={index}>
              <div className="book-img">
                {/* 회원 여부에 따라 emotionResult 또는 guestEmotionResult에 따라 이미지를 매핑하여 표시 */}
                <img
                  className="book-img-size"
                  src={mapEmotionToImage(memberNo ? book.emotionResult : book.guestEmotionResult, index)}
                  alt="책 이미지"
                />
              </div>
              <div className="book-text">
                <h4>{book.title}</h4>
                <h4>{book.subTitle}</h4>
                <h6>{book.author}</h6>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BookList;
