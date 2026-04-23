import React from "react";

function ProductImages({ product }) {
  return (
    <div className="imgs-item">
      <div className="big-img">
        <img id="big-img" src={product.images[0]} alt={product.title} />
      </div>
      <div className="small-img ">
        {product.images.map((img, index) => (
          <div className="img-div-small" key={index}>
            <img
              src={img}
              alt={product.title}
              onClick={() => {
                document.getElementById("big-img").src = img;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
