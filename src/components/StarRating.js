import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
  fontSize: "20px",
  marginTop: "5px",
};

export default function StarRating({ maxRating = 5, size, onSetRating }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rate) {
    setRating(rate);
    onSetRating(rate);
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

function Star({
  onRate,
  full,
  onHoverIn,
  onHoverOut,
  color = "#FFD700",
  size,
}) {
  const starStyle = {
    width: "20px",
    heigth: "20px",
    display: "flex",
    cursor: "pointer",
    fontSize: size,
    color,
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <p>&#9733;</p> : <p>&#9734;</p>}
    </span>
  );
}
