import React from "react";
import { Rating } from "react-simple-star-rating";

const StarRating = ({ size, edit, value, count, color }: any) => {
  return (
    <Rating
      SVGstyle={{ display: "inline" }}
      size={size}
      readonly={edit}
      iconsCount={count ? count : 5}
      initialValue={value}
      fillColor={color ? color : "#EABA12"}
    />
  );
};

export default StarRating;
