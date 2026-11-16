
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import LeagueInformationPage from "./pages/LeagueInformationPage.jsx";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route
          path="/league-information"
          element={<LeagueInformationPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
