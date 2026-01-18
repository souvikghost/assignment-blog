import { QueryClientProvider } from "@tanstack/react-query";
import Body from "./components/Body";
import "./index.css";
import { queryClient } from "./lib/queryClient";
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Body />
    </QueryClientProvider>
  );
}

export default App;
