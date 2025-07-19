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

interface ContactConfirmationEmailProps {
  name: string;
  projectType: string;
  budget: string;
  timeline: string;
}

export const ContactConfirmationEmail = ({
  name,
  projectType,
  budget,
  timeline,
}: ContactConfirmationEmailProps) => {
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

  return (
    <Html>
      <Head />
      <Preview>Thank you for your message, {name}! I&apos;ll get back to you soon.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Your Message!</Heading>
          
          <Text style={text}>
            Hi {name},
          </Text>
          
          <Text style={text}>
            Thank you for reaching out! I&apos;ve received your message and I&apos;m excited to learn more about your project.
          </Text>

          <Section style={projectDetails}>
            <Heading style={h2}>Project Summary</Heading>
            <Text style={detailText}>
              <strong>Project Type:</strong> {getProjectTypeLabel(projectType)}
            </Text>
            <Text style={detailText}>
              <strong>Budget Range:</strong> {getBudgetLabel(budget)}
            </Text>
            <Text style={detailText}>
              <strong>Timeline:</strong> {getTimelineLabel(timeline)}
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={text}>
            I&apos;ll review your project details and get back to you within <strong>24 hours</strong> with:
          </Text>

          <Section style={list}>
            <Text style={listItem}>• Initial thoughts and questions about your project</Text>
            <Text style={listItem}>• A preliminary timeline and approach</Text>
            <Text style={listItem}>• Next steps for moving forward</Text>
          </Section>

          <Text style={text}>
            In the meantime, feel free to check out some of my recent work on my{' '}
            <a href="https://github.com/AdrianRusan" style={link}>GitHub</a> or{' '}
            <a href="https://adrian-rusan.com" style={link}>portfolio</a>.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Best regards,<br />
            <strong>Adrian Rusan</strong><br />
            Full-Stack Developer<br />
            <a href="mailto:rusan.adrian.ionut@gmail.com" style={link}>
              rusan.adrian.ionut@gmail.com
            </a>
          </Text>
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

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 40px',
};

const detailText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
  padding: '0 40px',
};

const projectDetails = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '20px 40px',
  padding: '20px',
};

const list = {
  margin: '16px 0',
  padding: '0 40px',
};

const listItem = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '8px 0',
};

const link = {
  color: '#8B5CF6',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '32px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
};

export default ContactConfirmationEmail; 