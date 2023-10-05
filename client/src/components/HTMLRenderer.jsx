import React from "react";
import "../pages/style.css";
function HTMLRenderer({ htmlString }) {
  const htmlContent = { __html: htmlString };

  return (
    <div
      dangerouslySetInnerHTML={htmlContent}
      className="forced-font"
      style={{ color: "white" }}></div>
  );
}

export default HTMLRenderer;
