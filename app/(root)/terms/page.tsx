import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 sm:p-10">
      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Jobzenie – Terms & Conditions</CardTitle>
          <p className="text-muted-foreground mt-1 text-sm">Last Updated: November 05, 2025</p>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <p>
            Welcome to Jobzenie (“we,” “our,” or “us”). By accessing or using our website, mobile app, or any related
            services (“Platform”), you agree to comply with and be bound by these Terms and Conditions. Please read them
            carefully before using our services.
          </p>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="acceptance">
              <AccordionTrigger>1. Acceptance of Terms</AccordionTrigger>
              <AccordionContent>
                <p>
                  By creating an account, browsing jobs, applying for employment, or posting vacancies, you agree to
                  these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use our Platform.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="services">
              <AccordionTrigger>2. Services Provided</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <ul className="list-inside list-disc space-y-1">
                  <li>Job posting and application management</li>
                  <li>Candidate and employer verification</li>
                  <li>Resume and profile creation tools</li>
                  <li>Job matching and notifications</li>
                  <li>Recruitment support in compliance with Bangladesh and international labor laws</li>
                </ul>
                <p>We are not a direct employer for all listed positions unless specifically stated.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eligibility">
              <AccordionTrigger>3. User Eligibility</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  <li>Users must be at least 18 years old.</li>
                  <li>Job seekers must provide accurate and truthful information.</li>
                  <li>Employers and agencies must be licensed and legally authorized to recruit or hire workers.</li>
                  <li>Any false information may result in account suspension or permanent ban.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-responsibilities">
              <AccordionTrigger>4. User Responsibilities</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  <li>Use the Platform only for lawful recruitment or job search purposes</li>
                  <li>Provide correct personal, professional, or company details</li>
                  <li>Maintain confidentiality of account login credentials</li>
                  <li>Avoid misuse, spamming, or fraudulent activities on the Platform</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="document-submission">
              <AccordionTrigger>5. Document Submission</AccordionTrigger>
              <AccordionContent>
                <p>
                  Job seekers may be required to submit sensitive documents such as National ID (NID), Passport, and
                  Resume for verification. Jobzenie ensures documents are handled securely and only shared with verified
                  employers, agencies, or authorities when required by law.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="no-personal-deal">
              <AccordionTrigger>6. No Personal Deal Policy</AccordionTrigger>
              <AccordionContent>
                <p>
                  All transactions, communications, and recruitment processes must go through Jobzenie’s official
                  Platform.
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Job seekers must not make personal or direct payments to individuals or third parties.</li>
                  <li>Employers or agents must not request or accept personal payments from candidates.</li>
                </ul>
                <p className="mt-2">
                  Violations may lead to account suspension, legal action, or blacklisting. Report suspicious activity:{" "}
                  <strong>support@jobzenie.com</strong>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legal-compliance">
              <AccordionTrigger>7. Legal Compliance</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p>Bangladesh Laws:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Overseas Employment and Migrants Act 2013</li>
                  <li>Overseas Employment and Migrants (Amendment) Act 2023</li>
                  <li>Emigration Ordinance 1982</li>
                </ul>
                <p>International Compliance:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>
                    GDPR (EU): Users in the European Union have rights to access, correct, delete, or restrict personal
                    data.
                  </li>
                  <li>
                    CCPA (California, USA): Users in California have rights regarding personal data collection and sale.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="resume-sharing">
              <AccordionTrigger>8. Resume & Data Sharing</AccordionTrigger>
              <AccordionContent>
                <p>
                  By uploading your CV/resume, you authorize us to share it with verified employers, recruiters, and
                  partner agencies for legitimate job opportunities. You may change visibility or delete your data
                  anytime. We ensure compliance with international data privacy laws when sharing information across
                  borders.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="employer-responsibilities">
              <AccordionTrigger>9. Employer Responsibilities</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  <li>Post genuine and lawful job offers</li>
                  <li>Not demand or collect money from job seekers</li>
                  <li>Comply with Bangladesh and international labor and recruitment regulations</li>
                  <li>Treat all applicants fairly and without discrimination</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fees-payments">
              <AccordionTrigger>10. Fees and Payments</AccordionTrigger>
              <AccordionContent>
                <p>
                  Certain premium services (e.g., featured job listings, advertising) may require payment. All fees are
                  non-refundable unless otherwise stated.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability">
              <AccordionTrigger>11. Limitation of Liability</AccordionTrigger>
              <AccordionContent>
                <p>
                  Jobzenie acts only as an intermediary between job seekers and employers. We are not responsible for:
                </p>
                <ul className="list-inside list-disc space-y-1">
                  <li>False job postings or employer behavior</li>
                  <li>Job seeker performance or conduct</li>
                  <li>Any losses from personal dealings outside the Platform</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="intellectual-property">
              <AccordionTrigger>12. Intellectual Property</AccordionTrigger>
              <AccordionContent>
                <p>
                  All content, logos, and designs on Jobzenie are the property of the company and may not be copied,
                  reproduced, or used without permission.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="termination">
              <AccordionTrigger>13. Termination</AccordionTrigger>
              <AccordionContent>
                <p>
                  We reserve the right to suspend or terminate any account that violates these Terms, the Privacy
                  Policy, or any applicable law.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes">
              <AccordionTrigger>14. Changes to Terms</AccordionTrigger>
              <AccordionContent>
                <p>
                  Jobzenie may update these Terms at any time. Continued use of the Platform after changes means you
                  accept the revised Terms.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing-law">
              <AccordionTrigger>15. Governing Law</AccordionTrigger>
              <AccordionContent>
                <p>
                  These Terms are governed by the laws of Bangladesh. For international users, compliance with local
                  laws is also applicable where necessary. Any disputes will be handled under the jurisdiction of the
                  courts of Dhaka, Bangladesh, unless otherwise mandated by international agreements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="contact">
              <AccordionTrigger>16. Contact Us</AccordionTrigger>
              <AccordionContent>
                <p>
                  📧 Email: <strong>support@jobzenie.com</strong>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
