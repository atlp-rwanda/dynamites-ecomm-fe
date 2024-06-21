import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/app/store';
import { registerUser } from '@/features/Auth/SignUpSlice';
import HSButton from '@/components/form/HSButton';
import { MdOutlineEmail, MdPerson } from 'react-icons/md';
import { PiLockKeyBold } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'vendor' | 'buyer';
}

const SignUp: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const signUpState = useSelector((state: RootState) => state.signUp);
  const navigate = useNavigate();

  const handleSubmit = (values: FormValues, actions: any) => {
    console.log('Form Values:', values);
    dispatch(registerUser(values))
      .then((result) => {
        console.log('Register User Result:', result);
        actions.setSubmitting(false);
        navigate('/login');
      })
      .catch((error) => {
        console.error('Register User Error:', error); // Debugging
        actions.setSubmitting(false);
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    userType: Yup.string().required('User type is required'),
  });

  return (
    <div className="flex justify-center items-center h-[94vh] sm:h-screen bg-white m-2">
      <div className="w-[80%] md:w-[60%] lg:w-[40%] p-5 shadow-lg border-[1px] border-gray-300 rounded-md ">
        <h1 className="text-center font-bold text-3xl mb-4 text-xl">Sign Up</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: 'buyer',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5" role="form">
              <div className="flex gap-3">
                <div className="flex flex-col w-1/2">
                  <Field
                    name="firstName"
                    placeholder="First name"
                    className="input-field border border-gray-300 p-2  rounded-md focus:border-blue-500 focus:outline-none "
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-400 text-xs mt-1 p-1 rounded-md"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    className="input-field border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-400 text-xs  mt-1  p-1 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Field
                  name="email"
                  placeholder="Enter your email"
                  className="input-field border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 text-xs mt-1 p-1 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input-field rounded-md border  border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400 text-xs  mt-1  p-1 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="input-field rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1 p-1 rounded-md"
                />
              </div>
              <div className="flex flex-col items-left justify-between text-gray-600 text-sm md:text-md">
                <label>
                  <Field
                    type="radio"
                    name="userType"
                    value="buyer"
                    className="mr-2"
                  />
                  I am a customer
                </label>
                <label>
                  <Field
                    type="radio"
                    name="userType"
                    value="vendor"
                    className="mr-2"
                  />
                  I am a vendor
                </label>
                <ErrorMessage
                  name="userType"
                  component="div"
                  className="text-red-400 text-xs mt-1 bg-red-100 p-1 rounded-md"
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                <input id="agreeCheckbox" type="checkbox" className="mr-2" />
                <label htmlFor="agreeCheckbox">
                  By signing up, I agree with the&nbsp;
                  <Link
                    to=""
                    className="underline text-primary hover:text-blue-700"
                  >
                    Terms of Use&nbsp;
                  </Link>
                  &amp;&nbsp;
                  <Link
                    to=""
                    className="underline text-primary hover:text-blue-700"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>
              {signUpState.loading && <p>Loading...</p>}
              {signUpState.error && (
                <p className="text-red-500">{signUpState.error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting || signUpState.loading}
              >
                <HSButton
                  title="Sign Up"
                  styles="w-full flex mx-auto py-2 sm:py-4"
                />
              </button>
              <div>
                <p className="text-center text-gray-600 text-xs sm:text-sm md:text-sm">
                  Already have an account?{' '}
                  <Link to="" className="text-primary">
                    Login
                  </Link>
                </p>
              </div>
              <div className="flex items-center text-xs sm:text-sm md:text-lg">
                <div className="w-full bg-grayLight h-[1px]"></div>
                <p className="font-light">OR</p>
                <div className="w-full bg-grayLight h-[1px]"></div>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div className="bg-[white] w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                  <FcGoogle />
                </div>
                <div className="bg-[#335CA6] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
                  <FaFacebook color="white" size={16} />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
