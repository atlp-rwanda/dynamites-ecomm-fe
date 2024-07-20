import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAppSelector } from '@/app/hooks';
import Button from '@/components/form/Button';
import HSInput from '@/components/form/HSInput';
import { MapIcon, PhoneIcon } from 'lucide-react';
import { FaEnvelope } from 'react-icons/fa6';

interface MyFormValues {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
}

const initialValues: MyFormValues = {
  name: '',
  phoneNumber: '',
  email: '',
  message: '',
};

const validationSchema: yup.ObjectSchema<MyFormValues> = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required!'),
  name: yup.string().required('Name is required!'),
  message: yup.string().required('Message is required!'),
  phoneNumber: yup
    .string()
    .min(10, 'Phone number must contain at least 10 digits')
    .required('Phone number is required!'),
});
function ContactForm() {
  const formik = useFormik<MyFormValues>({
    initialValues,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
    validationSchema,
  });

  const { loading } = useAppSelector((state) => state.signIn);
  return (
    <div className="w-full mx-auto mt-8 md:mt-12 px-32">
      <div className="flex flex-row justify-between gap-20 items-start mb-6 ">
        <div className="w-full md:w-1/2">
          <h1 className="text-md text-black text-left">Contact Us</h1>
          <p className="text-4xl font-light text-black text-left mt-5">
            Get in touch today.
          </p>
          <form className="flex flex-col gap-3 mt-7" data-testid="form">
            <div>
              <HSInput
                data-testid="Name"
                id="pname"
                type="input"
                text="text"
                placeholder="Enter your name"
                style={
                  formik.touched.name && formik.errors.name
                    ? 'border-2 border-red-500 bg-white'
                    : ''
                }
                {...formik.getFieldProps('name')}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 mt-1 text-sm">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div>
              <HSInput
                data-testid="email"
                id="email"
                type="input"
                text="email"
                placeholder="Enter your email"
                style={
                  formik.touched.email && formik.errors.email
                    ? 'border-2 border-red-500 bg-white'
                    : ''
                }
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 mt-1 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <HSInput
                data-testid="phoneNumber"
                id="phoneNumber"
                type="input"
                text="text"
                placeholder="Enter your phone Number"
                style={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? 'border-2 border-red-500 bg-white'
                    : ''
                }
                {...formik.getFieldProps('phoneNumber')}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="text-red-500 mt-1 text-sm">
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>

            <div>
              <HSInput
                data-testid="message"
                id="message"
                type="textarea"
                rows={4}
                placeholder="Enter your message here ..."
                style={
                  formik.touched.message && formik.errors.message
                    ? 'border-2 border-red-500 bg-white'
                    : ''
                }
                {...formik.getFieldProps('message')}
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-500 mt-1 text-sm">
                  {formik.errors.message}
                </div>
              ) : null}
            </div>
            <Button
              data-testid="Send Message"
              title={
                loading ? (
                  <BeatLoader data-testid="Loading" color="#ffffff" size={8} />
                ) : (
                  'Send Message'
                )
              }
              onClick={formik.handleSubmit}
            />
          </form>
        </div>
        <div className="w-full md:w-1/2 p-0 bg-white shadow-md rounded-md">
          <img
            src="https://degree.rupacoaching.com/wp-content/uploads/2024/07/Degree-of-services-1-1024x684.webp"
            className="w-full rounded-t-md"
            alt="Dynamites Team"
          />
          <div className="w-full p-8">
            <ul className="list-none">
              <li className="flex flex-row gap-8 font-light text-base">
                <MapIcon className="text-violet-700 w-6" /> 2 KN st, Kigali -
                Rwanda
              </li>
              <li className="flex flex-row gap-8 font-light text-base my-5">
                <FaEnvelope className="text-violet-700 w-6" />{' '}
                info@dynamitesshop.rw
              </li>
              <li className="flex flex-row gap-8 font-light text-base">
                <PhoneIcon className="text-violet-700 w-6" /> +250 782 222 000
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ContactForm;
