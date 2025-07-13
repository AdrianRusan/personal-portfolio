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
  Link,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface FollowUpEmailProps {
  name: string;
  email: string;
  projectType: string;
  submittedDaysAgo: number;
}

export const FollowUpEmail = ({ 
  name, 
  email, 
  projectType, 
  submittedDaysAgo 
}: FollowUpEmailProps) => {
  const getProjectTypeLabel = (type: string) => {
    const labels = {
      'web-development': 'Web Development',
      'consultation': 'Consultation',
      'maintenance': 'Website Maintenance',
      'e-commerce': 'E-commerce Development',
      'mobile-app': 'Mobile App Development',
      'other': 'Custom Project'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Html>
      <Head />
      <Preview>Following up on your {getProjectTypeLabel(projectType)} inquiry</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thanks for your interest, {name}!</Heading>
          
          <Section style={messageSection}>
            <Text style={text}>
              I hope this email finds you well. I wanted to follow up on your {getProjectTypeLabel(projectType)} inquiry from {submittedDaysAgo} {submittedDaysAgo === 1 ? 'day' : 'days'} ago.
            </Text>
            
            <Text style={text}>
              I&apos;ve been reviewing your project requirements and I&apos;m excited about the possibility of working together. Here&apos;s what I&apos;d like to discuss with you:
            </Text>
            
            <Section style={bulletSection}>
              <Text style={bulletText}>• Your specific project goals and vision</Text>
              <Text style={bulletText}>• Technical requirements and preferred technologies</Text>
              <Text style={bulletText}>• Timeline and project milestones</Text>
              <Text style={bulletText}>• Budget considerations and project scope</Text>
            </Section>
            
            <Text style={text}>
              I believe I can help you achieve your goals with a modern, performant solution that meets your needs and exceeds your expectations.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={ctaSection}>
            <Heading style={h2}>Ready to move forward?</Heading>
            <Text style={text}>
              I&apos;d love to schedule a brief consultation call to discuss your project in more detail. This 30-minute call is completely free and will help us both understand if we&apos;re a good fit for working together.
            </Text>
            
            <Button 
              style={button} 
              href={`https://calendly.com/adrian-rusan/consultation?prefill_email=${encodeURIComponent(email)}&prefill_name=${encodeURIComponent(name)}`}
            >
              Schedule Your Free Consultation
            </Button>
            
            <Text style={smallText}>
              Or you can reply directly to this email if you have any questions or would prefer to discuss via email first.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={resourcesSection}>
            <Heading style={h2}>While you&apos;re deciding...</Heading>
            <Text style={text}>
              Feel free to check out some of my recent work and resources:
            </Text>
            
            <Section style={linkSection}>
              <Link href="https://adrian-rusan.com/projects" style={link}>
                View My Portfolio Projects
              </Link>
              <Link href="https://adrian-rusan.com/docs" style={link}>
                Technical Documentation
              </Link>
              <Link href="https://adrian-rusan.com/learning" style={link}>
                Learning Resources
              </Link>
            </Section>
          </Section>

          <Hr style={hr} />

          <Section style={footerSection}>
            <Text style={footerText}>
              Best regards,<br />
              Adrian Rusan<br />
              Full-Stack Engineer
            </Text>
            
            <Text style={footerText}>
              <Link href="https://adrian-rusan.com" style={footerLink}>
                adrian-rusan.com
              </Link>
              {' | '}
              <Link href="https://github.com/AdrianRusan" style={footerLink}>
                GitHub
              </Link>
              {' | '}
              <Link href="https://linkedin.com/in/adrian-rusan" style={footerLink}>
                LinkedIn
              </Link>
            </Text>
            
            <Text style={unsubscribeText}>
              If you&apos;re no longer interested in this project, you can simply ignore this email. 
              I won&apos;t send any further follow-ups unless you reach out to me.
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
  padding: '0 40px',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
  padding: '0 40px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px',
  padding: '0 40px',
};

const messageSection = {
  padding: '0 40px',
  margin: '20px 0',
};

const bulletSection = {
  padding: '0 40px',
  margin: '20px 0',
};

const bulletText = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 8px',
  paddingLeft: '20px',
};

const ctaSection = {
  padding: '0 40px',
  margin: '30px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#CBACF9',
  borderRadius: '8px',
  color: '#000',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '20px 0',
};

const resourcesSection = {
  padding: '0 40px',
  margin: '30px 0',
};

const linkSection = {
  padding: '0 40px',
  margin: '10px 0',
};

const link = {
  color: '#CBACF9',
  textDecoration: 'underline',
  fontSize: '16px',
  display: 'block',
  margin: '8px 0',
};

const footerSection = {
  padding: '0 40px',
  margin: '30px 0',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 8px',
};

const footerLink = {
  color: '#CBACF9',
  textDecoration: 'underline',
  fontSize: '14px',
};

const unsubscribeText = {
  color: '#999',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '20px 0 0',
};

const smallText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '16px 0 0',
  padding: '0 40px',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

export default FollowUpEmail; 