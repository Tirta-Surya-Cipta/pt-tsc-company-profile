import type { LucideIcon } from "lucide-react";
import {
  Zap, Settings, Shield, Wrench, BarChart2, RefreshCw,
  Cpu, Monitor, FileText, CircuitBoard, Gauge, Network,
  ClipboardCheck, HardDrive, Cog, PenTool, Cable, Power,
  Thermometer, Activity, CheckCircle2, Clock, HeartPulse,
  Search, PlugZap, Component, Boxes, Layers, Factory,
  Rocket, BadgeCheck, Eye, ShieldCheck, Lightbulb, TrendingUp,
  Hammer, Truck, Award, Workflow, LayoutGrid, Database,
  Percent, Timer, BatteryCharging, Bolt, Package, Scale,
  AlertTriangle, Handshake,
} from "lucide-react";

// ── Type Definitions ──────────────────────────────────────────────────────────

export interface HeroData {
  badge: string;
  heading: string;
  description: string;
  heroImage: string;
}

export interface AboutFeature {
  icon: LucideIcon;
  title: string;
}

export interface AboutData {
  title: string;
  description: string;
  paragraph: string;
  image: string;
  features: AboutFeature[];
}

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface IndustryCard {
  name: string;
  description: string;
  image: string;
}

export interface Benefit {
  icon: LucideIcon;
  text: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FeaturedProjectData {
  image: string;
  badge: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  sidebar: {
    industry: string;
    location: string;
    duration: string;
    scope: string;
  };
  slug: string;
}

export interface CoreBusinessPageData {
  slug: string;
  navLabel: string;
  navIcon: LucideIcon;
  navDescription: string;
  hero: HeroData;
  about: AboutData;
  capabilities: Capability[];
  industries: IndustryCard[];
  benefits: Benefit[];
  process: ProcessStep[];
  featuredProject: FeaturedProjectData;
}

// ── Shared Process Steps ──────────────────────────────────────────────────────

const sharedProcess: ProcessStep[] = [
  { step: "01", title: "Consultation", description: "We understand your needs, challenges, and objectives to define the right approach." },
  { step: "02", title: "Engineering & Design", description: "Our engineering team develops solutions tailored to your operational requirements." },
  { step: "03", title: "Implementation", description: "We build, configure, and integrate the systems with precision and quality." },
  { step: "04", title: "Testing & Commissioning", description: "We validate every system to ensure it meets all performance criteria." },
  { step: "05", title: "Handover & Training", description: "We hand over the project, including documentation and training for your team." },
  { step: "06", title: "Support & Maintenance", description: "We remain by your side with ongoing technical support and long-term reliability." },
];

// ── Shared Industries ─────────────────────────────────────────────────────────

const sharedIndustries: IndustryCard[] = [
  { name: "Food & Beverage", description: "Hygienic automation systems", image: "/images/core-business/industries/food-beverage.webp" },
  { name: "Water Treatment", description: "Filtration & dosing control", image: "/images/core-business/industries/water-treatment.webp" },
  { name: "Manufacturing", description: "Production line automation", image: "/images/core-business/industries/manufacturing.webp" },
  { name: "Mining", description: "Heavy-duty motor control", image: "/images/core-business/industries/mining.webp" },
  { name: "Palm Oil", description: "Process & utility systems", image: "/images/core-business/industries/palm-oil.webp" },
  { name: "Packaging", description: "Speed & precision control", image: "/images/core-business/industries/packaging.webp" },
  { name: "Building Utilities", description: "HVAC & pump automation", image: "/images/core-business/industries/building-utilities.webp" },
  { name: "Automotive", description: "Precision assembly systems", image: "/images/core-business/industries/automotive.webp" },
];

// ── Page Data ─────────────────────────────────────────────────────────────────

export const businessPages: Record<string, CoreBusinessPageData> = {
  "electrical-control": {
    slug: "electrical-control",
    navLabel: "Electrical and Control System Engineering",
    navIcon: Zap,
    navDescription: "Core design, power system, motor control, and automation for industrial application.",
    hero: {
      badge: "ELECTRICAL CONTROL",
      heading: "Electrical & Control\nSystem Engineering",
      description: "Delivering robust engineering electrical and control flow systems that empower operational reliability, enhance safety, and support long-term efficiency. From control system integration to PLC design and commissioning, TSC offers end-to-end electrical support for industrial requirements.",
      heroImage: "/images/core-business/electrical-control/hero.webp",
    },
    about: {
      title: "Engineering Reliable Electrical Systems for Modern Industries",
      description: "Every industrial operation relies on a well-designed electrical and control system to ensure safety, efficiency, and consistent performance.",
      paragraph: "TSC provides end-to-end engineering services including electrical design, control system, PLC programming, instrumentation, and SCADA integration.\n\nOur engineering approach combines industry best practices with real-world experience to deliver rapid solutions that are easy to operate, maintain, and expand.",
      image: "/images/core-business/electrical-control/about.webp",
      features: [
        { icon: Award, title: "Quality Engineering" },
        { icon: Clock, title: "On-Time Delivery" },
        { icon: Handshake, title: "Experienced Team" },
        { icon: HeartPulse, title: "Continuous Support" },
      ],
    },
    capabilities: [
      { icon: PenTool, title: "Electrical Design", description: "Comprehensive single-line diagrams, wiring schematics, and standardized circuit designs." },
      { icon: Cpu, title: "PLC Programming", description: "Custom logic development for Allen-Bradley, Siemens, and Schneider automation platforms." },
      { icon: Monitor, title: "SCADA Integration", description: "Real-time data acquisition, supervisory control for centralized monitoring." },
      { icon: Power, title: "Power Distribution", description: "MDB, SDB, and LVMDP design with proper protection and load management." },
      { icon: CircuitBoard, title: "Control Panel Design", description: "Designed with safety, maintainability, and compliance to international standards." },
      { icon: Gauge, title: "Instrumentation & I/O", description: "Sensors, transmitters, and field instrument integration for process monitoring." },
      { icon: Network, title: "Industrial Networking", description: "Profibus, Profinet, Ethernet/IP, and Modbus communication network setup." },
      { icon: FileText, title: "Technical Documentation", description: "Complete as-built drawings, manuals, I/O lists, and commissioning reports." },
    ],
    industries: sharedIndustries,
    benefits: [
      { icon: TrendingUp, text: "Improve Operational Efficiency" },
      { icon: Shield, text: "Increase System Reliability" },
      { icon: ShieldCheck, text: "Enhanced Safety Standards" },
      { icon: Percent, text: "Reduce Lifecycle Cost" },
      { icon: Lightbulb, text: "Scalable for Future Growth" },
      { icon: BadgeCheck, text: "Compliance & Standards" },
    ],
    process: sharedProcess,
    featuredProject: {
      image: "/images/core-business/electrical-control/featured.webp",
      badge: "FEATURED PROJECT",
      title: "Electrical System Engineering for Water Treatment Plant",
      overview: "Complete electrical design and control system engineering for a water treatment facility, including MCC panels, PLC automation, and SCADA integration.",
      challenge: "The existing facility lacked centralized control and monitoring capability, resulting in manual intervention and inconsistent process quality.",
      solution: "We designed and implemented a full electrical distribution and PLC-based control system with integrated SCADA for real-time monitoring and automated operation.",
      result: "Achieved fully automated operation with centralized monitoring, reducing manual intervention by 80% and improving process consistency.",
      sidebar: {
        industry: "Water Treatment",
        location: "Bekasi, Indonesia",
        duration: "4 Months",
        scope: "Design, Supply, Installation, Commissioning",
      },
      slug: "booster-pump-upgrade",
    },
  },

  "panel-manufacturing": {
    slug: "panel-manufacturing",
    navLabel: "Panel Manufacturing & Integration",
    navIcon: Settings,
    navDescription: "Custom industrial panel design and high quality manufactured panel solutions.",
    hero: {
      badge: "PANEL MANUFACTURING",
      heading: "Panel Manufacturing &\nIntegration",
      description: "Providing professional manufacturing control panels that combine engineering precision, high quality components, and reliable assembly standards. From MCC and PLC Panels to Custom Control Panels, every solution is built for dependable long-term operation.",
      heroImage: "/images/core-business/panel-manufacturing/hero.webp",
    },
    about: {
      title: "Building Reliable Control Panels for Industrial Applications",
      description: "Every automation system starts with a dependable control panel. Our manufacturing process follows strict quality standards, ensuring every panel is tested, documented, and ready for seamless installation.",
      paragraph: "We manufacture custom industrial panels tailored to your operational requirements while maintaining safety, scalability, and maintainability.\n\nFrom design review to factory acceptance testing, our end-to-end process ensures quality at every step.",
      image: "/images/core-business/panel-manufacturing/about.webp",
      features: [
        { icon: Award, title: "Quality Engineering" },
        { icon: Factory, title: "Factory Acceptance Testing" },
        { icon: Handshake, title: "Experienced Team" },
        { icon: ClipboardCheck, title: "Complete Documentation" },
      ],
    },
    capabilities: [
      { icon: LayoutGrid, title: "Panel Trunking & FAT", description: "Complete functional acceptance testing before delivery." },
      { icon: Cpu, title: "PLC Control Panels", description: "Custom-designed PLC panels with HMI integration." },
      { icon: CircuitBoard, title: "MCC Panels", description: "Motor Control Centre panels for motor and load control." },
      { icon: Power, title: "PCC Panels", description: "Power Control Centre for main power distribution." },
      { icon: Monitor, title: "HMI Operator Panels", description: "Integrated operator panels for real-time visualization." },
      { icon: Gauge, title: "VSD Control Panels", description: "Variable speed drive panels for motor speed control." },
      { icon: Cog, title: "Custom Automation Cabinets", description: "Application-specific panel designs for special requirements." },
      { icon: FileText, title: "Documentation & Package", description: "Complete panel drawings, test reports, and user manuals." },
    ],
    industries: sharedIndustries,
    benefits: [
      { icon: ShieldCheck, text: "Improve Panel Reliability" },
      { icon: Rocket, text: "Faster Site Installation" },
      { icon: Wrench, text: "Simplified Maintenance" },
      { icon: PenTool, text: "Custom Design" },
      { icon: BadgeCheck, text: "Consistent Quality" },
      { icon: Award, text: "Compliance & Standards" },
    ],
    process: sharedProcess,
    featuredProject: {
      image: "/images/core-business/panel-manufacturing/featured.webp",
      badge: "FEATURED PROJECT",
      title: "Custom PLC & MCC Panel Manufacturing for Water Treatment Facility",
      overview: "Designed and manufactured custom PLC and MCC panels for a water treatment plant, including functional testing and complete documentation.",
      challenge: "The client required custom-built panels that conform to limited space availability while maintaining full automation capability and safety compliance.",
      solution: "We designed compact MCC and PLC panels with optimized internal layout, integrated safety systems, and conducted thorough factory acceptance testing.",
      result: "Delivered on schedule with zero defects during commissioning, achieving full automation readiness from day one.",
      sidebar: {
        industry: "Water Treatment",
        location: "Bekasi, Indonesia",
        duration: "3 Months",
        scope: "Design, Manufacturing, Testing, Delivery",
      },
      slug: "water-treatment-automation",
    },
  },

  "technical-service": {
    slug: "technical-service",
    navLabel: "Technical Service & Long-Term Support",
    navIcon: Shield,
    navDescription: "On-site maintenance, service, and responsive support for industrial operations.",
    hero: {
      badge: "TECHNICAL SERVICE",
      heading: "Technical Service &\nLong-Term Support",
      description: "Maintaining reliable industrial operations requires responsive field support for troubleshooting, emergency response, and long-term service management designed to maximize uptime and minimize equipment disruption.",
      heroImage: "/images/core-business/technical-service/hero.webp",
    },
    about: {
      title: "Keeping Your Industrial Systems Running Efficiently",
      description: "Our technical service team provides responsive field support for industrial automation systems, whether it is preventive maintenance, breakdown troubleshooting, or scheduled inspections.",
      paragraph: "We help keep your production operating with minimal interruption.\n\nOur team brings real-world experience across various industries and platforms to quickly diagnose and resolve technical issues.",
      image: "/images/core-business/technical-service/about.webp",
      features: [
        { icon: Clock, title: "Long-Term Service Support" },
        { icon: Shield, title: "Preventive Maintenance" },
        { icon: Handshake, title: "Experienced Team" },
        { icon: AlertTriangle, title: "Emergency Support" },
      ],
    },
    capabilities: [
      { icon: Search, title: "Electrical Inspection", description: "Scheduled electrical system inspections and safety audits." },
      { icon: Wrench, title: "PLC Troubleshooting", description: "Diagnosis and repair of PLC, HMI, communication issues, and faults." },
      { icon: HeartPulse, title: "Preventive Maintenance", description: "Routine maintenance programs to prevent unplanned failures." },
      { icon: Monitor, title: "SCADA & HMI Support", description: "Software updates, screen modifications, and data integration support." },
      { icon: Package, title: "Spare Parts Assistance", description: "Sourcing and supply of replacement parts and components." },
      { icon: Cog, title: "Corrective Maintenance", description: "Rapid response to breakdowns and system fault restoration." },
      { icon: Handshake, title: "Remote Technical Support", description: "Remote diagnosis and troubleshooting via secure connections." },
      { icon: ClipboardCheck, title: "Annual Maintenance Program", description: "Comprehensive yearly service agreements for ongoing protection." },
    ],
    industries: sharedIndustries,
    benefits: [
      { icon: Timer, text: "Reduce Downtime" },
      { icon: TrendingUp, text: "Improve Reliability" },
      { icon: Handshake, text: "Extended Equipment Life" },
      { icon: Percent, text: "Lower Maintenance Cost" },
      { icon: FileText, text: "Technical Documentation" },
      { icon: BadgeCheck, text: "Compliance & Standards" },
    ],
    process: sharedProcess,
    featuredProject: {
      image: "/images/core-business/technical-service/featured.webp",
      badge: "FEATURED PROJECT",
      title: "Annual Maintenance Program for Manufacturing Plant",
      overview: "Provided a comprehensive annual maintenance program for a food manufacturing facility, covering PLC systems, motor drives, and electrical distribution.",
      challenge: "Frequent unplanned downtime due to lack of preventive maintenance schedule and aging equipment creating safety concerns.",
      solution: "Implemented a structured annual maintenance program with scheduled inspections, predictive diagnostics, and on-call emergency support.",
      result: "Reduced unplanned downtime by 65% in the first year and extended average equipment lifespan by 30%.",
      sidebar: {
        industry: "Manufacturing",
        location: "Cikarang, Indonesia",
        duration: "12 Months",
        scope: "Preventive Maintenance, Emergency Support",
      },
      slug: "conveyor-system-automation",
    },
  },

  "commissioning": {
    slug: "commissioning",
    navLabel: "Commissioning & Troubleshooting",
    navIcon: Wrench,
    navDescription: "Reliable system startup, commissioning, testing, and issue resolution.",
    hero: {
      badge: "COMMISSIONING",
      heading: "Commissioning &\nTroubleShooting",
      description: "Ensuring every installed automation system performs correctly, efficiently, and according to design specifications through professional commissioning, testing, and troubleshooting services.",
      heroImage: "/images/core-business/commissioning/hero.webp",
    },
    about: {
      title: "Delivering Reliable System Startups",
      description: "Successful automation projects require proper commissioning. Our engineers perform comprehensive testing, verification, calibration, and documentation to ensure every system performs as intended before handover.",
      paragraph: "From pre-commissioning checks to full system validation, we ensure your investment delivers from day one.\n\nOur structured commissioning methodology minimizes startup risks and ensures consistent results.",
      image: "/images/core-business/commissioning/about.webp",
      features: [
        { icon: CheckCircle2, title: "System Verification" },
        { icon: Activity, title: "Performance Testing" },
        { icon: Search, title: "Fault Troubleshooting" },
        { icon: ClipboardCheck, title: "Operational Handover" },
      ],
    },
    capabilities: [
      { icon: Cpu, title: "PLC Functional Testing", description: "Complete validation of PLC logic, I/O mapping, and sequence control." },
      { icon: Gauge, title: "I/O Verification", description: "Field instrument and I/O point verification for signal integrity." },
      { icon: Activity, title: "Loop Checking", description: "Signal loop verification from field devices to control room." },
      { icon: PlugZap, title: "Instrument Calibration", description: "Sensor and transmitter calibration for accurate process measurement." },
      { icon: BatteryCharging, title: "Motor Function Test", description: "Motor rotation, amperage, and protection testing." },
      { icon: Scale, title: "Site Acceptance Testing (SAT)", description: "On-site acceptance testing to validate integrated system performance." },
      { icon: Layers, title: "System Optimization", description: "Tuning PID loops, timing adjustments, and performance improvements." },
      { icon: Wrench, title: "Troubleshooting Support", description: "On-site and remote diagnosis of system faults and failures." },
    ],
    industries: sharedIndustries,
    benefits: [
      { icon: Rocket, text: "Faster Startup" },
      { icon: Shield, text: "Lower Project Risk" },
      { icon: Activity, text: "Stable Performance" },
      { icon: Search, text: "Quick Problem Solving" },
      { icon: ClipboardCheck, text: "Complete Testing" },
      { icon: TrendingUp, text: "Smooth Handover" },
    ],
    process: sharedProcess,
    featuredProject: {
      image: "/images/core-business/commissioning/featured.webp",
      badge: "FEATURED PROJECT",
      title: "Complete Commissioning for Industrial Water Pumping Station",
      overview: "Full commissioning support for a water pumping station including PLC testing, VSD commissioning, protection verification, and operational handover.",
      challenge: "Complex multi-pump system with VSD control required careful sequencing, protection interlocking, and load balancing during startup.",
      solution: "Performed staged commissioning with individual pump testing, sequence validation, protection verification, and full-load performance testing.",
      result: "Achieved successful first-time startup with all systems operating within specification. Zero rework required during commissioning phase.",
      sidebar: {
        industry: "Water Utilities",
        location: "Bekasi, Indonesia",
        duration: "2 Months",
        scope: "Commissioning, Testing, Handover",
      },
      slug: "booster-pump-upgrade",
    },
  },

  "inverter-vsd": {
    slug: "inverter-vsd",
    navLabel: "Inverter / VSD Implementation",
    navIcon: BarChart2,
    navDescription: "Variable speed drive solutions for industrial motor control.",
    hero: {
      badge: "INVERTER & VSD",
      heading: "Inverter & VSD\nImplementation",
      description: "Improve energy efficiency, motor performance, and process control through properly engineered Variable Speed Drive solutions for industrial applications.",
      heroImage: "/images/core-business/inverter-vsd/hero.webp",
    },
    about: {
      title: "Smarter Motor Control with VSD Technology",
      description: "Our engineers implement inverter solutions that optimize motor operation, reduce electrical consumption, minimize mechanical stress, and improve process flexibility.",
      paragraph: "From selection and sizing to integration and commissioning, we deliver complete VSD solutions that maximize return on investment.\n\nOur approach considers the full motor system including cabling, protection, and harmonic management.",
      image: "/images/core-business/inverter-vsd/about.webp",
      features: [
        { icon: BatteryCharging, title: "Energy Efficiency" },
        { icon: Gauge, title: "Better Motor Control" },
        { icon: Cog, title: "Lower Mechanical Stress" },
        { icon: Workflow, title: "Process Flexibility" },
      ],
    },
    capabilities: [
      { icon: Search, title: "VSD Selection", description: "Proper sizing and selection of drives based on motor and application requirements." },
      { icon: Cpu, title: "Drive Programming", description: "Parameter configuration and application-specific programming." },
      { icon: Gauge, title: "Motor Speed Optimization", description: "Speed and torque control optimization for process applications." },
      { icon: Database, title: "Harmonic Assessment", description: "Assessment and mitigation of harmonic distortion in power systems." },
      { icon: Activity, title: "Energy Performance Analysis", description: "Before-and-after energy consumption analysis and reporting." },
      { icon: Settings, title: "Soft Start Configuration", description: "Alternative soft start solutions for reduced inrush current." },
      { icon: Layers, title: "Existing System Integration", description: "VSD retrofit into existing PLC, SCADA, and MCC systems." },
      { icon: ClipboardCheck, title: "Commissioning & Testing", description: "Complete VSD commissioning with motor performance validation." },
    ],
    industries: sharedIndustries,
    benefits: [
      { icon: Percent, text: "Save Energy" },
      { icon: TrendingUp, text: "Lower Operating Costs" },
      { icon: Clock, text: "Longer Motor Life" },
      { icon: Gauge, text: "Better Process Control" },
      { icon: Activity, text: "Increase Efficiency" },
      { icon: Shield, text: "Sustainable Operation" },
    ],
    process: sharedProcess,
    featuredProject: {
      image: "/images/core-business/inverter-vsd/featured.webp",
      badge: "FEATURED PROJECT",
      title: "Booster Pump VSD Upgrade for Commercial Water Supply System",
      overview: "Retrofitted existing constant-speed booster pumps with VSD control to improve water pressure stability and reduce energy consumption.",
      challenge: "The commercial building experienced inconsistent water pressure during peak hours and high electricity bills from continuously running constant-speed pumps.",
      solution: "Installed VSD on each booster pump with PID pressure control, auto-changeover logic, and centralized HMI monitoring.",
      result: "Achieved 35% energy savings, consistent water pressure across all floors, and extended pump lifespan by reducing mechanical stress.",
      sidebar: {
        industry: "Building Utilities",
        location: "Jakarta, Indonesia",
        duration: "6 Weeks",
        scope: "VSD Supply, Integration, Commissioning",
      },
      slug: "booster-pump-upgrade",
    },
  },

  "upgrade-retrofit": {
    slug: "upgrade-retrofit",
    navLabel: "Upgrade, Retrofit & Optimization",
    navIcon: RefreshCw,
    navDescription: "System modernization and performance optimization for existing installations.",
    hero: {
      badge: "UPGRADE & RETROFIT",
      heading: "Upgrade, Retrofit &\nOptimization",
      description: "Modernize and optimize your existing industrial systems to improve performance, extend equipment life, enhance safety, and reduce operational costs without full system replacement.",
      heroImage: "/images/core-business/upgrade-retrofit/hero.webp",
    },
    about: {
      title: "Modernizing Existing Systems for Better Performance",
      description: "Not every improvement requires a complete overhaul. Our upgrade and retrofit services help you maximize the value of existing equipment through targeted modernization.",
      paragraph: "We assess your current systems, identify improvement opportunities, and implement upgrades that deliver measurable performance gains.\n\nFrom obsolete PLC migration to control system upgrades, we ensure minimal disruption during the transition process.",
      image: "/images/core-business/upgrade-retrofit/about.webp",
      features: [
        { icon: RefreshCw, title: "System Modernization" },
        { icon: TrendingUp, title: "Performance Improvement" },
        { icon: Shield, title: "Safety Enhancement" },
        { icon: Clock, title: "Extended Equipment Life" },
      ],
    },
    capabilities: [
      { icon: Cpu, title: "PLC Migration", description: "Migration from obsolete PLC platforms to modern controllers." },
      { icon: Monitor, title: "HMI & SCADA Upgrade", description: "Modernize visualization and monitoring with latest software platforms." },
      { icon: CircuitBoard, title: "Panel Retrofit", description: "Upgrade existing panels with modern components and layout." },
      { icon: Gauge, title: "Drive Replacement", description: "Replace obsolete drives with energy-efficient modern alternatives." },
      { icon: Network, title: "Communication Upgrade", description: "Migrate legacy protocols to modern industrial Ethernet networks." },
      { icon: Power, title: "Power System Upgrade", description: "Upgrade power distribution, protection, and metering systems." },
      { icon: FileText, title: "Documentation Update", description: "Update as-built drawings, manuals, and operational procedures." },
      { icon: Wrench, title: "System Optimization", description: "Fine-tune existing systems for improved efficiency and performance." },
    ],
    industries: sharedIndustries,
    benefits: [
      { icon: Percent, text: "Lower Upgrade Cost vs Full Replacement" },
      { icon: Clock, text: "Extended Equipment Lifespan" },
      { icon: TrendingUp, text: "Improved System Performance" },
      { icon: Shield, text: "Enhanced Safety Compliance" },
      { icon: Timer, text: "Minimal Production Disruption" },
      { icon: Lightbulb, text: "Future-Ready Technology" },
    ],
    process: sharedProcess,
    featuredProject: {
      image: "/images/core-business/upgrade-retrofit/featured.webp",
      badge: "FEATURED PROJECT",
      title: "PLC and Control System Retrofit for Conveyor Line",
      overview: "Modernized an aging conveyor control system by replacing obsolete PLC and adding VSD control for improved speed regulation and reliability.",
      challenge: "The existing conveyor system used discontinued PLC hardware with no spare parts availability, causing extended downtime during failures.",
      solution: "Migrated the control logic to a modern PLC platform, replaced obsolete motor starters with VSD, and added HMI for operator visibility.",
      result: "Eliminated spare parts dependency, reduced downtime by 70%, and improved conveyor speed consistency by 40%.",
      sidebar: {
        industry: "Manufacturing",
        location: "Cikarang, Indonesia",
        duration: "3 Months",
        scope: "Assessment, Design, Migration, Commissioning",
      },
      slug: "conveyor-system-automation",
    },
  },
};

// ── Navigation list (order matters for the nav bar) ───────────────────────────

export const coreBusinessNavItems = [
  businessPages["electrical-control"],
  businessPages["panel-manufacturing"],
  businessPages["technical-service"],
  businessPages["commissioning"],
  businessPages["inverter-vsd"],
  businessPages["upgrade-retrofit"],
];
