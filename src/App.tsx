import Auth from "./components/Auth/Auth";

import Header from "./components/Header";
import MiniRPlace from "./components/MiniRPlace";
import ColorPicker from "./components/ColorPicker/ColorPicker";

import UpdatePixel from "./components/UpdatePixel/UpdatePixel";

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center flex-1 w-full text-center">
        <Auth />
        <MiniRPlace />
        <ColorPicker />
      </main>
      {/* Fixed element */}
      <UpdatePixel />
    </>
  );
}

export default App;
