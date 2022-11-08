import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/home/Login";
import RegisterPage from "../pages/home/Register";

import HomePage from "../pages/admin/Home";
import CandidatePage from "../pages/admin/Candidate"
import UsersPage from "../pages/admin/Users";
import UpdateCandidatePage from "../pages/admin/UpdateCandidate";

import HomeUsers from "../pages/users/Home";
import VisiMisiPage from "../pages/users/VisiMisi";

import PrivateRoutes from "./PrivateRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import HomeRoutes from "./HomeRoutes";
import HomePageWebsite from "../pages/home/Home";
import LiveVotePage from "../pages/users/LiveVote";

function Routerall() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<HomeRoutes />}>
              <Route index element={<HomePageWebsite />} />
              <Route path="/Register" element={<RegisterPage />} />
              <Route path="/Login" element={<LoginPage />} />
            </Route>
            
            {/* Admin Page */}
            <Route path="/Admin" element={<PrivateRoutes />}>
                <Route index element={<HomePage />} />
                <Route path='/Admin/Candidate' element={<CandidatePage />} />
                <Route path='/Admin/Users' element={<UsersPage />} />
                <Route path='/Admin/UpdateCandidate' element={<UpdateCandidatePage />} />
            </Route>

            {/* User Page */}
            <Route path="/User" element={<ProtectedRoutes />}>
              <Route index element={<HomeUsers />} />
              <Route path="/User/VisiMisi" element={<VisiMisiPage />} />
              <Route path="/User/LiveVote" element={<LiveVotePage />} />
            </Route>
        </Routes>
    </Router>
  )
}

export default Routerall