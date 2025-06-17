'use client';

import { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaKey,
  FaUserPlus,
  FaChevronDown,
  FaRandom,
  FaInfoCircle
} from 'react-icons/fa';

export default function CreateUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    pin: '',
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => generateRandomPin(), []);

  const generateRandomPin = () => {
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
    setFormData(prev => ({ ...prev, pin: randomPin }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pin' ? value.replace(/\D/g, '') : value
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: 'Please select a valid image file' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'Image size must be less than 5MB' }));
        return;
      }

      // Clear any previous errors
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.profilePicture;
        return newErrors;
      });

      // Update form data and create preview
      setFormData(prev => ({ ...prev, profilePicture: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setFormData(prev => ({ ...prev, profilePicture: null }));
    setPreviewUrl(null);
    // Reset file input
    const fileInput = document.getElementById('profilePicture');
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    if (!/^\d{4,6}$/.test(formData.pin)) {
      newErrors.pin = 'PIN must be 4-6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // For file upload, use FormData
      let submitData;
      let headers = {};

      if (formData.profilePicture) {
        submitData = new FormData();
        submitData.append('email', formData.email);
        submitData.append('password', formData.password);
        submitData.append('role', formData.role);
        submitData.append('pin', formData.pin);
        submitData.append('profilePicture', formData.profilePicture);
        // Don't set Content-Type for FormData
      } else {
        // For JSON data without file
        submitData = JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
          pin: formData.pin
        });
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: headers,
        body: submitData
      });

      const data = await response.json();

      if (!response.ok) {
        const serverErrors = {};
        const errorMessage = data.error.toLowerCase();
        
        if (errorMessage.includes('email')) serverErrors.email = data.error;
        else if (errorMessage.includes('password')) serverErrors.password = data.error;
        else if (errorMessage.includes('role')) serverErrors.role = data.error;
        else if (errorMessage.includes('pin')) serverErrors.pin = data.error;
        else if (errorMessage.includes('profile') || errorMessage.includes('image')) serverErrors.profilePicture = data.error;
        else serverErrors.general = data.error;

        setErrors(serverErrors);
        return;
      }

      setIsSuccess(true);
      setFormData({ email: '', password: '', role: '', pin: '', profilePicture: null });
      setPreviewUrl(null);
      generateRandomPin();
      
      // Reset file input
      const fileInput = document.getElementById('profilePicture');
      if (fileInput) fileInput.value = '';
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setErrors({ general: 'Failed to connect to server. Please try again.' });
    } finally {
      setIsSubmitting(false);
      // Don't clear errors here - only clear on success
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create New User</h1>
            <p className="text-gray-600">Add new users to the dealership management system</p>
          </div>

          {errors.general && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {errors.general}</span>
            </div>
          )}

          {isSuccess && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> User created successfully.</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Profile Picture Section */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Picture (Optional)
              </label>
              <div className="flex items-center space-x-4">
                {/* Profile Picture Preview */}
                <div className="w-24 h-24 rounded-full border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>

                {/* Upload/Change/Remove Buttons */}
                <div className="flex-1">
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                  
                  <div className="flex space-x-2">
                    <label
                      htmlFor="profilePicture"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer text-sm transition duration-200 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      {previewUrl ? 'Change' : 'Upload'}
                    </label>
                    
                    {previewUrl && (
                      <button
                        type="button"
                        onClick={removeProfilePicture}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition duration-200 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JPG, PNG, GIF. Max size: 5MB
                  </p>
                </div>
              </div>
              {errors.profilePicture && <div className="text-red-500 text-sm mt-2">{errors.profilePicture}</div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Field - Full Width */}
              <div className="form-group md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md pl-10 pr-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="user@example.com"
                  />
                </div>
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              {/* Password Field - Full Width */}
              <div className="form-group md:col-span-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md pl-10 pr-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
              </div>

              {/* Role Selection - Left Column */}
              <div className="form-group">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserTag className="text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md pl-10 pr-3 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none bg-white`}
                  >
                    <option value="" disabled>Select a role</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="user">User</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>
                {errors.role && <div className="text-red-500 text-sm mt-1">{errors.role}</div>}
              </div>

              {/* PIN Input - Right Column */}
              <div className="form-group">
                <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-1">
                  PIN (For Internal Use)
                  <span className="inline-block ml-1 text-gray-500">
                    <FaInfoCircle size={14} title="This PIN is auto-generated" />
                  </span>
                </label>
                <div className="relative flex group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaKey className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="pin"
                    name="pin"
                    required
                    value={formData.pin}
                    onChange={handleChange}
                    className={`w-full border ${errors.pin ? 'border-red-500' : 'border-gray-300'} rounded-l-md pl-10 pr-3 py-3 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-blue-500`}
                    placeholder="Auto-generated PIN"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={generateRandomPin}
                    className="bg-gray-200 hover:bg-gray-300 px-3 rounded-r-md border-y border-r border-gray-300 flex items-center justify-center focus:outline-none"
                    title="Generate new PIN"
                  >
                    <FaRandom className="text-gray-600" />
                  </button>
                </div>
                {errors.pin && <div className="text-red-500 text-sm mt-1">{errors.pin}</div>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-200 flex items-center justify-center disabled:opacity-50"
              >
                <FaUserPlus className="mr-2" />
                {isSubmitting ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}