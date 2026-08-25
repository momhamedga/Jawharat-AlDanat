import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export interface ContactInquiryEmailProps {
  name: string;
  phone: string;
  email: string;
  serviceType?: string;
  message: string;
}

export function ContactInquiryEmail({
  name,
  phone,
  email,
  serviceType,
  message,
}: ContactInquiryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>طلب استفسار وتواصل جديد من: {name}</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', padding: '20px 0' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', maxWidth: '600px', border: '1px solid #e2e8f0' }}>
          <Heading style={{ color: '#030f1e', fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>
            جوهرة الدانة — إشعار طلب تواصل جديد
          </Heading>
          <Text style={{ color: '#64748b', fontSize: '14px', marginTop: '0' }}>
            تم استلام استفسار جديد عبر الموقع الإلكتروني الرسمي
          </Text>
          <Hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
          <Section>
            <Text style={{ fontSize: '14px', margin: '8px 0' }}>
              <strong>الاسم:</strong> {name}
            </Text>
            <Text style={{ fontSize: '14px', margin: '8px 0' }}>
              <strong>رقم الهاتف:</strong> {phone}
            </Text>
            <Text style={{ fontSize: '14px', margin: '8px 0' }}>
              <strong>البريد الإلكتروني:</strong> {email}
            </Text>
            {serviceType && (
              <Text style={{ fontSize: '14px', margin: '8px 0' }}>
                <strong>نوع الخدمة المطلوبة:</strong> {serviceType}
              </Text>
            )}
          </Section>
          <Hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
          <Section>
            <Text style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>نص الرسالة:</Text>
            <Text style={{ fontSize: '14px', backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactInquiryEmail;
