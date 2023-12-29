import ReactDOM from "react-dom/client";
import App from "./routes.tsx";
import "./assets/styles/custom.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./manager/history.ts";
import { Toaster } from "./components/ui/toaster.tsx";
import QueryProvider from "./assets/common/queryProvider.tsx";
import AuthProvider from "./assets/common/authProvider.tsx";
const WebApp = () => {
  return (
    <HistoryRouter history={history}>
      <QueryProvider>
        <AuthProvider>
          <App />
          <Toaster />
        </AuthProvider>
      </QueryProvider>
    </HistoryRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<WebApp />);

export default WebApp;
