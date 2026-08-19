import { projectSchema } from '@/src/interface';
import { parseContent } from '@/src/interface/content';

/**
 * Case studies, migrated from the starter's markdown so the pipeline could be
 * removed. This is template copy, not FathomXO work: every entry is
 * `placeholder: true` and feature 6 replaces it.
 *
 * Field mapping from the markdown: `problem` and `approach` come from the body's
 * `### Challenge` and `### Our Solution` sections, `outcome` from
 * `closingParagraph`, `stack` from `details.services`. `gallery` is empty - the
 * frontmatter's `before` and `after` keys were text bullets for a before/after
 * component, not images, so they are dropped rather than forced into a field
 * that means something else.
 *
 * `serviceSlug` has no source. These projects predate the four service lines,
 * so each is assigned the closest match. Provisional, like the rest of it.
 */
export const projects = parseContent(
  projectSchema,
  [
    {
      slug: 'ai-driven-supply-chain-efficiency',
      title: 'AI-Driven Supply Chain Efficiency',
      summary: 'Reducing delays and improving logistics through real-time predictive analytics.',
      problem:
        'Our client, a global logistics provider, struggled with: - **Reactive operations:** Teams responded to issues after they occurred. - **Static inventory:** Stock levels were not tied to real demand or lead times. - **Blind spots:** Limited view of supplier reliability and carrier performance. - **Fixed routing:** Schedules and routes did not adapt to traffic or demand. - **Cost and waste:** Expedited shipping and excess inventory hurt margins. They wanted real-time visibility and predictive tools to get ahead of problems.',
      approach:
        'We implemented: - **Demand & Disruption Prediction —** Models that forecast demand and flag supply risks early. - **Inventory Optimization —** Right-sized stock by node and product. - **Performance Analytics —** Live scorecards for suppliers and carriers. - **Dynamic Routing & Scheduling —** Optimization that updates with new data and constraints.',
      outcome:
        'Supply chains become resilient when data and AI work together. Predictive analytics surface risks early, while optimization keeps inventory, routing, and capacity aligned with demand—reducing cost and improving delivery.',
      stack: ['AI', 'Supply Chain'],
      serviceSlug: 'ai-agents-automation',
      clientName: 'Global Logistics Inc',
      cover: '/images/opai-img-483.jpg',
      gallery: [],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'ai-ecommerce-smart-shopping',
      title: 'Transforming e-Commerce',
      summary:
        "Nexsas boosted a top online retailer's conversions by 40% with AI-powered recommendations, enhancing shopping experiences and driving revenue growth.",
      problem:
        'Our client, a top-tier e-commerce brand, faced critical challenges: - **Low conversion rates:** Despite high traffic, the website struggled to convert visitors into customers. - **Static pricing models:** Limited flexibility in adapting to market trends and customer demand. - **Lack of insights:** Difficulty in predicting customer behavior to optimize offerings. Implement intelligent solutions that adapt in real time to customer needs and market changes.',
      approach:
        'To address these challenges, we implemented: - **Personalized Suggestions —** AI analyzed behavior to recommend relevant products. - **Dynamic Pricing —** Real-time price adjustments boosted profitability. - **Predictive Insights —** Analytics guided smarter marketing and inventory decisions.',
      outcome:
        "With AI precision, e-commerce platforms now understand every customer's intent and behavior. Product recommendations adapt in real time, marketing campaigns auto-optimize for maximum ROI, and customer interactions feel personal at every touchpoint. The result—higher engagement, stronger conversions, and a seamless shopping experience powered by intelligent automation.",
      stack: ['AI Solutions', 'E-commerce'],
      serviceSlug: 'e-commerce',
      clientName: 'Alex Jonson',
      cover: '/images/opai-img-488.jpg',
      gallery: [],
      date: '2025',
      showHomepage: true,
      placeholder: true,
    },
    {
      slug: 'ai-powered-retail-insights',
      title: 'AI-Powered Retail Insights',
      summary: 'Transforming customer behavior data into smart merchandising decisions.',
      problem:
        'Our client, a national retail chain, struggled with: - **Fragmented data:** Customer signals lived in separate systems and were hard to combine. - **Slow reporting:** By the time reports were ready, the opportunity had often passed. - **Intuition-led decisions:** Buyers and planners relied on experience rather than evidence. - **Poor promotion ROI:** Difficulty measuring which campaigns actually drove sales. They needed a single, AI-powered view of customer behavior to guide merchandising at scale.',
      approach:
        'We delivered: - **Unified Data Platform —** Ingested and normalized behavior data from all touchpoints. - **Predictive Merchandising —** AI recommended which products to feature and where. - **Demand Forecasting —** Models predicted demand by store and category. - **Attribution & Reporting —** Automated dashboards linked campaigns to outcomes.',
      outcome:
        'Retailers now have a single source of truth for customer behavior. Merchandising, marketing, and operations teams align on the same metrics, and every decision is backed by AI-driven insights that improve margins and customer satisfaction.',
      stack: ['AI Analytics', 'Retail'],
      serviceSlug: 'e-commerce',
      clientName: 'Retail Corp',
      cover: '/images/opai-img-480.jpg',
      gallery: [],
      date: '2025',
      showHomepage: true,
      placeholder: true,
    },
    {
      slug: 'automated-ai-customer-support',
      title: 'Automated AI Customer Support',
      summary: 'Delivering faster, context-aware responses through intelligent virtual agents.',
      problem:
        'Our client, a global support organization, dealt with: - **Volume and wait times:** Peak and after-hours demand overwhelmed available agents. - **Generic answers:** Scripts did not use account or interaction history. - **Knowledge gaps:** Information lived in many places and was hard to find. - **Low first-contact resolution:** Many cases required multiple contacts or escalations. - **Rising cost per contact:** Adding agents was not sustainable. They needed AI that could answer in context and escalate smartly.',
      approach:
        'We implemented: - **Context-Aware Virtual Agents —** Bots that use account data and conversation history to personalize replies. - **24/7 Availability —** Automated handling for common questions and simple tasks. - **Smart Escalation —** Clear handoff to humans with full context when the bot cannot resolve. - **Unified Knowledge Base —** One source of truth for both AI and human agents. - **Analytics & Tuning —** Dashboards to improve answers and spot gaps.',
      outcome:
        'Support organizations can now scale without proportionally scaling headcount. AI handles routine, context-aware conversations and escalates intelligently—improving speed, consistency, and satisfaction while freeing agents for complex and high-value interactions.',
      stack: ['AI', 'Customer Experience'],
      serviceSlug: 'ai-agents-automation',
      clientName: 'ServiceFirst Global',
      cover: '/images/opai-img-487.jpg',
      gallery: [],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'autonomous-manufacturing-workflow',
      title: 'Autonomous Manufacturing Workflow',
      summary: 'Streamlining production lines with computer vision and robotic automation.',
      problem:
        'Our client, a precision manufacturer, dealt with: - **Manual inspection:** Quality checks were slow and subjective. - **Reactive maintenance:** Equipment failed before teams could act. - **Rigid schedules:** Production plans could not easily adapt to changes. - **Weak traceability:** Hard to link defects or delays to specific batches or machines. - **Scrap and rework:** Defects often found late in the process. They needed vision, prediction, and automation that fit into existing lines and systems.',
      approach:
        'We implemented: - **In-Line Vision —** Cameras and models that inspect parts and assemblies in real time. - **Predictive Maintenance —** Sensor and log data used to forecast failures and plan maintenance. - **Adaptive Scheduling —** Optimization that considers orders, materials, and machine status. - **Traceability & Digital Twin —** End-to-end lineage and a digital model of the line for simulation.',
      outcome:
        'Manufacturing gains a nervous system: vision systems that see defects, models that predict failures, and workflows that adjust in real time. The result is higher throughput, better quality, and less waste.',
      stack: ['AI', 'Industrial Automation'],
      serviceSlug: 'ai-agents-automation',
      clientName: 'Precision Manufacturing Co',
      cover: '/images/opai-img-485.jpg',
      gallery: [],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'custom-edtech-learning-system',
      title: 'Custom EdTech Learning System',
      summary: 'Tailoring lessons and progress tracking based on individual learning patterns.',
      problem:
        'Our client, an online education provider, faced: - **Static content:** Everyone saw the same sequence regardless of level or need. - **Completion over mastery:** Progress was measured by finishing modules, not by understanding. - **Limited visibility:** Instructors had little insight into who was stuck or bored. - **Generic recommendations:** No systematic way to suggest what to study next. - **Uneven outcomes:** Engagement and completion varied widely across learners. They wanted a platform that could personalize at scale and track real mastery.',
      approach:
        'We delivered: - **Personalized Paths —** Content and sequence adapt to each learner’s level and goals. - **Mastery Tracking —** Progress tied to skills and competencies, not just clicks. - **Instructor Dashboards —** Real-time views of progress, struggle, and engagement. - **Smart Recommendations —** Next best lesson or practice based on performance and gaps. - **Engagement Signals —** Alerts when learners disengage or need support.',
      outcome:
        'EdTech platforms can now offer truly adaptive learning. AI analyzes behavior and performance to tailor content, pace, and support—so every learner gets a path that fits, and educators get the insights they need to intervene and celebrate progress.',
      stack: ['AI', 'EdTech'],
      serviceSlug: 'website-app',
      clientName: 'LearnForward Academy',
      cover: '/images/opai-img-484.jpg',
      gallery: [],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'intelligent-financial-forecasting',
      title: 'Intelligent Financial Forecasting',
      summary: 'Automating revenue predictions and risk analysis with precision-driven AI models.',
      problem:
        'Our client, a financial services firm, dealt with: - **Manual forecasting:** Revenue and demand models lived in spreadsheets. - **Slow scenarios:** New assumptions or stress tests took days to run. - **Stale risk views:** Risk metrics were not updated with market and portfolio changes. - **Siloed assumptions:** Different teams used different drivers and methods. - **Bottlenecks:** Central FP&A could not keep up with ad hoc requests. They needed automated, repeatable forecasting and risk analysis that stayed current and aligned.',
      approach:
        'We delivered: - **Automated Forecasting —** Pipelines that pull data, run models, and publish forecasts. - **Scenario & Stress Testing —** Flexible what-if and stress scenarios on demand. - **Risk Dashboards —** Real-time risk metrics tied to positions and markets. - **Governance & Explainability —** Clear assumptions and audit trails for compliance.',
      outcome:
        'Finance teams can now run forecasts and risk analyses on demand. AI handles the heavy lifting on data and modeling, while humans focus on strategy, assumptions, and communication to stakeholders.',
      stack: ['AI', 'Financial Analytics'],
      serviceSlug: 'ai-agents-automation',
      clientName: 'Summit Finance',
      cover: '/images/opai-img-482.jpg',
      gallery: [],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'smart-city-traffic-management',
      title: 'Smart City Traffic Management',
      summary: 'Predicting congestion and optimizing routes using high-accuracy AI algorithms.',
      problem:
        'Our client, a major city, faced: - **Static signals:** Timing was fixed and did not reflect current conditions. - **Reactive management:** Congestion and incidents were addressed after they happened. - **Siloed data:** Traffic, transit, and emergency services had separate systems. - **No single view:** Hard to see citywide patterns or prioritize interventions. - **Delays for critical services:** First responders and transit were often caught in congestion. They wanted a system that could predict, optimize, and coordinate across agencies.',
      approach:
        'We delivered: - **Adaptive Signal Control —** Timings that respond to live traffic and special events. - **Congestion & Incident Prediction —** Models that forecast trouble spots with lead time. - **Unified Data Platform —** Traffic, transit, and event data in one place for analysis and control. - **Citywide Dashboards —** Real-time and historical views for operations and planning. - **Priority Routing —** Support for emergency and transit priority when needed.',
      outcome:
        'Cities can now treat traffic as a system. AI ingests sensors, cameras, and events to predict congestion and optimize signals and routes—improving flow for commuters, transit, and emergency services alike.',
      stack: ['AI', 'Smart City'],
      serviceSlug: 'website-app',
      clientName: 'City of Metro',
      cover: '/images/opai-img-486.jpg',
      gallery: [],
      date: '2025',
      showHomepage: false,
      placeholder: true,
    },
    {
      slug: 'smart-healthcare-diagnostics',
      title: 'Smart Healthcare Diagnostics',
      summary: 'Leveraging machine learning to detect health risks faster and more accurately.',
      problem:
        'Our client, a healthcare network, faced: - **Backlogs and delays:** Manual review of scans and tests created bottlenecks. - **Missed early signals:** Subtle risk indicators were often caught too late. - **Uneven quality:** Interpretation varied by clinician and location. - **Reactive care:** Focus was on treating illness rather than preventing it. - **Capacity limits:** Staff could not scale to screen every at-risk patient. They needed ML-powered tools that could triage, flag anomalies, and support consistent decisions.',
      approach:
        'We implemented: - **Risk Detection Models —** Trained on validated data to flag anomalies and risk patterns. - **Triage Automation —** Prioritization of cases by urgency and likelihood. - **Explainable Outputs —** Clear reasoning so clinicians can validate and act. - **Integration with Workflows —** Fits into existing PACS, EMR, and lab systems.',
      outcome:
        'Healthcare organizations can now combine imaging, labs, and clinical notes into a single AI-powered view. Risks are identified earlier, triage is smarter, and clinicians are supported—not replaced—by consistent, explainable AI recommendations.',
      stack: ['AI', 'Healthcare'],
      serviceSlug: 'website-app',
      clientName: 'MedTech Partners',
      cover: '/images/opai-img-481.jpg',
      gallery: [],
      date: '2025',
      showHomepage: true,
      placeholder: true,
    },
  ],
  'projects.ts'
);
