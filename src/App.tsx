import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/common/RootLayout";
import TranslatePage from "./pages/translate/translate";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<TranslatePage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
