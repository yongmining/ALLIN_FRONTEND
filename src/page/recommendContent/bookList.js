import "../../css/booklist.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookList } from "../../api/bookApi";
import { getCurrentMember } from "../../api/memberApi";

function mapEmotionToImage(emotionResult, index) {
  const imagePath = `/img/${emotionResult}${(index % 10) + 1}.jpg`; // 이미지 파일 경로 수정

  return imagePath; // 이미지 파일 경로 반환
}

function BookList() {
  const books = useSelector((store) => store.bookReducer);
  const members = useSelector((store) => store.memberReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentMember()).then(() => {
      if (members && members.memberNo) {
        dispatch(bookList(members.memberNo)).then(() => {
          // bookList 액션이 완료된 후 books를 확인
          console.log("Redux 상태 (books):", books);
        });
      } else {
        console.error("memberNo가 없습니다");
      }
    });
  }, []);

  console.log("Redux 상태 (books):", books);

  return (
    <div className="booklist-box">
      {books &&
        books.map((book, index) => (
          <div className="book-item" key={index}>
            <div className="book-img">
              {/* emotionResult에 따라 이미지를 매핑하여 표시 */}
              <img
                className="book-img-size"
                src={mapEmotionToImage(book.emotionResult, index)}
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
  );
}

export default BookList;
