import MultiRangeSlider from "multi-range-slider-react";

export const RangeSlider = ({ min, max, step, minValue, maxValue, onChange }: any) => (
    <MultiRangeSlider
        min={min}
        max={max}
        step={step}
        minValue={minValue}
        maxValue={maxValue}
        onInput={(e: any) => onChange(e.minValue, e.maxValue)}
        style={{ border: 'none', padding: '15px', marginRight:"6px" }}
        ruler={false}
        label={false}
        barInnerColor="#47209b"
        thumbLeftColor="#47209b"
        thumbRightColor="#47209b"
    />
);
