import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUs from "../components/ContactUs";
import NotFound from "../components/NotFound";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App(props) {
  const { history } = props;

  return (
    <BrowserRouter history={history}>
      <Routes>
        <Route exact path="/" element={<ContactUs />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
