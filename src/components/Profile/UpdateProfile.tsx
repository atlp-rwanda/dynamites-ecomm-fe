import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import BeatLoader from 'react-spinners/BeatLoader';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import Button from '@/components/form/Button';
import HSInput from '@/components/form/HSInput';
import { updateProfile, resetStatus } from '@/features/Profile/ProfileSlice';

interface MyFormValues {
  fname: string;
  lname: string;
  email: string;
}

const validationSchema: yup.ObjectSchema<MyFormValues> = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required!'),
  fname: yup.string().required('First name is required!'),
  lname: yup.string().required('Last name is required!'),
});

function UpdateProfile() {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.profile);
  const user = useAppSelector((state) => state.signIn.user);

  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const formik = useFormik<MyFormValues>({
    initialValues: {
      fname: user?.firstName || '',
      lname: user?.lastName || '',
      email: user?.email || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (user) {
        dispatch(
          updateProfile({
            id: user.id,
            firstName: values.fname,
            lastName: values.lname,
            email: values.email,
          })
        );
      }
    },
  });

  React.useEffect(() => {
    if (user) {
      formik.setValues({
        fname: user.firstName || '',
        lname: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user, formik]);

  React.useEffect(() => {
    if (success) {
      setSuccessMessage('Profile updated successfully!');
      setErrorMessage(null);
      dispatch(resetStatus());
    } else if (error) {
      setErrorMessage(`Error: ${error}`);
      setSuccessMessage(null);
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  return (
    <div className="w-full mx-auto my-8 md:my-20 px-6 md:px-8 lg:px-32">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="w-full flex flex-col md:w-1/3 md:px-4 py-12 text-center items-center gap-4">
          <img
            src={user?.picture}
            className="w-1/2 rounded-3xl aspect-square object-cover object-center text-center mb-4"
            alt="User Profile"
          />
          <h3 className="text-xl text-black font-bold text-center">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-md text-black text-center">{user?.email}</p>
        </div>

        <div className="w-full md:w-2/3 py-8 md:py-8 border-t md:border-t-0 md:border-l border-gray-300 pl-0 md:pl-10">
          <h1 className="text-2xl font-bold text-black text-left mb-16">
            Profile Settings
          </h1>

          <form
            className="flex flex-col gap-6 mt-6"
            data-testid="form"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col md:flex-row flex-nowrap gap-5">
              <div className="w-full md:w-1/2">
                <HSInput
                  data-testid="Fname"
                  id="fname"
                  type="input"
                  label="First name"
                  placeholder="Enter your first name"
                  style={
                    formik.touched.fname && formik.errors.fname
                      ? 'border-2 border-red-500 bg-white'
                      : ''
                  }
                  name="fname"
                  values={formik.values.fname}
                  onChange={(e) => handleChange(e, formik.setFieldValue)}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fname && formik.errors.fname ? (
                  <div className="text-red-500 mt-1 text-sm">
                    {formik.errors.fname}
                  </div>
                ) : null}
              </div>
              <div className="w-full md:w-1/2">
                <HSInput
                  data-testid="Lname"
                  id="lname"
                  type="input"
                  label="Last name"
                  placeholder="Enter your last name"
                  style={
                    formik.touched.lname && formik.errors.lname
                      ? 'border-2 border-red-500 bg-white'
                      : ''
                  }
                  name="lname"
                  values={formik.values.lname}
                  onChange={(e) => handleChange(e, formik.setFieldValue)}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lname && formik.errors.lname ? (
                  <div className="text-red-500 mt-1 text-sm">
                    {formik.errors.lname}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <HSInput
                data-testid="email"
                id="email"
                type="input"
                label="Email"
                placeholder="Enter your email"
                style={
                  formik.touched.email && formik.errors.email
                    ? 'border-2 border-red-500 bg-white'
                    : ''
                }
                name="email"
                values={formik.values.email}
                onChange={(e) => handleChange(e, formik.setFieldValue)}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 mt-1 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <Button
              data-testid="Update Profile"
              title={
                loading ? (
                  <BeatLoader data-testid="Loading" color="#ffffff" size={8} />
                ) : (
                  'Update Profile'
                )
              }
              onClick={formik.handleSubmit}
            />
          </form>

          {successMessage && (
            <p
              className="mt-4 bg-green-500 text-white rounded-md p-3 text-xl"
              data-testid="successMessage"
            >
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p
              className="mt-4 bg-red-500 text-white rounded-md p-3 text-xl"
              data-testid="errorMessage"
            >
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
