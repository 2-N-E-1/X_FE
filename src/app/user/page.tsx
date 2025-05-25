'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DIDType {
  id: string;
  name: string;
  description: string;
  requirements: string;
}

export default function UserPage() {
  const [selectedDID, setSelectedDID] = useState<string>('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    organization: '',
  });
  const [qrCode, setQrCode] = useState<string | null>(null);

  // Mock DID types - In real application, this would come from an API
  const didTypes: DIDType[] = [
    {
      id: '1',
      name: 'Corporate Identity',
      description: 'Official corporate identity verification',
      requirements: 'Company registration number, Business license',
    },
    {
      id: '2',
      name: 'Professional Certification',
      description: 'Professional qualification verification',
      requirements: 'Professional license, Certification documents',
    },
  ];

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement DID application logic
    console.log('Applying for DID:', { selectedDID, userInfo });
    
    // Mock QR code generation - In real application, this would be generated based on DID
    setQrCode('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=example-did-data');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <Link href="/" className="text-2xl font-bold text-blue-800">DID 관리시스템</Link>
              </motion.div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {['회사소개', '서비스 소개', '활용체계', '알림마당', '인재채용', '사회적 환경', '사업제휴'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link 
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link 
                    href="/admin"
                    className="text-blue-800 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    관리자
                  </Link>
                </motion.div>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link 
                href="/en" 
                className="text-gray-700 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                ENG
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-4">DID Application Portal</h1>
              <p className="text-xl text-gray-200">Apply for your official digital identity credentials</p>
            </motion.div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Available DID Types</h2>
                <div className="space-y-4">
                  {didTypes.map((did) => (
                    <motion.div
                      key={did.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedDID === did.id 
                          ? 'border-blue-800 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-800/50'
                      }`}
                      onClick={() => setSelectedDID(did.id)}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 h-5 w-5 mt-0.5 rounded-full border ${
                          selectedDID === did.id ? 'border-blue-800 bg-blue-800' : 'border-gray-300'
                        }`}>
                          {selectedDID === did.id && (
                            <div className="h-full w-full rounded-full bg-blue-800 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{did.name}</h3>
                          <p className="mt-1 text-sm text-gray-600">{did.description}</p>
                          <p className="mt-2 text-sm text-gray-500">
                            <span className="font-medium">Requirements:</span> {did.requirements}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Applications</span>
                    <span className="text-lg font-semibold text-blue-800">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved DIDs</span>
                    <span className="text-lg font-semibold text-blue-800">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Review</span>
                    <span className="text-lg font-semibold text-blue-800">1</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              {selectedDID ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Application Form</h2>
                    <p className="mt-1 text-sm text-gray-500">Please provide your information to complete the application</p>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleApply} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="email"
                            value={userInfo.email}
                            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                          Organization
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="organization"
                            value={userInfo.organization}
                            onChange={(e) => setUserInfo({ ...userInfo, organization: e.target.value })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="Enter your organization name"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-md shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-all duration-200"
                        >
                          Submit Application
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a DID Type</h3>
                  <p className="text-gray-500">Please select a DID type from the left to begin your application</p>
                </div>
              )}

              {/* QR Code Display */}
              {qrCode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Your DID QR Code</h2>
                    <p className="mt-1 text-sm text-gray-500">Save this QR code for future use</p>
                  </div>
                  <div className="p-6 text-center">
                    <div className="inline-block p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                      <img src={qrCode} alt="DID QR Code" className="mx-auto" />
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                      This QR code contains your digital identity information. Keep it secure and present it when required.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.print()}
                      className="mt-4 px-4 py-2 text-sm font-medium text-blue-800 bg-white border border-blue-800 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-all duration-200"
                    >
                      Download QR Code
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 