import React, { useState } from "react";

const OverlayEditor = ({ onSave }) => {
  const [content, setContent] = useState("");
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ content, position: { x, y }, size: { width: 100, height: 40 } });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-2">
      <input
        className="border p-1 rounded"
        placeholder="Overlay Text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} className="border p-1 w-16" />
      <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} className="border p-1 w-16" />
      <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Save</button>
    </form>
  );
};

export default OverlayEditor;
