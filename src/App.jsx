import BookList from "./page/recommendContent/bookList";
import React from "react";
import TakePicture from "./page/takePicture";
import Home from "./page/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import MainContents from "./page/profile/mainContents";
import YouTubeList from "./page/recommendContent/youtubeList"; // YouTubeList 컴포넌트 임포트
import Consulting from "./page/consulting";
import MusicList from "./page/recommendContent/musicList";
import ExerciseList from "./page/recommendContent/exerciseList";
import Profile from "./page/profile/profile";
import FeedBack from "./page/feedback";
import FbModal from "./component/modal/fbModal";
import Clinic from "./page/recommendContent/clinic";
import ProfileInfo from "./page/profile/profileInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<MainPage />} /> */}
          <Route path="takepicture" element={<TakePicture />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="MainContents" element={<MainContents />} /> */}
          {/* <Route path="choiceYoutube" element={/>} /> */}
          {/* <Route path="choiceBook" element={<Contents />} /> */}
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="profileInfo" element={<ProfileInfo />} />
          </Route>

          <Route path="choiceContents">
            <Route index element={<MainContents />} />
            <Route path="bookList" element={<BookList />} />
            <Route
              path="youtubeList"
              element={<YouTubeList videoId="6VEnTQ2rx_4" />}
            />
            <Route
              path="exerciseList"
              element={<ExerciseList videoId="6VEnTQ2rx_4" />}
            />
            <Route
              path="musicList"
              element={<MusicList videoId="6VEnTQ2rx_4" />}
            />
          </Route>

          {/* <Route path="/consulting" element={<Consulting />} /> */}
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/fbmodal" element={<FbModal />} />
          <Route path="/clinic" element={<Clinic />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
