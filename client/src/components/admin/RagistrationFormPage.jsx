import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    aadhaarNumber: "",
    fatherMotherName: "",
    studentContact: "",
    parentContact: "",
    email: "",
    currentAddress: "",
    city: "",
    state: "",
    pincode: "",
    aadhaarFile: null,
    passportPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call)
    console.log("Form data submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Succeed House of English - Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Basic Student Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Basic Student Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Full Name */}
              <div className="md:col-span-3 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Aadhaar Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Aadhaar Card Number
                </label>
                <input
                  type="number"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleChange}
                  placeholder="e.g., 1234 5678 9012"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Upload Aadhaar Card */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Aadhaar Card
                </label>
                <input
                  type="file"
                  name="aadhaarFile"
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {/* Upload Passport Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload Passport Photo
                </label>
                <input
                  type="file"
                  name="passportPhoto"
                  onChange={handleChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Father's / Mother's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Father's / Mother's Name
                </label>
                <input
                  type="text"
                  name="fatherMotherName"
                  value={formData.fatherMotherName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Student's Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Student's Contact Number
                </label>
                <input
                  type="number"
                  name="studentContact"
                  value={formData.studentContact}
                  onChange={handleChange}
                  placeholder="e.g., +91 9876543210"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Parent's / Guardian's Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Parent's / Guardian's Contact Number
                </label>
                <input
                  type="number"
                  name="parentContact"
                  value={formData.parentContact}
                  onChange={handleChange}
                  placeholder="e.g., +91 9876543210"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email ID
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., yourname@example.com"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </section>

          {/* Section: Address Details */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              Address Details
            </h2>
            <div className="space-y-4">
         
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Address
                </label>
                <textarea
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
