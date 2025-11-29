import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-7xl p-6 sm:p-10">
      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Jobzenie – Terms of Use</CardTitle>
          <p className="text-muted-foreground mt-1 text-sm">Last Updated: 05 November 2025</p>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <p>
            Welcome to Jobzenie! By using our website and services, you agree to comply with and be bound by the
            following terms. Please read them carefully.
          </p>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="acceptance">
              <AccordionTrigger>1. Acceptance of Terms</AccordionTrigger>
              <AccordionContent>
                <p>
                  By accessing or using Jobzenie, you agree to these Terms of Use, our Privacy Policy, and any
                  additional guidelines we post. If you do not agree, please do not use our services.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eligibility">
              <AccordionTrigger>2. Eligibility</AccordionTrigger>
              <AccordionContent>
                <p>
                  You must be at least 18 years old or have the legal authority to use Jobzenie in your country. By
                  creating an account, you confirm that you meet these requirements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="account-responsibilities">
              <AccordionTrigger>3. Account Responsibilities</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>You must provide accurate, complete, and up-to-date information.</li>
                  <li>You agree not to impersonate anyone or provide false information.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="use-of-platform">
              <AccordionTrigger>4. Use of Jobzenie</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  <li>Jobzenie is intended to connect job seekers and employers.</li>
                  <li>
                    You may not use the platform for unlawful purposes, spamming, or posting misleading information.
                  </li>
                  <li>Jobzenie reserves the right to remove any content that violates our rules.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="job-postings">
              <AccordionTrigger>5. Job Postings & Applications</AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  <li>Employers must ensure all job postings are accurate and lawful.</li>
                  <li>Job seekers must provide true and verifiable information in profiles and applications.</li>
                  <li>Jobzenie is not responsible for the outcome of any job application or employment offer.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="intellectual-property">
              <AccordionTrigger>6. Intellectual Property</AccordionTrigger>
              <AccordionContent>
                <p>
                  All content on Jobzenie (text, graphics, logos, design) is owned by Jobzenie or licensed to us. You
                  may not copy, distribute, or use our content without permission.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy-data">
              <AccordionTrigger>7. Privacy & Data</AccordionTrigger>
              <AccordionContent>
                <p>
                  Your use of Jobzenie is subject to our Privacy Policy, which explains how we collect, use, and protect
                  your data.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="termination">
              <AccordionTrigger>8. Termination</AccordionTrigger>
              <AccordionContent>
                <p>
                  Jobzenie may suspend or terminate your account for violations of these Terms. You may also close your
                  account at any time.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="liability">
              <AccordionTrigger>9. Limitation of Liability</AccordionTrigger>
              <AccordionContent>
                <p>
                  Jobzenie is a platform connecting job seekers and employers. We are not responsible for employment
                  outcomes. To the maximum extent allowed by law, Jobzenie is not liable for any indirect, incidental,
                  or consequential damages.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="changes">
              <AccordionTrigger>10. Changes to Terms</AccordionTrigger>
              <AccordionContent>
                <p>
                  Jobzenie may update these Terms from time to time. Updated Terms will be posted on the website, and
                  your continued use constitutes acceptance of the changes.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="governing-law">
              <AccordionTrigger>11. Governing Law</AccordionTrigger>
              <AccordionContent>
                <p>
                  These Terms are governed by the laws of Bangladesh. Any disputes will be resolved under the
                  jurisdiction of local courts.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="acknowledgment">
              <AccordionTrigger>12. Acknowledgment</AccordionTrigger>
              <AccordionContent>
                <p>
                  By using Jobzenie, you acknowledge that you have read, understood, and agree to these Terms of Use.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
