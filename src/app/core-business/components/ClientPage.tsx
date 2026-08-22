"use client";

import { businessPages } from "../data";
import Hero from "./Hero";
import BusinessOverview from "./BusinessOverview";
import AboutService from "./AboutService";
import EngineeringCapabilities from "./EngineeringCapabilities";
import Industries from "./Industries";
import ProjectProcess from "./ProjectProcess";

const capabilitiesTitles: Record<string, string> = {
  "electrical-control": "OUR ENGINEERING CAPABILITIES",
  "panel-manufacturing": "OUR MANUFACTURING CAPABILITIES",
  "technical-service": "OUR SERVICE CAPABILITIES",
  "commissioning": "OUR COMMISSIONING CAPABILITIES",
  "inverter-vsd": "OUR VSD IMPLEMENTATION CAPABILITIES",
  "upgrade-retrofit": "OUR UPGRADE & RETROFIT CAPABILITIES"
};

export default function ClientPage({ slug }: { slug: string }) {
  const pageData = businessPages[slug];

  if (!pageData) return null;

  return (
    <>
      <Hero data={pageData.hero} slug={pageData.slug} />
      <BusinessOverview />
      <AboutService data={pageData.about} />
      <EngineeringCapabilities
        capabilities={pageData.capabilities}
        sectionTitle={capabilitiesTitles[slug] || "OUR CAPABILITIES"}
      />
      <Industries industries={pageData.industries} benefits={pageData.benefits} />
      <ProjectProcess steps={pageData.process} />
    </>
  );
}
