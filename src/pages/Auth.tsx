import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaUser, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import supabase from '../supabaseClient';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) alert(error.message);
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          },
        },
      });
      if (error) {
        alert(error.message);
      } else {
        alert('Check your email for a verification link!');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      alert(`Error signing in with Google: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className={`auth-container ${isSignIn ? '' : 'right-panel-active'}`}>
        <div className="form-container sign-up-container">
          <motion.form 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 w-full max-w-md"
          >
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>
            
            <div className="flex justify-center mb-6">
              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="text-xl" />
                <span>Sign up with Google</span>
              </button>
            </div>
            
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-4 text-gray-500 text-sm">or use your email</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <FaUserPlus />
                <span>Sign Up</span>
              </button>
            </div>
          </motion.form>
        </div>
        
        <div className="form-container sign-in-container">
          <motion.form 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-white p-8  w-full max-w-md z-10"
          >
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign in</h1>
            
            <div className="flex justify-center mb-6">
              <button 
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FcGoogle className="text-xl" />
                <span>Sign in with Google</span>
              </button>
            </div>
            
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-gray-300 w-full"></div>
              <span className="bg-white px-4 text-gray-500 text-sm">or use your account</span>
              <div className="border-t border-gray-300 w-full"></div>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <a href="#" className="text-sm text-green-600 hover:underline">Forgot your password?</a>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <FaSignInAlt />
                <span>Sign In</span>
              </button>
            </div>
          </motion.form>
        </div>
        
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-white"
              >
                <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
                <p className="mb-6">To keep connected with us please login with your personal info</p>
                <button
                  onClick={() => setIsSignIn(true)}
                  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-green-600 transition-colors"
                >
                  Sign In
                </button>
              </motion.div>
            </div>
            <div className="overlay-panel overlay-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-white"
              >
                <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
                <p className="mb-6">Enter your personal details and start your journey with us</p>
                <button
                  onClick={() => setIsSignIn(false)}
                  className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-green-600 transition-colors"
                >
                  Sign Up
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default Auth;
