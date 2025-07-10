import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../components/formikInput';
import showToast from '../utils/toast';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Username too short').required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
   const navigate = useNavigate()
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      delete values.confirmPassword
      const res = await register(values);
      console.log("vallllllllllllllllllllllll",res)
      if(res?.status == 201){
         showToast("success","User registered successfully")
         navigate("/")
      }
    } catch (err) {
      showToast('error', err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div
        className="hidden md:block md:w-1/2 h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-extrabold max-w-xs px-6">
            Join Us! <br />
            Start your journey today.
          </h1>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center md:w-1/2 w-full p-8 bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Account</h2>
          <Formik
            initialValues={{
              username: 'bishan',
              email: 'bk@gmail.com',
              password: '123456',
              confirmPassword: '123456',
              birthdate:"2001-03-02"
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikInput
                  name="username"
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                />
                <FormikInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <FormikInput
                  name="birthDate"
                  type="date"
                  label="Date"
                  placeholder="Confirm your password"
                />
                <FormikInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                />
                <FormikInput
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />
                <div>Already having an account ? <span className='text-blue-600 cursor-pointer' onClick={() => navigate("/login")}>Login</span></div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 font-semibold"
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
