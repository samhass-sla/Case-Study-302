export interface StoryStage {
  id: string
  navLabel: string
  routeLabel: string
  shortLabel: string
  chapterLabel: string
  kicker: string
  title: string
  delayDays: number
  summary: string
  impact: string
  intervention: string
}

export const story = {
  lotCount: 1000,
  planningDays: 3.0,
  pilotAssumedReductionDays: 1.0,
}

export const stages: StoryStage[] = [
  {
    id: 'release',
    navLabel: 'Release',
    routeLabel: 'RELEASE',
    shortLabel: 'Manufacturing release',
    chapterLabel: 'MANUFACTURING RELEASE',
    kicker: 'COMPLETED PRODUCTION, PENDING RECONCILIATION',
    title: 'Ready to ship is not cleared to ship.',
    delayDays: 0.7,
    summary: 'Quality-release documents are reconciled across disconnected systems before the outbound handoff can proceed.',
    impact: 'Product waits for authorization after manufacturing is complete: about 700 incremental lot-days across the cohort.',
    intervention: 'Use a shared digital release checklist, visible status, and clear exception ownership.',
  },
  {
    id: 'outbound',
    navLabel: 'Outbound',
    routeLabel: 'OUTBOUND',
    shortLabel: 'Manufacturer outbound',
    chapterLabel: 'MANUFACTURER OUTBOUND',
    kicker: 'HANDOFF SCANS AND APPOINTMENTS',
    title: 'A missed window ripples downstream.',
    delayDays: 0.4,
    summary: 'Manual handoff scans and transport appointment coordination can push a ready lot past its planned dispatch window.',
    impact: 'Dispatch variability makes arrival timing harder for the next operator to plan: about 400 incremental lot-days.',
    intervention: 'Coordinate appointments and capture electronic handoff events.',
  },
  {
    id: 'wholesaler',
    navLabel: 'Wholesaler',
    routeLabel: 'WHOLESALER',
    shortLabel: 'Wholesaler',
    chapterLabel: 'WHOLESALER',
    kicker: 'ALLOCATION FOLLOWS THE ORDER',
    title: 'Inventory exists; assignment lags.',
    delayDays: 0.8,
    summary: 'Allocation confirmation follows incoming orders rather than reflecting timely available inventory.',
    impact: 'Lots wait to be assigned and onward inventory becomes harder to forecast: about 800 incremental lot-days.',
    intervention: 'Share allocation status and send electronic order and availability updates.',
  },
  {
    id: 'regional',
    navLabel: 'Regional',
    routeLabel: 'REGIONAL',
    shortLabel: 'Regional distributor',
    chapterLabel: 'REGIONAL DISTRIBUTOR',
    kicker: 'THE LARGEST SINGLE CONTRIBUTION',
    title: 'Manual verification is the biggest hold.',
    delayDays: 1.4,
    summary: 'Some lots need a manual record lookup and verification before onward movement can proceed.',
    impact: 'Exception resolution delays onward movement and pharmacy replenishment; this is the largest single stage contribution in the current state.',
    intervention: 'Pilot electronic product-verification records with a routed exception queue.',
  },
  {
    id: 'pharmacy',
    navLabel: 'Pharmacy',
    routeLabel: 'PHARMACY',
    shortLabel: 'Pharmacy receiving',
    chapterLabel: 'PHARMACY RECEIVING',
    kicker: 'ARRIVAL IS NOT YET AVAILABILITY',
    title: 'On the dock is not on the shelf.',
    delayDays: 0.5,
    summary: 'Limited advance visibility of arriving lots slows receiving reconciliation and stocking.',
    impact: 'Product may have arrived but not yet be marked available for dispensing: about 500 incremental lot-days.',
    intervention: 'Send advance shipment notices and receiving-ready alerts.',
  },
]