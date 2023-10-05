import React from "react";

function HTMLRenderer({ htmlString }) {
  const htmlContent = { __html: htmlString };

  return <div dangerouslySetInnerHTML={htmlContent}></div>;
}

export default HTMLRenderer;
