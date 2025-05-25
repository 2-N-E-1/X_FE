'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const DIDManagementSystem = () => {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* 네비게이션 바 */}
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
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {['회사소개', '서비스 소개', '인재채용', '사회적 환경', '사업제휴'].map((item, index) => (
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

      {/* Add padding to account for fixed navigation */}
      <div className="pt-20">
        {/* 메인 배너 섹션 */}
        <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
                넥스키
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl">
                넥스키는 2022년 설립된 블록체인 기반 신원증명 서비스로, 
                국내 최고의 보안 기술과 검증된 시스템을 바탕으로 
                안전하고 신뢰할 수 있는 디지털 신원증명 서비스를 제공합니다.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <Link 
                  href="/details" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  자세히 보기 →
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="w-full max-w-md">
                <div className="relative">
                  <motion.svg 
                    viewBox="0 0 200 200" 
                    className="w-full"
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    <path d="M100,20 A80,80 0 0,1 180,100" stroke="white" strokeWidth="4" fill="none" />
                    <circle cx="180" cy="100" r="5" fill="white" />
                    <text x="180" cy="90" fill="white" fontSize="10">가족정보</text>
                    
                    <path d="M100,20 A80,80 0 0,0 20,100" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
                    <circle cx="20" cy="100" r="5" fill="white" />
                    <text x="5" y="90" fill="white" fontSize="10">신용정보</text>
                    
                    <path d="M100,180 A80,80 0 0,0 20,100" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
                    
                    <path d="M100,180 A80,80 0 0,1 180,100" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
                    <circle cx="100" cy="180" r="5" fill="white" />
                    <text x="90" y="200" fill="white" fontSize="10">자산정보</text>
                    
                    <path d="M100,20 L100,180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                    <path d="M20,100 L180,100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                    
                    <rect x="80" y="80" width="40" height="100" fill="orange" opacity="0.7" />
                    <rect x="60" y="100" width="20" height="80" fill="gray" opacity="0.5" />
                    <rect x="40" y="120" width="20" height="60" fill="gray" opacity="0.5" />
                    <rect x="120" y="90" width="20" height="90" fill="gray" opacity="0.5" />
                    <rect x="140" y="110" width="20" height="70" fill="gray" opacity="0.5" />
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full ${index === 1 ? 'bg-white' : 'bg-white opacity-50'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* 두 번째 섹션: 투자 정보 및 정도 경영 */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
            {/* 투자 정보 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 text-white p-10"
            >
              <h2 className="text-2xl font-bold mb-6">투자 정보</h2>
              <p className="text-gray-300 mb-8">
                넥스키는 2022년 설립된 블록체인 기반 신원증명 서비스로, 
                국내 최고의 보안 기술과 검증된 시스템을 바탕으로 
                안전하고 신뢰할 수 있는 디지털 신원증명 서비스를 제공합니다.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: '재무정보', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { title: '경영정보', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  { title: '공시정보', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                  { title: 'IR Book', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bg-white bg-opacity-10 p-4 rounded-lg text-center hover:bg-opacity-20 transition-all duration-200"
                    >
                      <div className="flex justify-center mb-2">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* 정도 경영 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-100 p-10 flex items-center"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">정도 경영</h2>
                <p className="text-gray-700 mb-4">
                  넥스키는 투명한 경영을 추구합니다.
                  모든 이해관계자를 존중하며 정직과 신뢰를 바탕으로 합니다.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="mt-4 bg-white p-4 rounded-lg inline-block shadow-lg"
                >
                  <h3 className="text-xl font-bold text-blue-800">원칙이 존중되는 정도경영</h3>
                  <p className="text-gray-700 mt-2">正道經營</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 세 번째 섹션: 비즈니스 및 서비스 */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">비즈니스 & 서비스</h2>
            <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
              넥스키는 국내 최대 신원정보 데이터베이스, 축적된 노하우, 우수한 전문인력 그리고 높은 시장인지도를 
              바탕으로 개인신원증명 및 기업신원증명 서비스를 제공하고 있습니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="비즈니스 이미지" className="w-full h-56 object-cover" />
              </div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="서비스 이미지" className="w-full h-56 object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* 네 번째 섹션: 채용 정보 */}
        <div className="bg-blue-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xl text-center mb-8">
              넥스키는 열정과 도전정신을 갖춘 인재들과의 소중한 인연을 기다립니다.
            </p>
            <div className="flex justify-center">
              <Link href="/recruitment" className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                채용정보
              </Link>
            </div>
          </div>
        </div>

        {/* 다섯 번째 섹션: 주요 서비스 */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-blue-900 text-white p-8 flex flex-col justify-center items-center mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">주요서비스</h3>
                <p className="text-center">바로가기</p>
              </div>
              <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <Link href="/did-cb" className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition">
                  <div className="flex justify-center mb-2">
                    <svg className="w-10 h-10 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 text-center">DID CB</span>
                </Link>
                <Link href="/did-keeper" className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition">
                  <div className="flex justify-center mb-2">
                    <svg className="w-10 h-10 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 text-center">DID 지키미</span>
                </Link>
                <Link href="/did-id" className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition">
                  <div className="flex justify-center mb-2">
                    <svg className="w-10 h-10 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 text-center">DID 아이디</span>
                </Link>
                <Link href="/corporate-credit" className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition">
                  <div className="flex justify-center mb-2">
                    <svg className="w-10 h-10 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 text-center">기업신용평가</span>
                </Link>
                <Link href="/did-bizline" className="flex flex-col items-center p-4 hover:bg-gray-100 rounded-lg transition">
                  <div className="flex justify-center mb-2">
                    <svg className="w-10 h-10 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-700 text-center">DID BizLINE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <footer className="bg-gray-800 text-white py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm text-gray-400 mb-4 flex flex-wrap gap-4"
            >
              {['개인정보처리방침', '이용약관', '보안정책', '이메일무단수집거부', '윤리경영', '제보센터'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </motion.div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-gray-400">서울특별시 영등포구 여의도동 123-45 | 대표전화: 02-1234-5678</p>
                <p className="text-sm text-gray-400">대표: 홍길동 | 사업자등록번호: 123-45-67890 | 개인정보보호 책임자: 김철수 기술이사</p>
                <p className="text-sm text-gray-400">Copyright © 2025 by 넥스키 All Rights Reserved.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-4 md:mt-0 flex items-center"
              >
                <span className="text-sm text-gray-400 mr-4">고객지원센터</span>
                <div className="text-xl font-bold">DID</div>
              </motion.div>
            </div>
          </div>
      </footer>
      </div>
    </div>
  );
};

export default DIDManagementSystem;