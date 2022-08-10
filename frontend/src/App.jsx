import axios from "axios";
import { AuthContextProvider } from "./components/context/User.context";
import Routers from "./SiteRouters";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Routers />
    </AuthContextProvider>
  );
};

export default App;
