'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, Clock, Globe, Mail, Github, Zap, LucideIcon } from 'lucide-react';

// Health check result interface (matching the API)
interface HealthCheckResult {
  status: 'operational' | 'degraded' | 'down';
  responseTime?: number;
  error?: string;
  lastChecked: string;
}

// Combined health status interface (matching the API)
interface HealthStatus {
  portfolio: HealthCheckResult;
  github: HealthCheckResult;
  email: HealthCheckResult;
  analytics: HealthCheckResult;
  overall: 'operational' | 'degraded' | 'down';
  timestamp: string;
}

// Service status types
type ServiceStatus = 'operational' | 'degraded' | 'down' | 'maintenance';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  icon: LucideIcon;
  lastChecked?: Date | undefined;
  uptime?: string | undefined;
  responseTime?: number | undefined;
  error?: string | undefined;
}

// Status configuration
const statusConfig: Record<ServiceStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}> = {
  operational: {
    label: 'Operational',
    color: 'text-green-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    icon: CheckCircle,
  },
  degraded: {
    label: 'Degraded Performance',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    icon: AlertCircle,
  },
  down: {
    label: 'Service Down',
    color: 'text-red-500',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    icon: XCircle,
  },
  maintenance: {
    label: 'Under Maintenance',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    icon: Clock,
  },
};

// Service configuration
const serviceConfig: Record<string, { name: string; description: string; icon: LucideIcon; uptime: string }> = {
  portfolio: {
    name: 'Portfolio Website',
    description: 'Main portfolio website and all pages',
    icon: Globe,
    uptime: '99.9%',
  },
  github: {
    name: 'GitHub Integration',
    description: 'Repository data and contribution statistics',
    icon: Github,
    uptime: '99.5%',
  },
  email: {
    name: 'Email Delivery',
    description: 'Contact form and notification emails via Resend',
    icon: Mail,
    uptime: '99.8%',
  },
  analytics: {
    name: 'Analytics & Monitoring',
    description: 'Vercel Analytics and Speed Insights',
    icon: Zap,
    uptime: '99.7%',
  },
};

// Calculate overall system status
function getOverallStatus(services: ServiceItem[]): ServiceStatus {
  const statuses = services.map(service => service.status);
  
  if (statuses.includes('down')) return 'down';
  if (statuses.includes('degraded')) return 'degraded';
  if (statuses.includes('maintenance')) return 'maintenance';
  
  return 'operational';
}

// Loading skeleton component
function StatusSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-white/[0.2] bg-white/[0.05] p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-white/[0.2] rounded"></div>
            <div>
              <div className="w-32 h-4 bg-white/[0.2] rounded mb-2"></div>
              <div className="w-48 h-3 bg-white/[0.2] rounded"></div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-12 h-4 bg-white/[0.2] rounded"></div>
            <div className="w-20 h-6 bg-white/[0.2] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StatusDisplay() {
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchHealthData = async () => {
    try {
      setError(null);
      const response = await fetch('/api/health', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      setHealthData(data);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Failed to fetch health data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch health data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    
    // Set up periodic refresh every 30 seconds
    const interval = setInterval(fetchHealthData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Convert health data to service items
  const services: ServiceItem[] = healthData ? Object.entries(serviceConfig).map(([key, config]) => {
    const healthResult = healthData[key as keyof HealthStatus] as HealthCheckResult;
    return {
      id: key,
      name: config.name,
      description: config.description,
      status: healthResult.status,
      icon: config.icon,
      lastChecked: new Date(healthResult.lastChecked),
      uptime: config.uptime,
      responseTime: healthResult.responseTime ?? undefined,
      error: healthResult.error ?? undefined,
    };
  }) : [];

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Overall Status Skeleton */}
        <div className="rounded-lg border border-white/[0.2] bg-white/[0.05] p-6 animate-pulse">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-white/[0.2] rounded"></div>
            <div>
              <div className="w-48 h-6 bg-white/[0.2] rounded mb-2"></div>
              <div className="w-64 h-4 bg-white/[0.2] rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Services Skeleton */}
        <div className="space-y-4">
          <div className="w-32 h-5 bg-white/[0.2] rounded animate-pulse"></div>
          <StatusSkeleton />
          <StatusSkeleton />
          <StatusSkeleton />
          <StatusSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        {/* Error State */}
        <div className="rounded-lg border border-red-500/30 bg-red-500/20 p-6">
          <div className="flex items-center justify-center space-x-3">
            <XCircle className="h-8 w-8 text-red-500" />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">
                Health Check Failed
              </h2>
              <p className="text-white-100 mt-1">
                Unable to fetch service status: {error}
              </p>
              <button
                onClick={fetchHealthData}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const overallStatus = healthData ? healthData.overall : 'down';
  const overallConfig = statusConfig[overallStatus];
  const OverallIcon = overallConfig.icon;

  return (
    <div className="space-y-8">
      {/* Overall Status Banner */}
      <div className={`rounded-lg border ${overallConfig.borderColor} ${overallConfig.bgColor} p-6`}>
        <div className="flex items-center justify-center space-x-3">
          <OverallIcon className={`h-8 w-8 ${overallConfig.color}`} />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              All Systems {overallConfig.label}
            </h2>
            <p className="text-white-100 mt-1">
              {overallStatus === 'operational' 
                ? 'All services are running normally'
                : 'Some services may be experiencing issues'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Last Update Info */}
      <div className="text-center">
        <p className="text-white-100 text-sm">
          Last updated: {lastUpdate.toLocaleString()}
          {healthData && (
            <span className="ml-2 text-white-200">
              • Health check: {new Date(healthData.timestamp).toLocaleString()}
            </span>
          )}
        </p>
      </div>

      {/* Service Status Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          Individual Services
        </h3>
        
        {services.map((service) => {
          const config = statusConfig[service.status];
          const ServiceIcon = service.icon;
          const StatusIcon = config.icon;
          
          return (
            <div
              key={service.id}
              className="rounded-lg border border-white/[0.2] bg-white/[0.05] p-6 hover:bg-white/[0.1] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <ServiceIcon className="h-6 w-6 text-purple" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {service.name}
                      </h4>
                      <p className="text-white-100 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  {/* Response Time */}
                  {service.responseTime && (
                    <div className="text-right">
                      <p className="text-white text-sm font-medium">
                        {service.responseTime}ms
                      </p>
                      <p className="text-white-100 text-xs">
                        response time
                      </p>
                    </div>
                  )}
                  
                  {/* Uptime */}
                  <div className="text-right">
                    <p className="text-white text-sm font-medium">
                      {service.uptime}
                    </p>
                    <p className="text-white-100 text-xs">
                      30-day uptime
                    </p>
                  </div>
                  
                  {/* Status */}
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border`}>
                    <StatusIcon className={`h-4 w-4 ${config.color}`} />
                    <span className={`text-sm font-medium ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Last Checked and Error */}
              <div className="mt-4 pt-4 border-t border-white/[0.1]">
                <div className="flex items-center justify-between">
                  <p className="text-white-100 text-xs">
                    Last checked: {service.lastChecked?.toLocaleString() || 'Never'}
                  </p>
                  {service.error && (
                    <p className="text-red-400 text-xs">
                      Error: {service.error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 