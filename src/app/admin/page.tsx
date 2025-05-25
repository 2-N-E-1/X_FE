'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DIDType {
  id: string;
  name: string;
  description: string;
  requirements: string;
  createdAt: string;
  totalApplications: number;
}

interface Application {
  id: string;
  didType: string;
  userName: string;
  email: string;
  organization: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

interface Activity {
  id: string;
  type: 'creation' | 'application' | 'approval' | 'rejection';
  didType: string;
  userName: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  transactionHash: string;
  details: string;
}

interface Corporation {
  id: string;
  name: string;
  logo: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  totalDIDs: number;
  totalUsers: number;
}

export default function AdminPage() {
  const [didName, setDidName] = useState('');
  const [didDescription, setDidDescription] = useState('');
  const [didRequirements, setDidRequirements] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'did-management' | 'applications'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - In real application, this would come from an API
  const existingDIDs: DIDType[] = [
    {
      id: '1',
      name: 'Corporate Identity',
      description: 'Official corporate identity verification',
      requirements: 'Company registration number, Business license',
      createdAt: '2024-03-15',
      totalApplications: 45
    },
    {
      id: '2',
      name: 'Professional Certification',
      description: 'Professional qualification verification',
      requirements: 'Professional license, Certification documents',
      createdAt: '2024-03-10',
      totalApplications: 28
    }
  ];

  const applications: Application[] = [
    {
      id: '1',
      didType: 'Corporate Identity',
      userName: 'John Doe',
      email: 'john@example.com',
      organization: 'ABC Corp',
      status: 'pending',
      submittedAt: '2024-03-20'
    },
    {
      id: '2',
      didType: 'Professional Certification',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      organization: 'XYZ Ltd',
      status: 'approved',
      submittedAt: '2024-03-19'
    }
  ];

  // Mock activity data - In real application, this would come from an API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'application',
      didType: 'Corporate Identity',
      userName: 'John Doe',
      timestamp: '2024-03-20 14:30:45',
      status: 'pending',
      transactionHash: '0x7d3f...8a2b',
      details: 'New application submitted for Corporate Identity DID'
    },
    {
      id: '2',
      type: 'approval',
      didType: 'Professional Certification',
      userName: 'Jane Smith',
      timestamp: '2024-03-20 13:15:22',
      status: 'approved',
      transactionHash: '0x9e4c...1f3d',
      details: 'Application approved for Professional Certification DID'
    },
    {
      id: '3',
      type: 'creation',
      didType: 'Educational Credential',
      userName: 'System Admin',
      timestamp: '2024-03-20 11:45:10',
      status: 'approved',
      transactionHash: '0x2b5a...7c9d',
      details: 'New DID type created: Educational Credential'
    },
    {
      id: '4',
      type: 'rejection',
      didType: 'Corporate Identity',
      userName: 'Mike Johnson',
      timestamp: '2024-03-20 10:20:33',
      status: 'rejected',
      transactionHash: '0x4f8e...2d6a',
      details: 'Application rejected due to incomplete documentation'
    },
    {
      id: '5',
      type: 'application',
      didType: 'Professional Certification',
      userName: 'Sarah Wilson',
      timestamp: '2024-03-20 09:05:17',
      status: 'pending',
      transactionHash: '0x1a7b...9c4d',
      details: 'New application submitted for Professional Certification DID'
    }
  ];

  // Mock corporation data - In real application, this would come from an API
  const corporation: Corporation = {
    id: '1',
    name: 'Government Digital Identity Authority',
    logo: '/images/gov-logo.png', // You'll need to add this image to your public folder
    role: 'System Administrator',
    lastLogin: '2024-03-20 15:30:00',
    status: 'active',
    totalDIDs: 156,
    totalUsers: 2345
  };

  const handleCreateDID = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement DID creation logic
    console.log('Creating new DID:', { didName, didDescription, didRequirements });
  };

  const handleApplicationStatus = (applicationId: string, newStatus: 'approved' | 'rejected') => {
    // TODO: Implement application status update logic
    console.log('Updating application status:', { applicationId, newStatus });
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
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                {['회사소개', '서비스 소개', '활용체계', '알림마당', '인재채용', '사회적 환경', '사업제휴'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link 
                      href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-700 hover:text-blue-800 px-2 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              {/* Corporation Profile */}
              <div className="hidden md:flex items-center space-x-3 border-r border-gray-200 pr-4">
                <div className="flex-shrink-0">
                  <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-medium text-xs">
                      {corporation.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-900 truncate max-w-[200px]">{corporation.name}</span>
                  <span className="text-[10px] text-gray-500">{corporation.role}</span>
                </div>
              </div>
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
              <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl text-gray-200">Manage DID types and applications</p>
            </motion.div>
          </div>
        </div>

        {/* Corporation Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-medium text-2xl">
                    {corporation.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{corporation.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      corporation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {corporation.status.charAt(0).toUpperCase() + corporation.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">Last login: {corporation.lastLogin}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">{corporation.totalDIDs}</p>
                  <p className="text-sm text-gray-500">Total DIDs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">{corporation.totalUsers}</p>
                  <p className="text-sm text-gray-500">Total Users</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'did-management', label: 'DID Management' },
                  { id: 'applications', label: 'Applications' }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-800 text-blue-800'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Stats Cards */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900">Total DID Types</h3>
                <p className="mt-2 text-3xl font-bold text-blue-800">{existingDIDs.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900">Total Applications</h3>
                <p className="mt-2 text-3xl font-bold text-blue-800">{applications.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900">Pending Reviews</h3>
                <p className="mt-2 text-3xl font-bold text-blue-800">
                  {applications.filter(app => app.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900">Approved DIDs</h3>
                <p className="mt-2 text-3xl font-bold text-blue-800">
                  {applications.filter(app => app.status === 'approved').length}
                </p>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">DID Activity Explorer</h3>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-1 text-sm text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    >
                      Export
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-1 text-sm text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    >
                      Refresh
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                              activity.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">{activity.timestamp}</span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900">{activity.details}</p>
                            <div className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">DID Type:</span> {activity.didType}
                              {activity.userName !== 'System Admin' && (
                                <span className="ml-4">
                                  <span className="font-medium">User:</span> {activity.userName}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono text-gray-500">
                            TX: {activity.transactionHash}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-blue-800 hover:text-blue-900"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <span>Showing last 5 activities</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    View All Activities
                  </motion.button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('did-management')}
                    className="p-4 bg-blue-50 rounded-lg text-blue-800 hover:bg-blue-100 transition-colors duration-200"
                  >
                    Create New DID Type
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('applications')}
                    className="p-4 bg-blue-50 rounded-lg text-blue-800 hover:bg-blue-100 transition-colors duration-200"
                  >
                    Review Applications
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* DID Management Tab */}
          {activeTab === 'did-management' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Create New DID Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Create New DID Type</h2>
                    <p className="mt-1 text-sm text-gray-500">Define a new type of digital identity</p>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleCreateDID} className="space-y-6">
                      <div>
                        <label htmlFor="didName" className="block text-sm font-medium text-gray-700">
                          DID Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="didName"
                            value={didName}
                            onChange={(e) => setDidName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="Enter DID name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="didDescription" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="didDescription"
                            value={didDescription}
                            onChange={(e) => setDidDescription(e.target.value)}
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="Enter DID description"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="didRequirements" className="block text-sm font-medium text-gray-700">
                          Requirements
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="didRequirements"
                            value={didRequirements}
                            onChange={(e) => setDidRequirements(e.target.value)}
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="Enter DID requirements"
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
                          Create DID Type
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Existing DIDs List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">Existing DID Types</h2>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search DIDs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {existingDIDs.map((did) => (
                      <div key={did.id} className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{did.name}</h3>
                            <p className="mt-1 text-sm text-gray-600">{did.description}</p>
                            <p className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">Requirements:</span> {did.requirements}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Created: {did.createdAt} | Applications: {did.totalApplications}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-3 py-1 text-sm text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="px-3 py-1 text-sm text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                            >
                              Delete
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Applications</h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          DID Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Organization
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{app.userName}</div>
                            <div className="text-sm text-gray-500">{app.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.didType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.organization}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              app.status === 'approved' ? 'bg-green-100 text-green-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.submittedAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {app.status === 'pending' && (
                              <div className="flex justify-end space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleApplicationStatus(app.id, 'approved')}
                                  className="text-green-800 hover:text-green-900"
                                >
                                  Approve
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleApplicationStatus(app.id, 'rejected')}
                                  className="text-red-800 hover:text-red-900"
                                >
                                  Reject
                                </motion.button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 