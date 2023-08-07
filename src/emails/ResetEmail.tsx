import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface DropboxResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';

export function ResetEmailTemplate({
    userFirstname,
    resetPasswordLink,
}: DropboxResetPasswordEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Hey there! Here is your password reset link. Please ignore this if you did not request for this request.</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`https://i.imgur.com/4DvsKbT_d.webp?maxwidth=760&fidelity=grand`}
                        width="40"
                        height="33"
                        alt="ERWIN"
                    />
                    <Section>
                        <Text style={text}>Hi {userFirstname},</Text>
                        <Text style={text}>
                            Someone recently requested a password change for your ERWIN
                            account. If this was you, you can set a new password here:
                        </Text>
                        <Button style={button} href={resetPasswordLink}>
                            <Text style={resetText}>
                                Reset password
                            </Text>
                        </Button>
                        <Text style={text}>
                            If you don&apos;t want to change your password or didn&apos;t
                            request this, just ignore and delete this message.
                        </Text>
                        <Text style={text}>
                            To keep your account secure, please don&apos;t forward this email
                            to anyone
                        </Text>
                        <Text style={text}>- ERWIN Team</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ResetEmailTemplate;

const main = {
    backgroundColor: '#f6f9fc',
    padding: '10px 0',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #f0f0f0',
    padding: '45px',
};

const text = {
    fontSize: '16px',
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: '300',
    color: '#404040',
    lineHeight: '26px',
};

const resetText = {
    textAlign: 'center' as const,
    width: "210px",
    marginTop: "12px",
}

const button = {
    backgroundColor: '#0ED145',
    borderRadius: '4px',
    color: '#fff',
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: '15px',
    textDecoration: 'none',
    display: 'grid',
    width: '210px',
    height: "50px",

};

const anchor = {
    textDecoration: 'underline',
};