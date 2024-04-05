import React from 'react'
import { MdOutlineContentCopy } from "react-icons/md";

const CopyLinkButton = ({text}) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
          .then(() => {
            alert('Text copied to clipboard');
          })
          .catch((error) => {
            console.error('Failed to copy text: ', error);
          });
      };

  return (
    <button onClick={handleCopy}><MdOutlineContentCopy /></button>
  )
}

export default CopyLinkButton