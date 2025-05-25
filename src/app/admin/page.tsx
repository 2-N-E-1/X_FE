'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface AccessPass {
  id: string;
  name: string;
  description: string;
  issuingBody: string;
  authorizedLocations: AuthorizedLocation[];
  validityPeriod: {
    start: string;
    end: string;
  };
  transferable: boolean;
  tradable: boolean;
  createdAt: string;
  totalIssued: number;
  activeCount: number;
  passType: 'employee_badge' | 'student_id' | 'event_ticket' | 'retail_access' | 'custom';
}

interface AuthorizedLocation {
  id: string;
  name: string;
  address: string;
  accessType: 'entry' | 'payment' | 'both';
  deviceIds: string[];
}

interface PassHolder {
  id: string;
  passId: string;
  userName: string;
  email: string;
  mobileId: string;
  organization: string;
  status: 'active' | 'expired' | 'revoked' | 'pending';
  issuedAt: string;
  lastUsed: string;
  accessHistory: AccessRecord[];
}

interface AccessRecord {
  id: string;
  locationId: string;
  locationName: string;
  timestamp: string;
  accessType: 'entry' | 'payment';
  status: 'success' | 'denied';
  deviceId: string;
}

interface PassTransaction {
  id: string;
  txHash: string;
  blockNumber: number;
  timestamp: string;
  type: 'mint' | 'transfer' | 'revoke' | 'update' | 'access';
  from: string;
  to: string;
  passId: string;
  passName: string;
  gasUsed: number;
  gasPrice: string;
  status: 'success' | 'failed' | 'pending';
  details: string;
}

interface Activity {
  id: string;
  type: 'issuance' | 'revocation' | 'update' | 'access' | 'batch_update' | 'location_added';
  passName: string;
  userName: string;
  timestamp: string;
  status: 'success' | 'failed';
  location: string;
  details: string;
  batchSize?: number;
}

interface Organization {
  id: string;
  name: string;
  logo: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  totalPasses: number;
  totalUsers: number;
  totalLocations: number;
  subscriptionTier: 'basic' | 'premium' | 'enterprise';
  monthlyUsage: number;
  usageLimit: number;
}

interface Analytics {
  totalScans: number;
  successfulScans: number;
  failedScans: number;
  topLocations: { name: string; count: number; }[];
  peakHours: { hour: number; count: number; }[];
  passTypeDistribution: { type: string; count: number; }[];
}

export default function AdminPage() {
  const [passName, setPassName] = useState('');
  const [passDescription, setPassDescription] = useState('');
  const [issuingBody, setIssuingBody] = useState('');
  const [passType, setPassType] = useState<AccessPass['passType']>('custom');
  const [authorizedLocations, setAuthorizedLocations] = useState<AuthorizedLocation[]>([]);
  const [validityStart, setValidityStart] = useState('');
  const [validityEnd, setValidityEnd] = useState('');
  const [isTransferable, setIsTransferable] = useState(false);
  const [isTradable, setIsTradable] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pass-management' | 'pass-detail'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPassId, setSelectedPassId] = useState<string>('');
  const [txSearchQuery, setTxSearchQuery] = useState('');

  // Mock data - In real application, this would come from an API
  const existingPasses: AccessPass[] = [
    {
      id: '1',
      name: '직원 출입증',
      description: '사무실 건물 및 시설 출입용',
      issuingBody: '인사부',
      passType: 'employee_badge',
      authorizedLocations: [
        { id: '1', name: '본사 사무실', address: '서울시 강남구', accessType: 'entry', deviceIds: ['scanner_001', 'scanner_002'] },
        { id: '2', name: '연구소', address: '서울시 서초구', accessType: 'entry', deviceIds: ['scanner_003'] },
        { id: '3', name: '주차장', address: '서울시 강남구', accessType: 'entry', deviceIds: ['gate_001'] }
      ],
      validityPeriod: {
        start: '2024-03-01',
        end: '2024-12-31'
      },
      transferable: false,
      tradable: false,
      createdAt: '2024-03-15',
      totalIssued: 45,
      activeCount: 42
    },
    {
      id: '2',
      name: '학생증',
      description: '캠퍼스 시설 이용 및 출입용',
      issuingBody: '학생처',
      passType: 'student_id',
      authorizedLocations: [
        { id: '4', name: '도서관', address: '대학교 캠퍼스', accessType: 'entry', deviceIds: ['lib_scanner_001'] },
        { id: '5', name: '기숙사', address: '대학교 캠퍼스', accessType: 'entry', deviceIds: ['dorm_scanner_001'] },
        { id: '6', name: '체육관', address: '대학교 캠퍼스', accessType: 'entry', deviceIds: ['gym_scanner_001'] }
      ],
      validityPeriod: {
        start: '2024-03-01',
        end: '2024-08-31'
      },
      transferable: false,
      tradable: false,
      createdAt: '2024-03-10',
      totalIssued: 28,
      activeCount: 26
    },
    {
      id: '3',
      name: '콘서트 티켓',
      description: '2024 봄 콘서트 입장권',
      issuingBody: '이벤트 기획팀',
      passType: 'event_ticket',
      authorizedLocations: [
        { id: '7', name: '올림픽공원 체조경기장', address: '서울시 송파구', accessType: 'entry', deviceIds: ['venue_scanner_001', 'venue_scanner_002'] }
      ],
      validityPeriod: {
        start: '2024-04-15',
        end: '2024-04-15'
      },
      transferable: true,
      tradable: true,
      createdAt: '2024-03-01',
      totalIssued: 1500,
      activeCount: 1450
    }
  ];

  const passHolders: PassHolder[] = [
    {
      id: '1',
      passId: '1',
      userName: '김철수',
      email: 'kim@example.com',
      mobileId: 'mobile_id_001',
      organization: '개발팀',
      status: 'active',
      issuedAt: '2024-03-20',
      lastUsed: '2024-03-21 14:30',
      accessHistory: [
        { id: '1', locationId: '1', locationName: '본사 사무실', timestamp: '2024-03-21 14:30', accessType: 'entry', status: 'success', deviceId: 'scanner_001' }
      ]
    },
    {
      id: '2',
      passId: '2',
      userName: '이영희',
      email: 'lee@example.com',
      mobileId: 'mobile_id_002',
      organization: '컴퓨터공학과',
      status: 'active',
      issuedAt: '2024-03-19',
      lastUsed: '2024-03-21 15:45',
      accessHistory: [
        { id: '2', locationId: '4', locationName: '도서관', timestamp: '2024-03-21 15:45', accessType: 'entry', status: 'success', deviceId: 'lib_scanner_001' }
      ]
    }
  ];

  // Mock activity data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'issuance',
      passName: '직원 출입증',
      userName: '김철수',
      timestamp: '2024-03-20 14:30:45',
      status: 'success',
      location: '본사 사무실',
      details: '김철수에게 새 출입증 발급'
    },
    {
      id: '2',
      type: 'access',
      passName: '학생증',
      userName: '이영희',
      timestamp: '2024-03-20 13:15:22',
      status: 'success',
      location: '도서관',
      details: '도서관 출입 승인'
    },
    {
      id: '3',
      type: 'batch_update',
      passName: '직원 출입증',
      userName: '시스템',
      timestamp: '2024-03-19 10:00:00',
      status: 'success',
      location: '시스템',
      details: '45개 패스 유효기간 일괄 연장',
      batchSize: 45
    }
  ];

  // Mock organization data
  const organization: Organization = {
    id: '1',
    name: 'NexKey 액세스 관리',
    logo: '/images/NexKey_logo.png',
    role: '시스템 관리자',
    lastLogin: '2024-03-20 15:30:00',
    status: 'active',
    totalPasses: 156,
    totalUsers: 2345,
    totalLocations: 25,
    subscriptionTier: 'enterprise',
    monthlyUsage: 15420,
    usageLimit: 50000
  };

  // Mock analytics data
  const analytics: Analytics = {
    totalScans: 15420,
    successfulScans: 14890,
    failedScans: 530,
    topLocations: [
      { name: '본사 사무실', count: 5420 },
      { name: '도서관', count: 3210 },
      { name: '주차장', count: 2890 }
    ],
    peakHours: [
      { hour: 9, count: 1200 },
      { hour: 18, count: 1100 },
      { hour: 12, count: 800 }
    ],
    passTypeDistribution: [
      { type: '직원 출입증', count: 45 },
      { type: '학생증', count: 28 },
      { type: '이벤트 티켓', count: 83 }
    ]
  };

  // Mock transaction data
  const passTransactions: PassTransaction[] = [
    {
      id: '1',
      txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      blockNumber: 18450123,
      timestamp: '2024-03-21 14:30:45',
      type: 'mint',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e1e1',
      passId: '1',
      passName: '직원 출입증',
      gasUsed: 85000,
      gasPrice: '20.5',
      status: 'success',
      details: '김철수에게 직원 출입증 발급'
    },
    {
      id: '2',
      txHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      blockNumber: 18450124,
      timestamp: '2024-03-21 14:35:22',
      type: 'access',
      from: '0x742d35Cc6634C0532925a3b8D4C0C8b3C2e1e1e1',
      to: '0x0000000000000000000000000000000000000000',
      passId: '1',
      passName: '직원 출입증',
      gasUsed: 21000,
      gasPrice: '18.2',
      status: 'success',
      details: '본사 사무실 출입 기록'
    },
    {
      id: '3',
      txHash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
      blockNumber: 18450089,
      timestamp: '2024-03-20 15:45:12',
      type: 'mint',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x8f9e8d7c6b5a4938271605f4e3d2c1b0a9988776',
      passId: '2',
      passName: '학생증',
      gasUsed: 85000,
      gasPrice: '22.1',
      status: 'success',
      details: '이영희에게 학생증 발급'
    },
    {
      id: '4',
      txHash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      blockNumber: 18450090,
      timestamp: '2024-03-20 16:12:33',
      type: 'access',
      from: '0x8f9e8d7c6b5a4938271605f4e3d2c1b0a9988776',
      to: '0x0000000000000000000000000000000000000000',
      passId: '2',
      passName: '학생증',
      gasUsed: 21000,
      gasPrice: '19.8',
      status: 'success',
      details: '도서관 출입 기록'
    },
    {
      id: '5',
      txHash: '0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
      blockNumber: 18449950,
      timestamp: '2024-03-19 10:00:00',
      type: 'update',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      to: '0x0000000000000000000000000000000000000000',
      passId: '1',
      passName: '직원 출입증',
      gasUsed: 45000,
      gasPrice: '25.0',
      status: 'success',
      details: '45개 패스 유효기간 일괄 연장'
    },
    {
      id: '6',
      txHash: '0x6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
      blockNumber: 18450125,
      timestamp: '2024-03-21 15:20:10',
      type: 'transfer',
      from: '0x9876543210fedcba9876543210fedcba98765432',
      to: '0x1111222233334444555566667777888899990000',
      passId: '3',
      passName: '콘서트 티켓',
      gasUsed: 65000,
      gasPrice: '30.5',
      status: 'success',
      details: '콘서트 티켓 양도'
    }
  ];

  const handleCreatePass = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement pass creation logic with OpenDID integration
    console.log('Creating new access pass:', { 
      passName, 
      passDescription, 
      issuingBody,
      passType,
      authorizedLocations,
      validityStart,
      validityEnd,
      isTransferable,
      isTradable
    });
  };

  const handlePassStatus = (passId: string, newStatus: 'active' | 'expired' | 'revoked') => {
    // TODO: Implement pass status update logic
    console.log('Updating pass status:', { passId, newStatus });
  };

  const handlePassDetail = (passId: string) => {
    setSelectedPassId(passId);
    setActiveTab('pass-detail');
  };

  const addAuthorizedLocation = () => {
    const newLocation: AuthorizedLocation = {
      id: Date.now().toString(),
      name: '',
      address: '',
      accessType: 'entry',
      deviceIds: []
    };
    setAuthorizedLocations([...authorizedLocations, newLocation]);
  };

  const updateAuthorizedLocation = (index: number, field: keyof AuthorizedLocation, value: any) => {
    const updated = [...authorizedLocations];
    updated[index] = { ...updated[index], [field]: value };
    setAuthorizedLocations(updated);
  };

  const removeAuthorizedLocation = (index: number) => {
    setAuthorizedLocations(authorizedLocations.filter((_, i) => i !== index));
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
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/images/NexKey_logo.png"
                    alt="NexKey"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              {/* Subscription Status */}
              <div className="hidden md:flex items-center space-x-3 border-r border-gray-200 pr-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-900">{organization.subscriptionTier.toUpperCase()}</span>
                  <span className="text-[10px] text-gray-500">
                    {organization.monthlyUsage.toLocaleString()} / {organization.usageLimit.toLocaleString()} 사용량
                  </span>
                </div>
              </div>
              {/* Organization Profile */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-800 font-medium text-xs">
                      {organization.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-900 truncate max-w-[200px]">{organization.name}</span>
                  <span className="text-[10px] text-gray-500">{organization.role}</span>
                </div>
              </div>
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
              <h1 className="text-4xl font-bold mb-4">접근 관리 대시보드</h1>
              <p className="text-xl text-gray-200">액세스 패스 발급 및 관리</p>
            </motion.div>
          </div>
        </div>

        {/* Organization Overview */}
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
                    {organization.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{organization.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      organization.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {organization.status.charAt(0).toUpperCase() + organization.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">마지막 로그인: {organization.lastLogin}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">{organization.totalPasses}</p>
                  <p className="text-sm text-gray-500">전체 패스</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">{organization.totalUsers}</p>
                  <p className="text-sm text-gray-500">전체 사용자</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-800">{organization.totalLocations}</p>
                  <p className="text-sm text-gray-500">승인된 위치</p>
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
                  { id: 'dashboard', label: '대시보드' },
                  { id: 'pass-management', label: '패스 관리' }
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
                <h3 className="text-lg font-medium text-gray-900">전체 패스 유형</h3>
                <p className="mt-2 text-3xl font-bold text-blue-800">{existingPasses.length}</p>
                <p className="mt-1 text-sm text-gray-500">
                  총 {existingPasses.reduce((sum, pass) => sum + pass.totalIssued, 0)}개 발급
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900">활성 패스</h3>
                <p className="mt-2 text-3xl font-bold text-green-800">
                  {passHolders.filter(holder => holder.status === 'active').length}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {Math.round((passHolders.filter(holder => holder.status === 'active').length / passHolders.length) * 100)}% 활성화율
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900">이번 달 스캔</h3>
                <p className="mt-2 text-3xl font-bold text-blue-800">{analytics.totalScans.toLocaleString()}</p>
                <p className="mt-1 text-sm text-gray-500">
                  성공률 {Math.round((analytics.successfulScans / analytics.totalScans) * 100)}%
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900">사용량</h3>
                <p className="mt-2 text-3xl font-bold text-blue-800">
                  {Math.round((organization.monthlyUsage / organization.usageLimit) * 100)}%
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {organization.monthlyUsage.toLocaleString()} / {organization.usageLimit.toLocaleString()}
                </p>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">최근 활동</h3>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-1 text-sm text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    >
                      내보내기
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-1 text-sm text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    >
                      새로고침
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
                              activity.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">{activity.timestamp}</span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900">{activity.details}</p>
                            <div className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">패스:</span> {activity.passName}
                              <span className="ml-4">
                                <span className="font-medium">사용자:</span> {activity.userName}
                              </span>
                              <span className="ml-4">
                                <span className="font-medium">위치:</span> {activity.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <span>마지막 5개 활동 표시</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    모든 활동 보기
                  </motion.button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">빠른 작업</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('pass-management')}
                    className="p-4 bg-blue-50 rounded-lg text-blue-800 hover:bg-blue-100 transition-colors duration-200"
                  >
                    새 패스 유형 생성
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab('pass-management')}
                    className="p-4 bg-blue-50 rounded-lg text-blue-800 hover:bg-blue-100 transition-colors duration-200"
                  >
                    패스 상세 관리
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pass Management Tab */}
          {activeTab === 'pass-management' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Create New Pass Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">새 패스 유형 생성</h2>
                    <p className="mt-1 text-sm text-gray-500">새로운 액세스 패스 유형 정의</p>
                  </div>
                  <div className="p-6">
                    <form onSubmit={handleCreatePass} className="space-y-6">
                      <div>
                        <label htmlFor="passName" className="block text-sm font-medium text-gray-700">
                          패스 이름
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="passName"
                            value={passName}
                            onChange={(e) => setPassName(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="패스 이름 입력"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="passType" className="block text-sm font-medium text-gray-700">
                          패스 유형
                        </label>
                        <div className="mt-1">
                          <select
                            id="passType"
                            value={passType}
                            onChange={(e) => setPassType(e.target.value as AccessPass['passType'])}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            required
                          >
                            <option value="employee_badge">직원 출입증</option>
                            <option value="student_id">학생증</option>
                            <option value="event_ticket">이벤트 티켓</option>
                            <option value="retail_access">매장 출입</option>
                            <option value="custom">사용자 정의</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="passDescription" className="block text-sm font-medium text-gray-700">
                          설명
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="passDescription"
                            value={passDescription}
                            onChange={(e) => setPassDescription(e.target.value)}
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="패스 설명 입력"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="issuingBody" className="block text-sm font-medium text-gray-700">
                          발급 기관
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="issuingBody"
                            value={issuingBody}
                            onChange={(e) => setIssuingBody(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            placeholder="발급 기관 입력"
                            required
                          />
                        </div>
                      </div>

                      {/* Authorized Locations */}
                      <div>
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-700">
                            승인된 위치
                          </label>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={addAuthorizedLocation}
                            className="px-3 py-1 text-sm text-blue-800 hover:bg-blue-50 rounded-md transition-colors duration-200"
                          >
                            위치 추가
                          </motion.button>
                        </div>
                        <div className="mt-2 space-y-3">
                          {authorizedLocations.map((location, index) => (
                            <div key={location.id} className="border border-gray-200 rounded-md p-3">
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="위치 이름"
                                  value={location.name}
                                  onChange={(e) => updateAuthorizedLocation(index, 'name', e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm"
                                />
                                <input
                                  type="text"
                                  placeholder="주소"
                                  value={location.address}
                                  onChange={(e) => updateAuthorizedLocation(index, 'address', e.target.value)}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm"
                                />
                              </div>
                              <div className="mt-2 flex justify-between items-center">
                                <select
                                  value={location.accessType}
                                  onChange={(e) => updateAuthorizedLocation(index, 'accessType', e.target.value)}
                                  className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm"
                                >
                                  <option value="entry">출입</option>
                                  <option value="payment">결제</option>
                                  <option value="both">출입+결제</option>
                                </select>
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => removeAuthorizedLocation(index)}
                                  className="px-2 py-1 text-sm text-red-800 hover:bg-red-50 rounded-md transition-colors duration-200"
                                >
                                  삭제
                                </motion.button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          유효 기간
                        </label>
                        <div className="mt-1 grid grid-cols-2 gap-4">
                          <input
                            type="date"
                            value={validityStart}
                            onChange={(e) => setValidityStart(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            required
                          />
                          <input
                            type="date"
                            value={validityEnd}
                            onChange={(e) => setValidityEnd(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="transferable"
                            checked={isTransferable}
                            onChange={(e) => setIsTransferable(e.target.checked)}
                            className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                          />
                          <label htmlFor="transferable" className="ml-2 block text-sm text-gray-700">
                            양도 가능
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="tradable"
                            checked={isTradable}
                            onChange={(e) => setIsTradable(e.target.checked)}
                            className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
                          />
                          <label htmlFor="tradable" className="ml-2 block text-sm text-gray-700">
                            거래 가능
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-md shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-all duration-200"
                        >
                          패스 생성
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Existing Passes List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900">기존 패스 유형</h2>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="패스 검색..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {existingPasses.map((pass) => (
                      <div key={pass.id} className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium text-gray-900">{pass.name}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                pass.passType === 'employee_badge' ? 'bg-blue-100 text-blue-800' :
                                pass.passType === 'student_id' ? 'bg-green-100 text-green-800' :
                                pass.passType === 'event_ticket' ? 'bg-purple-100 text-purple-800' :
                                pass.passType === 'retail_access' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {pass.passType === 'employee_badge' ? '직원 출입증' :
                                 pass.passType === 'student_id' ? '학생증' :
                                 pass.passType === 'event_ticket' ? '이벤트 티켓' :
                                 pass.passType === 'retail_access' ? '매장 출입' : '사용자 정의'}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{pass.description}</p>
                            <p className="mt-2 text-sm text-gray-500">
                              <span className="font-medium">발급 기관:</span> {pass.issuingBody}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">승인된 위치:</span> {pass.authorizedLocations.map(loc => loc.name).join(', ')}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">유효 기간:</span> {pass.validityPeriod.start} ~ {pass.validityPeriod.end}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              <span className="font-medium">특징:</span> 
                              {pass.transferable ? ' 양도 가능' : ''}
                              {pass.tradable ? ' 거래 가능' : ''}
                            </p>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                              <span>생성일: {pass.createdAt}</span>
                              <span>발급: {pass.totalIssued}</span>
                              <span>활성: {pass.activeCount}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePassDetail(pass.id)}
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-md shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-all duration-200"
                            >
                              상세 관리
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

          {/* Pass Detail Tab */}
          {activeTab === 'pass-detail' && selectedPassId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {(() => {
                const selectedPass = existingPasses.find(p => p.id === selectedPassId);
                const passHoldersForPass = passHolders.filter(h => h.passId === selectedPassId);
                const passTransactionsForPass = passTransactions.filter(tx => tx.passId === selectedPassId);
                
                return selectedPass ? (
                  <div className="space-y-6">
                    {/* Header with Back Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveTab('pass-management')}
                          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-all duration-200"
                        >
                          ← 뒤로가기
                        </motion.button>
                        <h1 className="text-2xl font-bold text-gray-900">{selectedPass.name} 상세 관리</h1>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          selectedPass.passType === 'employee_badge' ? 'bg-blue-100 text-blue-800' :
                          selectedPass.passType === 'student_id' ? 'bg-green-100 text-green-800' :
                          selectedPass.passType === 'event_ticket' ? 'bg-purple-100 text-purple-800' :
                          selectedPass.passType === 'retail_access' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedPass.passType === 'employee_badge' ? '직원 출입증' :
                           selectedPass.passType === 'student_id' ? '학생증' :
                           selectedPass.passType === 'event_ticket' ? '이벤트 티켓' :
                           selectedPass.passType === 'retail_access' ? '매장 출입' : '사용자 정의'}
                        </span>
                      </div>
                    </div>

                    {/* Pass Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500">총 발급</h3>
                        <p className="text-3xl font-bold text-blue-800">{selectedPass.totalIssued}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500">활성 사용자</h3>
                        <p className="text-3xl font-bold text-green-800">{passHoldersForPass.filter(h => h.status === 'active').length}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500">총 트랜잭션</h3>
                        <p className="text-3xl font-bold text-purple-800">{passTransactionsForPass.length}</p>
                      </div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-medium text-gray-500">승인된 위치</h3>
                        <p className="text-3xl font-bold text-orange-800">{selectedPass.authorizedLocations.length}</p>
                      </div>
                    </div>

                    {/* Pass Holders */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">패스 보유자 목록</h2>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">사용자</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지갑 주소</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">발급일</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">마지막 사용</th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {passHoldersForPass.map((holder) => {
                              const holderTx = passTransactionsForPass.find(tx => tx.to === holder.mobileId || tx.from === holder.mobileId);
                              return (
                                <tr key={holder.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{holder.userName}</div>
                                    <div className="text-sm text-gray-500">{holder.email}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                      {holderTx?.to || '0x' + holder.mobileId.slice(-8)}...
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                      holder.status === 'active' ? 'bg-green-100 text-green-800' :
                                      holder.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
                                      holder.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {holder.status === 'active' ? '활성' :
                                       holder.status === 'expired' ? '만료' :
                                       holder.status === 'pending' ? '대기' : '취소'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holder.issuedAt}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holder.lastUsed}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                      <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="text-blue-800 hover:text-blue-900"
                                      >
                                        수정
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handlePassStatus(holder.id, 'revoked')}
                                        className="text-red-800 hover:text-red-900"
                                      >
                                        취소
                                      </motion.button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Authorized Locations */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">승인된 위치</h2>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {selectedPass.authorizedLocations.map((location) => (
                            <div key={location.id} className="border border-gray-200 rounded-lg p-4">
                              <h3 className="font-medium text-gray-900">{location.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">{location.address}</p>
                              <div className="mt-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  location.accessType === 'entry' ? 'bg-blue-100 text-blue-800' :
                                  location.accessType === 'payment' ? 'bg-green-100 text-green-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {location.accessType === 'entry' ? '출입' :
                                   location.accessType === 'payment' ? '결제' : '출입+결제'}
                                </span>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-gray-500">장치:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {location.deviceIds.map(deviceId => (
                                    <span key={deviceId} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded font-mono">
                                      {deviceId}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-semibold text-gray-900">트랜잭션 히스토리</h2>
                          <input
                            type="text"
                            placeholder="TX Hash 또는 주소 검색..."
                            value={txSearchQuery}
                            onChange={(e) => setTxSearchQuery(e.target.value)}
                            className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TX Hash</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">블록</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">타입</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {passTransactionsForPass
                              .filter(tx => !txSearchQuery || 
                                tx.txHash.toLowerCase().includes(txSearchQuery.toLowerCase()) ||
                                tx.from.toLowerCase().includes(txSearchQuery.toLowerCase()) ||
                                tx.to.toLowerCase().includes(txSearchQuery.toLowerCase())
                              )
                              .sort((a, b) => b.blockNumber - a.blockNumber)
                              .map((tx) => (
                              <tr key={tx.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="font-mono text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                                    {tx.txHash.slice(0, 10)}...{tx.txHash.slice(-8)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  #{tx.blockNumber.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {tx.timestamp}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    tx.type === 'mint' ? 'bg-green-100 text-green-800' :
                                    tx.type === 'transfer' ? 'bg-blue-100 text-blue-800' :
                                    tx.type === 'revoke' ? 'bg-red-100 text-red-800' :
                                    tx.type === 'update' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-purple-100 text-purple-800'
                                  }`}>
                                    {tx.type === 'mint' ? '발급' :
                                     tx.type === 'transfer' ? '양도' :
                                     tx.type === 'revoke' ? '취소' :
                                     tx.type === 'update' ? '업데이트' : '접근'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                    {tx.from === '0x0000000000000000000000000000000000000000' ? 'System' : 
                                     `${tx.from.slice(0, 6)}...${tx.from.slice(-4)}`}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                    {tx.to === '0x0000000000000000000000000000000000000000' ? 'System' : 
                                     `${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div>
                                    <div>{tx.gasUsed.toLocaleString()}</div>
                                    <div className="text-xs text-gray-400">{tx.gasPrice} Gwei</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    tx.status === 'success' ? 'bg-green-100 text-green-800' :
                                    tx.status === 'failed' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {tx.status === 'success' ? '성공' :
                                     tx.status === 'failed' ? '실패' : '대기중'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 