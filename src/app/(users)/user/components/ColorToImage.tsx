"use client";
import { useEffect, useRef } from 'react';

const ColorToImage = ({ hexColor, width, fullName, height, colorImageurl, setColorImageUrl }:any) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas:any = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear the canvas
    context.clearRect(0, 0, width, height);

    // Draw the circle
    context.beginPath();
    context.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI);
    context.closePath();

    // Fill the circle with the hex color
    context.fillStyle = hexColor;
    context.fill();

    // Set text properties
    const fontSize = width / 3; // Adjust font size as needed
    context.font = `${fontSize}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#fff'; // Text color

    // Get the first letter of fullName
    const firstLetter = fullName.charAt(0).toUpperCase();

    // Calculate the position to center the text
    const x = width / 2;
    const y = height / 2;

    // Draw the text
    context.fillText(firstLetter, x, y);

    // Generate the image URL
    const url = canvas.toDataURL('image/png');
    setColorImageUrl(url);
    console.log(url, "url image");
  }, [hexColor, width, height, fullName, setColorImageUrl]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ColorToImage;
