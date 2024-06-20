import HSButton from '@/components/form/HSButton';
import HSInput from '@/components/form/HSInput';
import { MdOutlineEmail, MdPerson } from 'react-icons/md';
import { PiLockKeyBold } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="flex justify-center items-center h-[94vh] sm:h-screen bg-white m-2 ">
      <div className="w-[80%] md:w-[60%] lg:w-[40%] p-5 shadow-lg border-[1px] border-grayLight rounded-md">
        <h1 className="text-center font-bold text-3xl mb-4 text-xl">Sign Up</h1>
        <div className="flex flex-col gap-5">
            <div className='flex gap-3'>
        <HSInput
            label="First Name"
            labelStyle='text-xs sm:text-sm md:text-base'
            type="input"
            text="text"
            placeholder="First name"
            icon={<MdPerson size={18} color='gray'/>}
            style='text-xs sm:text-sm md:text-base '
            isRequired={true}
          />
         <HSInput
            label="Last Name"
            type="input"
            text="text"
            labelStyle='text-xs sm:text-sm md:text-base'
            placeholder="Last Name"
            icon={<MdPerson size={18} color='gray'/>}
            style='text-xs sm:text-sm md:text-base'
          />
          </div>
          <HSInput
            label="Email"
            labelStyle='text-xs sm:text-sm md:text-base'
            type="input"
            text="email"
            placeholder="Enter your email"
            icon={<MdOutlineEmail size={18} />}
            style='text-xs sm:text-sm md:text-base '
          />
          <HSInput
            label="Password"
            labelStyle='text-xs sm:text-sm md:text-base'
            type="input"
            text="password"
            placeholder="Enter your password"
            icon={<PiLockKeyBold size={18} />}
            style='text-xs sm:text-sm md:text-base'
          />
        <HSInput
            label="Confirm Password"
            labelStyle='text-xs sm:text-sm md:text-base'
            type="input"
            text="password"
            placeholder="Confirm your password"
            icon={<PiLockKeyBold size={18} />}
            style='text-2xs sm:text-sm'
          />
 <div className="flex flex-col items-left justify-between text-xs sm:text-sm md:text-base">
  <label>
    <input
      type="radio"
      name="userType"
      value="buyer"
      className="mr-2 "
    />
    I am a customer
  </label>
  <label>
    <input
      type="radio"
      name="userType"
      value="vendor"
      className="mr-2"
    />
    I am a vendor
  </label>
</div>
<div className="text-xs sm:text-sm text-gray-600  ">
  <input
    id="agreeCheckbox"
    type="checkbox"
    className="mr-2 "
  />
  <label htmlFor="agreeCheckbox">
    By signing up, I agree with the  &nbsp;
    <Link to="" className="underline text-primary hover:text-blue-700">
       Terms of Use &nbsp;
    </Link> & &nbsp;
    <Link to="" className="underline text-primary hover:text-blue-700">
      Privacy Policy
    </Link>.
  </label>
</div>
          <HSButton title="Sign Up" styles='w-full flex mx-auto py-2 sm:py-4' />
          <div>
            <p className="text-center text-gray-600 text-xs sm:text-sm md:text-sm ">
              Already have an account?{' '}
              <Link to="" className="text-primary">
                Login
              </Link>
            </p>
          </div>
          <div className="flex items-center text-xs sm:text-sm md:text-lg ">
            <div className="w-full bg-grayLight h-[1px]"></div>
            <p className="font-light">OR</p>
            <div className="w-full bg-grayLight h-[1px]"></div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-[white] w-8 h-8  rounded-full border-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
              <FcGoogle />
            </div>
            <div className="bg-[#335CA6] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
              <FaFacebook color="white" size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;