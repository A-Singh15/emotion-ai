import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import JetsonPage from "@/pages/jetson.tsx";
import PricingPage from "@/pages/realtimedetect.tsx";
import WithoutJetsonPage from "@/pages/without-jetson.tsx";
import AboutPage from "@/pages/about";
import AttentionPage from "@/pages/attention";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<JetsonPage />} path="/jetson" />
      <Route element={<PricingPage />} path="/realtimedetect" />
      <Route element={<WithoutJetsonPage />} path="/without-jetson" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<AttentionPage />} path="/attention" />
    </Routes>
  );
}

export default App;
