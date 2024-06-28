import { Link } from 'react-router-dom';
import HSButton from '@/components/form/Button';
import HSInput from '@/components/form/HSInput';
import otpVector from '../assets/otp.png';

function TwoFactorAuthForm() {
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
          An email has been send to the email example@gmail.com with a 6 digits
          verfication enclosed.
        </p>
        <form>
          <div className="my-3">
            <HSInput placeholder="" type="input" />
          </div>
          <HSButton title="Submit" />
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
