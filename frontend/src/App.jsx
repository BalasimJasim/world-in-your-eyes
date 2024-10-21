import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Users } from "./users/pages/Users";
import { Places } from "./places/pages/Places";
import MainNav from "./shared/components/Navigation/MainNav";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import { Auth } from "./users/pages/Auth";
import { AuthProvider } from "./shared/context/AuthContext";
import Profile from "./users/pages/Profile";
import VerifyEmail from "./users/pages/VerifyEmail";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainNav />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<Places />} />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
