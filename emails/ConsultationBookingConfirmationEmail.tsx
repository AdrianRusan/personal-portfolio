import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Img,
  Row,
  Column,
} from '@react-email/components';

interface ConsultationBookingConfirmationEmailProps {
  name: string;
  email: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventDuration: string;
  meetingUrl?: string | undefined;
  eventDetails?: {
    description?: string | undefined;
    location?: string | undefined;
    timezone?: string | undefined;
  } | undefined;
  rescheduleUrl?: string | undefined;
  cancelUrl?: string | undefined;
}

export const ConsultationBookingConfirmationEmail: React.FC<ConsultationBookingConfirmationEmailProps> = ({
  name,
  email,
  eventName,
  eventDate,
  eventTime,
  eventDuration,
  meetingUrl,
  eventDetails,
  rescheduleUrl,
  cancelUrl,
}) => {
  const previewText = `Your consultation with Adrian Rusan is confirmed for ${eventDate} at ${eventTime}`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Img
                  src="https://utfs.io/a/23x7w9tiht/7iidzn1Twzuk3ZQYpyCbRtXkfi51QxyWTOLMcl8HhG4CZF2s"
                  width="60"
                  height="60"
                  alt="Adrian Rusan"
                  style={logo}
                />
              </Column>
              <Column>
                <Text style={headerText}>Adrian Rusan</Text>
                <Text style={headerSubtext}>Full-Stack Engineer</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>🎉 Consultation Confirmed!</Heading>
            
            <Text style={paragraph}>
              Hi {name},
            </Text>
            
            <Text style={paragraph}>
              Great news! Your consultation with Adrian Rusan has been successfully scheduled. 
              I&apos;m excited to discuss your project and explore how we can work together to bring your vision to life.
            </Text>

            {/* Event Details Card */}
            <Section style={eventCard}>
              <Heading style={h2}>{eventName}</Heading>
              
              <Row style={eventDetail}>
                <Column style={eventIcon}>📅</Column>
                <Column>
                  <Text style={eventLabel}>Date</Text>
                  <Text style={eventValue}>{eventDate}</Text>
                </Column>
              </Row>
              
              <Row style={eventDetail}>
                <Column style={eventIcon}>🕐</Column>
                <Column>
                  <Text style={eventLabel}>Time</Text>
                  <Text style={eventValue}>{eventTime}</Text>
                </Column>
              </Row>
              
              <Row style={eventDetail}>
                <Column style={eventIcon}>⏱️</Column>
                <Column>
                  <Text style={eventLabel}>Duration</Text>
                  <Text style={eventValue}>{eventDuration}</Text>
                </Column>
              </Row>
              
              {eventDetails?.timezone && (
                <Row style={eventDetail}>
                  <Column style={eventIcon}>🌍</Column>
                  <Column>
                    <Text style={eventLabel}>Timezone</Text>
                    <Text style={eventValue}>{eventDetails.timezone}</Text>
                  </Column>
                </Row>
              )}
              
              {eventDetails?.location && (
                <Row style={eventDetail}>
                  <Column style={eventIcon}>📍</Column>
                  <Column>
                    <Text style={eventLabel}>Location</Text>
                    <Text style={eventValue}>{eventDetails.location}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* Meeting Link */}
            {meetingUrl && (
              <Section style={buttonSection}>
                <Button style={button} href={meetingUrl}>
                  Join Video Call
                </Button>
              </Section>
            )}

            {/* Preparation Tips */}
            <Section style={tipsSection}>
              <Heading style={h3}>📝 How to Prepare</Heading>
              <Text style={paragraph}>
                To make the most of our consultation, please consider preparing:
              </Text>
              <ul style={list}>
                <li style={listItem}>A brief overview of your project goals and requirements</li>
                <li style={listItem}>Any existing designs, wireframes, or reference materials</li>
                <li style={listItem}>Your timeline and budget expectations</li>
                <li style={listItem}>Questions about the development process or my experience</li>
              </ul>
            </Section>

            {/* What to Expect */}
            <Section style={expectSection}>
              <Heading style={h3}>🎯 What to Expect</Heading>
              <Text style={paragraph}>
                During our consultation, we&apos;ll cover:
              </Text>
              <ul style={list}>
                <li style={listItem}>Your project vision and technical requirements</li>
                <li style={listItem}>Recommended technology stack and approach</li>
                <li style={listItem}>Timeline, milestones, and project phases</li>
                <li style={listItem}>Investment and payment structure</li>
                <li style={listItem}>Next steps and collaboration process</li>
              </ul>
            </Section>

            <Hr style={hr} />

            {/* Action Buttons */}
            <Section style={actionSection}>
              <Row>
                {rescheduleUrl && (
                  <Column>
                    <Button style={secondaryButton} href={rescheduleUrl}>
                      Reschedule
                    </Button>
                  </Column>
                )}
                {cancelUrl && (
                  <Column>
                    <Button style={secondaryButton} href={cancelUrl}>
                      Cancel
                    </Button>
                  </Column>
                )}
              </Row>
            </Section>

            <Text style={paragraph}>
              If you have any questions before our meeting, feel free to reply to this email 
              or reach out to me directly at rusan.adrian.ionut@gmail.com.
            </Text>

            <Text style={paragraph}>
              Looking forward to our conversation!
            </Text>

            <Text style={signature}>
              Best regards,<br />
              Adrian Rusan<br />
              Full-Stack Engineer<br />
              <a href="https://www.adrian-rusan.com" style={link}>www.adrian-rusan.com</a>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent because you scheduled a consultation on{' '}
              <a href="https://www.adrian-rusan.com" style={link}>adrian-rusan.com</a>
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
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '32px 24px',
  backgroundColor: '#000319',
  borderRadius: '8px 8px 0 0',
};

const logo = {
  borderRadius: '50%',
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

const eventCard = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const eventDetail = {
  marginBottom: '12px',
};

const eventIcon = {
  width: '24px',
  fontSize: '16px',
  paddingRight: '12px',
};

const eventLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const eventValue = {
  color: '#333',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const buttonSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#CBACF9',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '0 8px',
};

const secondaryButton = {
  backgroundColor: 'transparent',
  border: '1px solid #CBACF9',
  borderRadius: '6px',
  color: '#CBACF9',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 20px',
  margin: '0 8px',
};

const tipsSection = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const expectSection = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const list = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
  paddingLeft: '20px',
};

const listItem = {
  margin: '8px 0',
};

const actionSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const signature = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '32px 0 0',
};

const link = {
  color: '#CBACF9',
  textDecoration: 'none',
};

const hr = {
  borderColor: '#e9ecef',
  margin: '32px 0',
};

const footer = {
  backgroundColor: '#f8f9fa',
  padding: '16px 24px',
  borderRadius: '0 0 8px 8px',
};

const footerText = {
  color: '#666',
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '0',
  textAlign: 'center' as const,
};

export default ConsultationBookingConfirmationEmail; 