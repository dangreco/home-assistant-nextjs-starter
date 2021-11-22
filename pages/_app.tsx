import AppProvider from "../providers";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => (
  <AppProvider>
    <Component {...pageProps} />
  </AppProvider>
);
export default App;
