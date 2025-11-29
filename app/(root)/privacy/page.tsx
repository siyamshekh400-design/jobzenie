import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-7xl p-6 sm:p-10">
      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
          <p className="text-muted-foreground mt-1 text-sm">Last Updated: November 05, 2025</p>
        </CardHeader>
        <CardContent className="space-y-6 text-sm">
          <p>
            Welcome to Jobzenie (“we,” “our,” or “us”). Your privacy and data protection are extremely important to us.
            This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our
            website, mobile app, or any of our services (collectively, the “Platform”).
          </p>

          <Accordion type="single" collapsible className="space-y-2">
            {/* 1. Information We Collect */}
            <AccordionItem value="info-collect">
              <AccordionTrigger>1. Information We Collect</AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm">
                <p>We may collect the following types of information:</p>

                <h3 className="mt-2 font-semibold">a. Personal Information (for Job Seekers)</h3>
                <ul className="list-inside list-disc space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Address</li>
                  <li>Date of birth</li>
                  <li>National ID (NID) number and copy</li>
                  <li>Passport number and scan copy</li>
                  <li>CV/resume and employment history</li>
                  <li>Education, skills, and certifications</li>
                  <li>Profile photo or verification documents</li>
                </ul>

                <h3 className="mt-2 font-semibold">b. Company Information (for Employers)</h3>
                <ul className="list-inside list-disc space-y-1">
                  <li>Company name</li>
                  <li>Contact details</li>
                  <li>Business address</li>
                  <li>Trade license or registration details</li>
                  <li>Job postings and recruitment data</li>
                </ul>

                <h3 className="mt-2 font-semibold">c. Automatically Collected Information</h3>
                <ul className="list-inside list-disc space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Pages visited and session duration</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 2. How We Use Your Information */}
            <AccordionItem value="how-use">
              <AccordionTrigger>2. How We Use Your Information</AccordionTrigger>
              <AccordionContent className="space-y-2">
                <ul className="list-inside list-disc space-y-1">
                  <li>Create and manage your account</li>
                  <li>Verify your identity and prevent fraud</li>
                  <li>Match job seekers with verified employers</li>
                  <li>Share your resume information with companies to help you find suitable job opportunities</li>
                  <li>Allow employers to contact you for job offers</li>
                  <li>Send job alerts, updates, and notifications</li>
                  <li>Improve our platform and user experience</li>
                  <li>Ensure compliance with recruiting, immigration, and data protection laws</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 3. Storage and Security */}
            <AccordionItem value="storage-security">
              <AccordionTrigger>3. Storage and Security of Sensitive Documents</AccordionTrigger>
              <AccordionContent>
                <p>
                  Your NID and Passport details are collected for identity verification and legal compliance only. We
                  use encryption, secured servers, and restricted access to protect your personal documents. Only
                  authorized personnel can access this information, and it is handled confidentially. We never publish
                  or share your passport or NID data with employers or third parties without your explicit consent,
                  except when required by law.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Add remaining sections similarly... */}
            <AccordionItem value="resume-sharing">
              <AccordionTrigger>4. Resume Information Sharing</AccordionTrigger>
              <AccordionContent>
                <p>
                  When you upload or create your CV/resume on our platform, you consent to us sharing it with verified
                  employers and partner agencies to help you get job opportunities. You can control your resume
                  visibility or delete it anytime from your account settings.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="no-personal-deal">
              <AccordionTrigger>5. No Personal Deal Policy</AccordionTrigger>
              <AccordionContent>
                <p>
                  Jobzenie strictly prohibits any personal or direct financial deal between job seekers and employers,
                  agents, or company representatives outside the platform. All recruitment and communication must happen
                  through our official channels only.
                </p>
                <p className="mt-2">
                  Report suspicious offers immediately to our support team: <strong>support@jobzenie.com</strong>
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Add remaining sections similarly: Data Retention, Legal Compliance, Children's Privacy, Cookies, Rights, Third-Party Links, Updates, Contact */}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
