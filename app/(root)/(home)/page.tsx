// import { headers } from "next/headers";

import FeaturedJobs from "@/components/home/featured-jobs";
import HeroBanner from "@/components/home/hero-banner";
import Services from "@/components/home/services";
// import { auth } from "@/lib/auth";

export const metadata = {
  title: "JobZenie - Find Your Dream Job",
  description: "Connect with top employers and find your perfect job opportunity",
};

export default async function Home() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // console.log(session?.user);

  // const candidate = await getCandidates();
  // console.log("🚀 ~ Home ~ candidate:", candidate);

  return (
    <>
      <HeroBanner />
      <Services />
      <FeaturedJobs />
    </>
  );
}
