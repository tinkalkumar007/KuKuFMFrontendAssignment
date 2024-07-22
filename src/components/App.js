import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login, Register, HomePage, BookDetails } from ".";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookDetails/:bookId" element={<BookDetails />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
