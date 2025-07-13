import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface StatusNotificationEmailProps {
  service: string;
  status: 'operational' | 'degraded' | 'down';
  previousStatus?: 'operational' | 'degraded' | 'down' | undefined;
  timestamp: Date;
  error?: string | undefined;
  responseTime?: number | undefined;
  affectedServices?: string[] | undefined;
}

export const StatusNotificationEmail = ({
  service,
  status,
  previousStatus,
  timestamp,
  error,
  responseTime,
  affectedServices,
}: StatusNotificationEmailProps) => {
  // Status configuration
  const statusConfig = {
    operational: {
      label: 'Operational',
      color: '#10B981',
      bgColor: '#D1FAE5',
      emoji: '✅',
    },
    degraded: {
      label: 'Degraded Performance',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      emoji: '⚠️',
    },
    down: {
      label: 'Service Down',
      color: '#EF4444',
      bgColor: '#FEE2E2',
      emoji: '🔴',
    },
  };

  const currentConfig = statusConfig[status];
  const isRecovery = previousStatus && (previousStatus === 'down' || previousStatus === 'degraded') && status === 'operational';
  const isIncident = status === 'down' || status === 'degraded';

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getSubjectLine = () => {
    if (isRecovery) {
      return `${statusConfig[previousStatus!].emoji} ${service} Service Restored`;
    }
    return `${currentConfig.emoji} ${service} Status Update: ${currentConfig.label}`;
  };

  return (
    <Html>
      <Head />
      <Preview>{getSubjectLine()}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Text style={headerText}>Adrian Rusan Portfolio</Text>
                <Text style={headerSubtext}>Service Status Notification</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>
              {currentConfig.emoji} Service Status Update
            </Heading>
            
            <Text style={paragraph}>
              {isRecovery 
                ? `Good news! The ${service} service has been restored and is now operational.`
                : `This is an automated notification about a status change for the ${service} service.`
              }
            </Text>

            {/* Status Card */}
            <Section style={{...statusCard, backgroundColor: currentConfig.bgColor, borderColor: currentConfig.color}}>
              <Heading style={h2}>Service Status Change</Heading>
              
              <Row style={statusDetail}>
                <Column style={statusIcon}>{currentConfig.emoji}</Column>
                <Column>
                  <Text style={statusLabel}>Service</Text>
                  <Text style={statusValue}>{service}</Text>
                </Column>
              </Row>
              
              <Row style={statusDetail}>
                <Column style={statusIcon}>📊</Column>
                <Column>
                  <Text style={statusLabel}>Current Status</Text>
                  <Text style={{...statusValue, color: currentConfig.color}}>
                    {currentConfig.label}
                  </Text>
                </Column>
              </Row>
              
              {previousStatus && (
                <Row style={statusDetail}>
                  <Column style={statusIcon}>🔄</Column>
                  <Column>
                    <Text style={statusLabel}>Previous Status</Text>
                    <Text style={statusValue}>
                      {statusConfig[previousStatus].label}
                    </Text>
                  </Column>
                </Row>
              )}
              
              <Row style={statusDetail}>
                <Column style={statusIcon}>🕐</Column>
                <Column>
                  <Text style={statusLabel}>Detected At</Text>
                  <Text style={statusValue}>{formatDate(timestamp)}</Text>
                </Column>
              </Row>
              
              {responseTime && (
                <Row style={statusDetail}>
                  <Column style={statusIcon}>⚡</Column>
                  <Column>
                    <Text style={statusLabel}>Response Time</Text>
                    <Text style={statusValue}>{responseTime}ms</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Error Details */}
            {error && (
              <Section style={errorSection}>
                <Heading style={h3}>Error Details</Heading>
                <Text style={errorText}>{error}</Text>
              </Section>
            )}

            {/* Affected Services */}
            {affectedServices && affectedServices.length > 0 && (
              <Section style={affectedSection}>
                <Heading style={h3}>Potentially Affected Services</Heading>
                <Text style={paragraph}>
                  The following services may be impacted by this status change:
                </Text>
                <ul style={list}>
                  {affectedServices.map((affectedService, index) => (
                    <li key={index} style={listItem}>{affectedService}</li>
                  ))}
                </ul>
              </Section>
            )}

            <Hr style={hr} />

            {/* Action Items */}
            <Section style={actionSection}>
              <Heading style={h3}>
                {isIncident ? '🔧 What We\'re Doing' : '✅ Resolution'}
              </Heading>
              <Text style={paragraph}>
                {isRecovery 
                  ? 'The service has been restored and is functioning normally. We will continue monitoring to ensure stability.'
                  : isIncident
                  ? 'Our team has been automatically notified and is investigating the issue. We will provide updates as more information becomes available.'
                  : 'This is a routine status update. No action is required.'
                }
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Footer */}
            <Section style={footerSection}>
              <Text style={footerText}>
                You can view the current status of all services at:{' '}
                <a href="https://www.adrian-rusan.com/status" style={link}>
                  https://www.adrian-rusan.com/status
                </a>
              </Text>
              <Text style={footerText}>
                If you have any questions or concerns, please contact me directly at{' '}
                <a href="mailto:rusan.adrian.ionut@gmail.com" style={link}>
                  rusan.adrian.ionut@gmail.com
                </a>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 24px',
  backgroundColor: '#000319',
  borderRadius: '8px 8px 0 0',
};

const headerText = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0',
  padding: '0',
};

const headerSubtext = {
  color: '#CBACF9',
  fontSize: '14px',
  margin: '4px 0 0 0',
  padding: '0',
};

const content = {
  padding: '24px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 20px',
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 16px',
};

const h3 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '24px 0 12px',
};

const paragraph = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const statusCard = {
  border: '2px solid',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const statusDetail = {
  marginBottom: '12px',
};

const statusIcon = {
  width: '24px',
  fontSize: '16px',
  paddingRight: '12px',
};

const statusLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const statusValue = {
  color: '#333',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const errorSection = {
  backgroundColor: '#FEE2E2',
  border: '1px solid #EF4444',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const errorText = {
  color: '#DC2626',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
  fontFamily: 'monospace',
};

const affectedSection = {
  backgroundColor: '#FEF3C7',
  border: '1px solid #F59E0B',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const actionSection = {
  backgroundColor: '#F0F9FF',
  border: '1px solid #0EA5E9',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const footerSection = {
  backgroundColor: '#F8F9FA',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const footerText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 8px',
};

const list = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
  paddingLeft: '20px',
};

const listItem = {
  margin: '4px 0',
};

const link = {
  color: '#8B5CF6',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

export default StatusNotificationEmail; 