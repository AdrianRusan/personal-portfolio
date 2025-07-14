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

interface ConsultationBookingAdminNotificationEmailProps {
  clientName: string;
  clientEmail: string;
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
  bookingId?: string | undefined;
  calendlyEventUri?: string | undefined;
  bookedAt: Date;
}

export const ConsultationBookingAdminNotificationEmail: React.FC<ConsultationBookingAdminNotificationEmailProps> = ({
  clientName,
  clientEmail,
  eventName,
  eventDate,
  eventTime,
  eventDuration,
  meetingUrl,
  eventDetails,
  bookingId,
  calendlyEventUri,
  bookedAt,
}) => {
  const previewText = `New consultation booking from ${clientName} for ${eventDate} at ${eventTime}`;

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
                <Text style={headerSubtext}>Portfolio Admin</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>📅 New Consultation Booking</Heading>
            
            <Text style={paragraph}>
              A new consultation has been scheduled through your portfolio website.
            </Text>

            {/* Client Information */}
            <Section style={clientCard}>
              <Heading style={h2}>👤 Client Information</Heading>
              
              <Row style={clientDetail}>
                <Column style={clientIcon}>👤</Column>
                <Column>
                  <Text style={clientLabel}>Name</Text>
                  <Text style={clientValue}>{clientName}</Text>
                </Column>
              </Row>
              
              <Row style={clientDetail}>
                <Column style={clientIcon}>📧</Column>
                <Column>
                  <Text style={clientLabel}>Email</Text>
                  <Text style={clientValue}>{clientEmail}</Text>
                </Column>
              </Row>
              
              <Row style={clientDetail}>
                <Column style={clientIcon}>🕐</Column>
                <Column>
                  <Text style={clientLabel}>Booked At</Text>
                  <Text style={clientValue}>{bookedAt.toLocaleString()}</Text>
                </Column>
              </Row>
            </Section>

            {/* Event Details */}
            <Section style={eventCard}>
              <Heading style={h2}>📅 Event Details</Heading>
              
              <Row style={eventDetail}>
                <Column style={eventIcon}>📝</Column>
                <Column>
                  <Text style={eventLabel}>Event Type</Text>
                  <Text style={eventValue}>{eventName}</Text>
                </Column>
              </Row>
              
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

            {/* Technical Details */}
            {(bookingId || calendlyEventUri) && (
              <Section style={techCard}>
                <Heading style={h3}>🔧 Technical Details</Heading>
                
                {bookingId && (
                  <Row style={techDetail}>
                    <Column style={techIcon}>🆔</Column>
                    <Column>
                      <Text style={techLabel}>Booking ID</Text>
                      <Text style={techValue}>{bookingId}</Text>
                    </Column>
                  </Row>
                )}
                
                {calendlyEventUri && (
                  <Row style={techDetail}>
                    <Column style={techIcon}>🔗</Column>
                    <Column>
                      <Text style={techLabel}>Calendly Event URI</Text>
                      <Text style={techValue}>{calendlyEventUri}</Text>
                    </Column>
                  </Row>
                )}
              </Section>
            )}

            {/* Quick Actions */}
            <Section style={actionSection}>
              <Heading style={h3}>⚡ Quick Actions</Heading>
              
              <Row>
                {meetingUrl && (
                  <Column>
                    <Button style={button} href={meetingUrl}>
                      Join Meeting
                    </Button>
                  </Column>
                )}
                
                <Column>
                  <Button style={secondaryButton} href={`mailto:${clientEmail}`}>
                    Email Client
                  </Button>
                </Column>
                
                <Column>
                  <Button style={secondaryButton} href="https://calendly.com/admin">
                    Calendly Admin
                  </Button>
                </Column>
              </Row>
            </Section>

            {/* Preparation Reminders */}
            <Section style={reminderSection}>
              <Heading style={h3}>📝 Preparation Reminders</Heading>
              <Text style={paragraph}>
                Before the consultation, consider:
              </Text>
              <ul style={list}>
                <li style={listItem}>Review the client&apos;s email and any project details they may have shared</li>
                <li style={listItem}>Prepare relevant portfolio examples and case studies</li>
                <li style={listItem}>Have your project questionnaire and pricing information ready</li>
                <li style={listItem}>Ensure your video setup and internet connection are stable</li>
                <li style={listItem}>Block calendar time for follow-up proposal preparation</li>
              </ul>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              This notification was automatically generated when {clientName} scheduled a consultation 
              through your portfolio website.
            </Text>

            <Text style={signature}>
              Portfolio Booking System<br />
              <a href="https://www.adrian-rusan.com" style={link}>www.adrian-rusan.com</a>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              This is an automated notification from your portfolio booking system.
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

const clientCard = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const eventCard = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const techCard = {
  backgroundColor: '#fef3c7',
  border: '1px solid #fcd34d',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const reminderSection = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const clientDetail = {
  marginBottom: '12px',
};

const eventDetail = {
  marginBottom: '12px',
};

const techDetail = {
  marginBottom: '12px',
};

const clientIcon = {
  width: '24px',
  fontSize: '16px',
  paddingRight: '12px',
};

const eventIcon = {
  width: '24px',
  fontSize: '16px',
  paddingRight: '12px',
};

const techIcon = {
  width: '24px',
  fontSize: '16px',
  paddingRight: '12px',
};

const clientLabel = {
  color: '#0369a1',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const eventLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const techLabel = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0 0 4px',
};

const clientValue = {
  color: '#0c4a6e',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const eventValue = {
  color: '#333',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const techValue = {
  color: '#a16207',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
  fontFamily: 'monospace',
};

const actionSection = {
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

export default ConsultationBookingAdminNotificationEmail; 