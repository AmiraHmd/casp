'use client'

import React from 'react'
import AdminCard from './AdminCard'
import { Icon } from '@iconify/react'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

const colorMap = {
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    iconBg: 'bg-blue-500',
  },
  green: {
    bg: 'bg-green-500/10',
    text: 'text-green-500',
    iconBg: 'bg-green-500',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
    iconBg: 'bg-purple-500',
  },
  orange: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    iconBg: 'bg-orange-500',
  },
}

export default function StatCard({ title, value, icon, trend, color = 'blue' }: StatCardProps) {
  const colors = colorMap[color]

  return (
    <AdminCard className="p-6 hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-brand-navy/60 dark:text-white/60 mb-1">{title}</p>
          <h3 className="text-3xl font-bold font-display text-brand-navy dark:text-white tracking-tight">{value}</h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              <span className={`flex items-center ${trend.isPositive ? 'bg-green-500/10' : 'bg-red-500/10'} px-2 py-1 rounded-lg`}>
                <Icon icon={trend.isPositive ? 'solar:graph-up-broken' : 'solar:graph-down-broken'} className="me-1" />
                {trend.value}%
              </span>
              <span className="text-brand-navy/40 dark:text-white/40 font-medium ms-1">{trend.label}</span>
            </div>
          )}
        </div>
        
        <div className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.text} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner`}>
            <Icon icon={icon} width={24} />
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className={`absolute -bottom-4 -inline-end-4 w-24 h-24 ${colors.bg} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
    </AdminCard>
  )
}
