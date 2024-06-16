import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ProtectRoute from "./Components/auth/ProtectRoute";
import { LayoutLoader } from "./Components/layout/Loaders";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { userNotExists, userExists } from "./redux/reducer/auth";
import { SocketProvider } from "./socket";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/Group"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/Admin/UserManagement"));
const MsgManagement = lazy(() => import("./pages/Admin/MsgManagment"));
const ChatManagement = lazy(() => import("./pages/Admin/ChatManagment"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));

// let user = true;

const App = () => {
  const dispatch = useDispatch();

  const { user, loader } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${server}/api/user/me`, { withCredentials: true })
      .then(({ data }) => {
        dispatch(userExists(data));
      })
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chats/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Group />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MsgManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
