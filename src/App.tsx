import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/Router";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRouter />
      </div>
    </AuthProvider>
  );
}