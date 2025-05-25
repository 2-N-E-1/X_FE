'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Organization } from '@/types/admin';

interface NavigationProps {
  organization: Organization;
}

export default function Navigation({ organization }: NavigationProps) {
  return (
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
  );
} 