import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikInput from '../components/formikInput';
import showToast from '../utils/toast';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
     const res =  await login(values);
     if(res?.status == 200){
       showToast('success', 'Logged in successfully');
     }
    } catch (err) {
      showToast('error', err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div
        className="hidden md:block md:w-1/2 h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')" }}
      >
        <div className="h-full w-full bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-extrabold max-w-xs px-6">
            Welcome Back! <br /> Log in to continue your journey.
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:w-1/2 w-full md:p-8 bg-gray-50">
        <div className="max-w-md w-full p-3 bg-white md:p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">BACK STORIES</h2>
          <Formik
            initialValues={{ email: 'bishan42@gmail.com', password: '123456' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormikInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                />
                <FormikInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                />

                <div>Not having an account ? <span className='text-blue-600 cursor-pointer' onClick={() => navigate("/register")}>Register</span></div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
