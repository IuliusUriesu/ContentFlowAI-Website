import CognitoAuthProvider from "./context/CognitoAuthProvider";
import { SWRConfig } from "swr";
import { swrConfig } from "./config/swrConfig";
import { ServiceProvider } from "./context/ServiceProvider";
import AppRouter from "./ui/routing/AppRouter";

export default function App() {
  return (
    <SWRConfig value={swrConfig}>
      <CognitoAuthProvider>
        <ServiceProvider>
          <AppRouter />
        </ServiceProvider>
      </CognitoAuthProvider>
    </SWRConfig>
  );
}
