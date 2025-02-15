import React, { useRef, useState } from 'react';

interface OTPInputProps {
  numInputs: number;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ numInputs, onChange }) => {
  const [otp, setOTP] = useState<string[]>(new Array(numInputs).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Joining OTP array into a string and passing it to parent component
    onChange(newOTP.join(''));
  };

  const handleKeyUp = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      // Move focus to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    } else if (index < numInputs - 1 && e.key !== 'Tab') {
      // Move focus to next input if current input is filled
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div>
      {Array.from({ length: numInputs }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyUp={(e) => handleKeyUp(index, e)}
          ref={(input) => {
            inputRefs.current[index] = input;
          }}
          style={{
            width: '50px',
            height: '50px',
            margin: '0 10px',
            textAlign: 'center',
            background:'none',
            border: '1px #FFFFFF solid',
            borderRadius:8,
            color:'#FFF'
          }}
        />
      ))}
    </div>
  );
};

export default OTPInput;
