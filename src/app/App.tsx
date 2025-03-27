import { BrowserRouter } from "react-router-dom";
import RootLayout from "@/shared/components/RootLayout";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <AppRoutes />
      </RootLayout>
    </BrowserRouter>
  );
}

export default App;
