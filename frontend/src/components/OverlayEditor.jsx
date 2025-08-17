import React, { useState, useEffect } from "react";
import { X, Type, Move, Maximize2, Minimize2, Droplet, Text } from "lucide-react";

const OverlayEditor = ({ onSave, editingOverlay, onCancel }) => {
  // Initialize state
  const [content, setContent] = useState("");
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 200, height: 50 });
  const [fontSize, setFontSize] = useState(18);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [bgOpacity, setBgOpacity] = useState(80);
  const [showPreview, setShowPreview] = useState(true);
  const [showBg, setShowBg] = useState(true);

  // Set initial values when editing an existing overlay
  useEffect(() => {
    if (editingOverlay) {
      setContent(editingOverlay.content || "");
      setPosition(editingOverlay.position || { x: 50, y: 50 });
      setSize(editingOverlay.size || { width: 200, height: 50 });
      
      // Set design properties if they exist
      if (editingOverlay.design) {
        setFontSize(editingOverlay.design.fontSize || 18);
        setBgColor(editingOverlay.design.bgColor || "#ffffff");
        setTextColor(editingOverlay.design.textColor || "#000000");
        setBgOpacity(editingOverlay.design.bgOpacity || 80);
        setShowBg(editingOverlay.design.showBg || true);
      }
    } else {
      // Reset form when creating new overlay
      resetForm();
    }
  }, [editingOverlay]);

  const resetForm = () => {
    setContent("");
    setPosition({ x: 50, y: 50 });
    setSize({ width: 200, height: 50 });
    setFontSize(18);
    setBgColor("#ffffff");
    setTextColor("#000000");
    setBgOpacity(80);
    setShowBg(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const overlayData = {
      content,
      position,
      size,
      design: {
        fontSize,
        bgColor: showBg ? bgColor : "transparent",
        textColor,
        bgOpacity: showBg ? bgOpacity : 0,
        showBg
      }
    };
    
    onSave(overlayData);
    if (!editingOverlay) resetForm();
  };

  const handlePositionChange = (axis, value) => {
    setPosition(prev => ({ ...prev, [axis]: Math.max(0, Math.min(100, value)) }));
  };

  const handleSizeChange = (dimension, value) => {
    setSize(prev => ({ ...prev, [dimension]: Math.max(10, value) }));
  };

  const previewStyle = {
    backgroundColor: showBg ? bgColor : "transparent",
    opacity: showBg ? bgOpacity / 100 : 0,
    color: textColor,
    fontSize: `${fontSize}px`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    top: `${position.y}%`,
    left: `${position.x}%`,
    transform: 'translate(-50%, -50%)',
    border: showBg ? "none" : "1px dashed #4f46e5"
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 flex justify-between items-center border-b">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {editingOverlay ? "Edit Text Overlay" : "Create New Text Overlay"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Customize text appearance and position
          </p>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-white text-gray-500"
          aria-label="Close editor"
        >
          <X size={18} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4">
        {/* Content Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Type size={18} className="mr-2 text-indigo-600" />
            Text Content
          </label>
          <textarea
            placeholder="Enter your text here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition min-h-[80px]"
            required
          />
        </div>
        
        {/* Preview Toggle */}
        <div className="mb-4 flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <span>Preview</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
          >
            {showPreview ? <Minimize2 size={16} className="mr-1" /> : <Maximize2 size={16} className="mr-1" />}
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
        
        {/* Preview Area */}
        {showPreview && (
          <div className="relative mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 min-h-[200px] overflow-hidden border border-gray-200">
            <div className="absolute inset-0 bg-grid-pattern bg-[length:20px_20px] opacity-30"></div>
            <div 
              className="absolute rounded-lg flex items-center justify-center shadow-lg"
              style={previewStyle}
            >
              <p className="text-center p-2 break-words font-medium">{content || "Preview text"}</p>
            </div>
            <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs border border-gray-300">
              Position: {position.x}%, {position.y}%
            </div>
          </div>
        )}
        
        {/* Position Controls */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Move size={18} className="mr-2 text-indigo-600" /> Position
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Horizontal (X)</span>
                <span className="text-xs font-medium">{position.x}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={position.x}
                onChange={(e) => handlePositionChange("x", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Vertical (Y)</span>
                <span className="text-xs font-medium">{position.y}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={position.y}
                onChange={(e) => handlePositionChange("y", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>
        
        {/* Size Controls */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Width</span>
                <span className="text-xs font-medium">{size.width}px</span>
              </div>
              <input
                type="range"
                min="50"
                max="500"
                value={size.width}
                onChange={(e) => handleSizeChange("width", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Height</span>
                <span className="text-xs font-medium">{size.height}px</span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                value={size.height}
                onChange={(e) => handleSizeChange("height", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>
        
        {/* Design Options */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <span>Text Design</span>
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Font Size */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-xs text-gray-500 mb-1 flex items-center">
                <Text size={14} className="mr-2" /> Font Size
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <span className="text-sm font-medium w-10">{fontSize}px</span>
              </div>
            </div>
            
            {/* Background Toggle */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-xs text-gray-500 mb-1 flex items-center">
                <Droplet size={14} className="mr-2" /> Background
              </label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBg(true)}
                  className={`flex-1 py-1.5 text-sm rounded transition-colors ${
                    showBg 
                      ? "bg-indigo-600 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Show
                </button>
                <button
                  type="button"
                  onClick={() => setShowBg(false)}
                  className={`flex-1 py-1.5 text-sm rounded transition-colors ${
                    !showBg 
                      ? "bg-indigo-600 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Hide
                </button>
              </div>
            </div>
            
            {/* Text Color */}
            {showBg && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Droplet size={14} className="mr-2" /> Background
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 border-0 rounded cursor-pointer p-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Opacity</span>
                      <span className="text-xs font-medium">{bgOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={bgOpacity}
                      onChange={(e) => setBgOpacity(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Text Color */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <label className="block text-xs text-gray-500 mb-1 flex items-center">
                <Droplet size={14} className="mr-2" /> Text Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 border-0 rounded cursor-pointer p-0"
                />
                <div className="text-sm font-medium flex-1 truncate">{textColor}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center font-medium"
          >
            {editingOverlay ? "Update Overlay" : "Create Overlay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OverlayEditor;