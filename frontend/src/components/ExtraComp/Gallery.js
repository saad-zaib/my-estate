import React from "react";
import Img1 from "../../assets/img1.jpg";
import Img2 from "../../assets/img2.jpg";
import Img3 from "../../assets/img3.jpg";
import Img4 from "../../assets/img4.jpg";
import Img5 from "../../assets/img5.jpg";
import Img6 from "../../assets/img6.jpg";
import Img7 from "../../assets/img7.jpg";
import Img8 from "../../assets/img8.jpg";
import Img9 from "../../assets/img9.jpg";
import Img10 from "../../assets/img10.jpg";
import Img11 from "../../assets/img11.jpg";
import Img12 from "../../assets/img12.jpg";

const images = [
  {
    src: Img1,
    alt: "Image 1",
  },
  {
    src: Img2,
    alt: "Image 2",
  },
  {
    src: Img3,
    alt: "Image 3",
  },
  {
    src: Img4,
    alt: "Image 4",
  },
  {
    src: Img5,
    alt: "Image 5",
  },
  {
    src: Img6,
    alt: "Image 6",
  },
  {
    src: Img7,
    alt: "Image 7",
  },
  {
    src: Img8,
    alt: "Image 8",
  },
  {
    src: Img9,
    alt: "Image 9",
  },
  {
    src: Img10,
    alt: "Image 10",
  },
  {
    src: Img11,
    alt: "Image 11",
  },
  {
    src: Img12,
    alt: "Image 12",
  },
];

function Gallery() {
  const chunkSize = 3; // Number of images per column

  // Split images array into chunks for columns
  const columns = [];
  for (let i = 0; i < images.length; i += chunkSize) {
    columns.push(images.slice(i, i + chunkSize));
  }

  return (
    <div>
      <div className="flex flex-row sm:flex-col px-5 gap-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="grid gap-4">
            {column.map((image, imageIndex) => (
              <div key={imageIndex}>
                <div className="relative">
                  <img
                    className="h-auto max-w-full rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105"
                    src={image.src}
                    alt={image.alt}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
