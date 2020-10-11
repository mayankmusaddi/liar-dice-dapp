import React from "react";
import '../App.css'


function LDButton({
  title,
  titleStyle
                  }) {
  return (
    // <div>
      <button style={titleStyle} className={'ld-button'}>{title}</button>
    // </div>
  )
}

export default LDButton