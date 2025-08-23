import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: ''
        };

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            valid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            valid = false;
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
            valid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            valid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                alert('Registration successful!');
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                        <p className="text-gray-600">Join us today and access exclusive features</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                    placeholder="John"
                                />
                                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                placeholder="At least 8 characters"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters with uppercase, lowercase, and number</p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                        </div>

                        <div className="flex items-start">
                            <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                            />
                            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms and Conditions</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                            </label>
                        </div>
                        {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out flex items-center justify-center disabled:opacity-75"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span className="ml-2">GitHub</span>
                            </button>

                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.033 16.01c.564-1.789 1.632-3.932 1.821-4.474.273-.787-.211-1.136-1.74.209l-.34-.64c1.555-1.299 3.427-1.519 4.209-1.519 1.417 0 2.103.891 2.103 1.992 0 1.498-.956 3.727-2.064 5.989-.694 1.441-1.563 2.723-2.354 2.723-.672 0-1.15-.784-2.141-2.88zm6.226-5.607c-.532 1.24-1.321 2.924-1.321 2.924s-.287.566-.533 1.117c.892.301 1.683.285 2.405-.343 0 0 .707-.642 1.258-1.613.552-.971.774-1.858.774-1.858s-.935.035-2.583.713z" />
                                </svg>
                                <span className="ml-2">Twitter</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 py-4 px-6 text-center">
                    <p className="text-xs text-gray-600">
                        &copy; 2023 YourBrand. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;