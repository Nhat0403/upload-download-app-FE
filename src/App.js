import { BrowserRouter, Route, Routes } from "react-router-dom";
import Image from "./pages/image/Image";
import UploadImage from "./pages/upload/image/image";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Image/>}/>
        <Route path="upload" element={<UploadImage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
