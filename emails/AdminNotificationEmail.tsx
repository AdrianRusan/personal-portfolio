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
} from '@react-email/components';
import * as React from 'react';
import { ContactFormData } from '@/lib/schemas/contactForm';

interface AdminNotificationEmailProps {
  formData: ContactFormData;
  submittedAt: Date;
}

export const AdminNotificationEmail = ({
  formData,
  submittedAt,
}: AdminNotificationEmailProps) => {
  // Convert enum values to readable labels
  const getProjectTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'web-development': 'Web Development',
      'consultation': 'Consultation',
      'maintenance': 'Website Maintenance',
      'e-commerce': 'E-commerce Solution',
      'mobile-app': 'Mobile App Development',
      'other': 'Other'
    };
    return labels[type] || type;
  };

  const getBudgetLabel = (budget: string) => {
    const labels: Record<string, string> = {
      'under-5k': 'Under $5,000',
      '5k-15k': '$5,000 - $15,000',
      '15k-30k': '$15,000 - $30,000',
      '30k-50k': '$30,000 - $50,000',
      '50k+': '$50,000+',
      'discuss': 'Let&apos;s Discuss'
    };
    return labels[budget] || budget;
  };

  const getTimelineLabel = (timeline: string) => {
    const labels: Record<string, string> = {
      'asap': 'ASAP',
      '1-month': 'Within 1 Month',
      '2-3-months': '2-3 Months',
      '3-6-months': '3-6 Months',
      'flexible': 'Flexible'
    };
    return labels[timeline] || timeline;
  };

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      'google': 'Google Search',
      'linkedin': 'LinkedIn',
      'github': 'GitHub',
      'referral': 'Referral',
      'direct': 'Direct Visit',
      'other': 'Other'
    };
    return labels[source] || source;
  };

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

  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {formData.name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Contact Form Submission</Heading>
          
          <Section style={urgentInfo}>
            <Text style={urgentText}>
              <strong>Submitted:</strong> {formatDate(submittedAt)}
            </Text>
            <Text style={urgentText}>
              <strong>Reply within 24 hours!</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={contactInfo}>
            <Heading style={h2}>Contact Information</Heading>
            <Text style={detailText}>
              <strong>Name:</strong> {formData.name}
            </Text>
            <Text style={detailText}>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${formData.email}`} style={link}>
                {formData.email}
              </a>
            </Text>
            {formData.company && (
              <Text style={detailText}>
                <strong>Company:</strong> {formData.company}
              </Text>
            )}
            {formData.phone && (
              <Text style={detailText}>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${formData.phone}`} style={link}>
                  {formData.phone}
                </a>
              </Text>
            )}
          </Section>

          <Hr style={hr} />

          <Section style={projectInfo}>
            <Heading style={h2}>Project Details</Heading>
            <Text style={detailText}>
              <strong>Project Type:</strong> {getProjectTypeLabel(formData.projectType)}
            </Text>
            <Text style={detailText}>
              <strong>Budget Range:</strong> {getBudgetLabel(formData.budget)}
            </Text>
            <Text style={detailText}>
              <strong>Timeline:</strong> {getTimelineLabel(formData.timeline)}
            </Text>
            <Text style={detailText}>
              <strong>Source:</strong> {getSourceLabel(formData.source)}
              {formData.sourceDetails && ` - ${formData.sourceDetails}`}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={messageSection}>
            <Heading style={h2}>Project Description</Heading>
            <Text style={messageText}>{formData.description}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={actionSection}>
            <Heading style={h2}>Next Steps</Heading>
            <Text style={actionText}>
              1. Reply to this email within 24 hours<br />
              2. Review the project requirements carefully<br />
              3. Prepare initial questions and timeline<br />
              4. Send personalized response to{' '}
              <a href={`mailto:${formData.email}`} style={link}>
                {formData.email}
              </a>
            </Text>
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

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
  padding: '0',
};

const urgentInfo = {
  backgroundColor: '#fff3cd',
  borderLeft: '4px solid #ffc107',
  margin: '20px 40px',
  padding: '15px 20px',
};

const urgentText = {
  color: '#856404',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '5px 0',
};

const contactInfo = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '20px',
};

const projectInfo = {
  backgroundColor: '#e3f2fd',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '20px',
};

const messageSection = {
  backgroundColor: '#f1f8e9',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '20px',
};

const actionSection = {
  backgroundColor: '#fce4ec',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '20px',
};

const detailText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const messageText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '10px 0',
  whiteSpace: 'pre-wrap' as const,
};

const actionText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '10px 0',
};

const link = {
  color: '#8B5CF6',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

export default AdminNotificationEmail; 