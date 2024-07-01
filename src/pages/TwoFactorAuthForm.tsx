import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HSButton from '@/components/form/Button';
import otpVector from '../assets/otp.png';

function TwoFactorAuthForm() {
  const { id, email } = useParams();

  const [otp, setOtp] = useState(new Array(6).fill(''));

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
  //   if (isNaN(e.target.value)) return false;
  //   setOtp([
  //     ...otp.map((data, indx) => (indx === index ? e.target.value : data)),
  //   ]);

  //   if (e.target.value && e.target.nextSibling) {
  //     e.target.nextSibling.focus();
  //   }
  // }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const newValue = e.target.value;

    if (isNaN(Number(newValue))) {
      return false;
    }

    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      updatedOtp[index] = newValue;
      return updatedOtp;
    });

    const nextInput = e.target.nextSibling as HTMLInputElement | null;
    if (nextInput) {
      nextInput.focus();
    }
  }
  function handleSpaceBack(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md p-6 shadow-lg border border-gray-200 rounded-md">
        <div className="flex justify-center mb-2">
          <img src={otpVector} alt="otp-secure-verification" className="w-20" />
        </div>
        <h3 className="text-2xl text-center mb-4 text-black">
          Please Submit your code
        </h3>
        <p className="text-sm text-center text-gray-500 font-light">
          An email has been send to the email{' '}
          <span className="font-medium">{email}</span> with a 6 digits
          verfication enclosed.
        </p>
        <form>
          <div className="my-3 flex gap-2 items-center justify-center">
            {otp.map((data, index) => {
              return (
                <input
                  type="text"
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleSpaceBack(e, index)}
                  maxLength={1}
                  className="w-12 text-xl text-center p-2 bg-grayLight text-black rounded-md font-base"
                />
              );
            })}
          </div>
          <HSButton title="Submit" onClick={() => alert(otp.join(''))} />
        </form>
        <Link to="/signIn" className="w-ful">
          <p className="text-center text-sm text-primary mt-2">
            Don&#39;t receive the code ?
          </p>
        </Link>
      </div>
    </div>
  );
}

export default TwoFactorAuthForm;
