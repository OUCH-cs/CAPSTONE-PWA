import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { RootLayout } from "@/shared/components/base";

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
