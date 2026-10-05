<script setup lang="ts">
import { computed, ref } from 'vue'
import { stages, story } from './data/storyData'
import { useActiveChapter } from './composables/useActiveChapter'

const pilotEnabled = ref(false)
const activeChapter = useActiveChapter()
const stageDelays = computed(() =>
  stages.map((stage) =>
    pilotEnabled.value && stage.id === 'regional'
      ? stage.delayDays - story.pilotAssumedReductionDays
      : stage.delayDays,
  ),
)
const totalDelay = computed(() => stageDelays.value.reduce((sum, delay) => sum + delay, 0))
const currentTotal = computed(() => story.planningDays + stages.reduce((sum, stage) => sum + stage.delayDays, 0))
const modeledTotal = computed(() => story.planningDays + totalDelay.value)
const chartMaximum = computed(() => Math.max(...stageDelays.value))
const largestStageIndex = computed(() => stageDelays.value.indexOf(chartMaximum.value))
const chartFootnote = computed(() =>
  pilotEnabled.value
    ? `${stages[largestStageIndex.value].shortLabel} is the largest remaining modeled contribution at ${formatDays(chartMaximum.value)} days. Regional verification is modeled at ${formatDays(stageDelays.value[3])} days.`
    : `Regional distributor contributes ${formatDays(stageDelays.value[3])} days, about ${Math.round((stageDelays.value[3] / totalDelay.value) * 100)}% of the ${formatDays(totalDelay.value)}-day gap. Other stages still account for ${formatDays(totalDelay.value - stageDelays.value[3])} days.`,
)
const activeStageIndex = computed(() =>
  Math.min(Math.max(activeChapter.value - 1, 0), stages.length - 1),
)
const activeStage = computed(() => stages[activeStageIndex.value])
const activeContribution = computed(() =>
  activeChapter.value > 0 && activeChapter.value <= stages.length
    ? stageDelays.value[activeChapter.value - 1]
    : 0,
)
const cumulativeDelay = computed(() =>
  stageDelays.value
    .slice(0, Math.min(activeChapter.value, stages.length))
    .reduce((sum, delay) => sum + delay, 0),
)
const routePoints = [
  { x: 104, y: 110 },
  { x: 250, y: 76 },
  { x: 470, y: 116 },
  { x: 438, y: 276 },
  { x: 176, y: 282 },
]

function formatDays(value: number) {
  return value.toFixed(1)
}
</script>

<template>
  <div class="report-shell" id="top">
    <header class="masthead">
      <a class="wordmark" href="#top" aria-label="Castelzor distribution report, back to top">
        <span class="wordmark-mark" aria-hidden="true">C</span>
        <span>CASTELZOR <span class="wordmark-divider">/</span> FLOW STUDY</span>
      </a>
      <span class="report-meta">OPERATIONS BRIEF <span>·</span> 01 / 05</span>
      <a class="masthead-link" href="#decision">The decision <span aria-hidden="true">↓</span></a>
    </header>

    <main>
      <section class="lead" aria-labelledby="report-title">
        <div class="lead-copy">
          <p class="eyebrow"><span class="eyebrow-line"></span> FICTIONAL QUARTERLY COHORT · 1,000 LOTS</p>
          <h1 id="report-title">Castelzor reaches pharmacies <em>{{ formatDays(totalDelay) }} days later</em> than planned.</h1>
          <p class="lead-deck">The biggest single hold is a verification handoff, not a truck in transit.</p>
        </div>
        <div class="lead-figure" :aria-label="`${formatDays(currentTotal)} mean days actual compared with ${formatDays(story.planningDays)} planning days`">
          <div class="lead-figure-top"><span>MEAN TIME TO AVAILABILITY</span><span>COHORT AVG.</span></div>
          <div class="lead-numbers"><strong>{{ formatDays(currentTotal) }}</strong><span class="lead-unit">days</span><span class="lead-versus">vs.</span><strong class="reference-number">{{ formatDays(story.planningDays) }}</strong></div>
          <div class="lead-figure-bottom"><span>ACTUAL, ILLUSTRATIVE</span><span>PLANNING REFERENCE</span></div>
          <div class="lead-track" aria-hidden="true"><span></span><i :style="{ left: `${(story.planningDays / currentTotal) * 100}%` }"></i></div>
        </div>
        <p class="fictional-note"><span aria-hidden="true">i</span> Castelzor and all figures in this report are fictional and illustrative; this is not validated industry research.</p>
      </section>

      <nav class="chapter-nav" aria-label="Report chapters">
        <span class="chapter-nav-label">FOLLOW THE LOT</span>
        <a href="#opening" :aria-current="activeChapter === 0 ? 'step' : undefined">Start</a>
        <a v-for="(stage, index) in stages" :key="stage.id" :href="`#${stage.id}`" :aria-current="activeChapter === index + 1 ? 'step' : undefined">{{ stage.navLabel }}</a>
        <a href="#decision" :aria-current="activeChapter === 6 ? 'step' : undefined">Decision</a>
      </nav>

      <div class="story-layout">
        <aside class="journey-panel" aria-label="Representative lot journey and active chapter metrics">
          <div class="journey-heading">
            <div><p class="eyebrow">LOT 001 · REPRESENTATIVE GUIDE</p><h2>A lot on the move</h2></div>
            <span class="guide-mark" aria-hidden="true">THE ROUTE</span>
          </div>
          <p class="journey-description">Follow one illustrated shipment through five handoffs. It is a visual guide, not a tracked lot; the measures describe the full cohort.</p>
          <div class="route-wrap">
            <svg class="route-map" viewBox="0 0 600 380" role="img" aria-labelledby="route-title route-desc">
              <title id="route-title">An illustrated Castelzor lot shipment journey</title>
              <desc id="route-desc">A cartoon medicine carton moves through manufacturing release, manufacturer outbound, wholesaler, regional distributor, and pharmacy receiving. A solid purple line shows movement; dotted rings mark confirmation waits.</desc>
              <path class="route-bed" d="M104 110 C150 47 203 46 250 76 S393 132 470 116 C519 139 497 232 438 276 S259 312 176 282" />
              <path :class="['route-progress', { 'is-alert': activeChapter === 4 } ]" pathLength="100" :style="{ strokeDasharray: `${(activeStageIndex / 4) * 100} 100` }" d="M104 110 C150 47 203 46 250 76 S393 132 470 116 C519 139 497 232 438 276 S259 312 176 282" />

              <g v-for="(stage, index) in stages" :key="stage.id" :class="['route-stop', { 'is-active': index === activeStageIndex, 'is-bottleneck': stage.id === 'regional' }]" :transform="`translate(${routePoints[index].x} ${routePoints[index].y})`">
                <circle class="wait-ring" r="31" />
                <circle class="node-outer" r="7" />
                <circle class="node-inner" r="2.5" />
                <text class="route-index" :y="index < 3 ? -43 : 48" text-anchor="middle">0{{ index + 1 }}</text>
                <text class="route-label" :y="index < 3 ? 43 : 63" text-anchor="middle">{{ stage.routeLabel }}</text>
                <text class="wait-label" :x="index < 3 ? 26 : 28" :y="index < 3 ? -20 : -18">WAIT</text>
              </g>

              <g class="station-art station-factory" transform="translate(104 48)" aria-hidden="true">
                <path class="art-shadow" d="M-37 32h74v5h-74z" />
                <path class="art-paper" d="M-31 1h62v31h-62z" />
                <path class="art-purple" d="M-31 1v-14l17 8v-8l17 8v-8l28 13v9z" />
                <path class="art-window" d="M-22 11h9v9h-9zm18 0h9v9h-9zm18 0h9v9h-9z" />
                <path class="art-line" d="M-22 26h44" />
              </g>
              <g class="station-art station-truck" transform="translate(250 34)" aria-hidden="true">
                <path class="art-purple" d="M-39 1h46v27h-46z" />
                <path class="art-paper" d="M7 9h18l12 11v8H7z" />
                <path class="art-window" d="M13 13h10l7 7H13z" />
                <circle class="art-wheel" cx="-24" cy="30" r="6" /><circle class="art-wheel" cx="25" cy="30" r="6" />
                <path class="art-line" d="M-31 9h29m-29 7h22" />
              </g>
              <g class="station-art station-wholesaler" transform="translate(470 53)" aria-hidden="true">
                <path class="art-paper" d="M-35 0h70v44h-70z" />
                <path class="art-purple" d="M-39 0 0-20 39 0z" />
                <path class="art-line" d="M-25 8h50m-50 12h50m-50 12h50" />
                <path class="art-purple" d="M-18 5h6v9h-6zm15 0h6v9h-6zm15 0h6v9h-6zM-18 21h6v9h-6zm15 0h6v9h-6zm15 0h6v9h-6z" />
              </g>
              <g :class="['station-art', 'station-regional', { 'is-alert': activeChapter === 4 }]" transform="translate(438 222)" aria-hidden="true">
                <path class="art-paper" d="M-37 1h74v43h-74z" />
                <path class="art-purple" d="M-42 1 0-20 42 1z" />
                <path class="art-window" d="M-28 12h15v21h-15zm24 0h15v21H-4zm24 0h9v21h-9z" />
                <path class="art-line" d="M-35 39h70" />
                <path class="art-paper" d="M14-33h20v27H14z" />
                <path class="art-purple" d="M18-27h12m-12 6h12m-12 6h8" />
              </g>
              <g class="station-art station-pharmacy" transform="translate(176 229)" aria-hidden="true">
                <path class="art-paper" d="M-35 4h70v42h-70z" />
                <path class="art-purple" d="M-40 4 0-18 40 4z" />
                <path class="art-window" d="M-24 14h19v20h-19zm30 0h18v20H6z" />
                <path class="art-purple" d="M-5 23h10v7H-5zm1-9h8v5h-8z" />
                <path class="art-line" d="M-31 40h62" />
              </g>

              <g :class="['lot-marker', { 'is-alert': activeChapter === 4 }]" :transform="`translate(${routePoints[activeStageIndex].x} ${routePoints[activeStageIndex].y - 4})`" aria-label="Representative Castelzor medicine lot">
                <ellipse class="parcel-shadow" cx="0" cy="36" rx="27" ry="6" />
                <path class="parcel-feet" d="M-14 24v8m28-8v8" />
                <path class="parcel-body" d="M-24-22 0-34 24-22v45h-48z" />
                <path class="parcel-top" d="M-24-22 0-10l24-12M0-10v45" />
                <path class="parcel-label" d="M-17-3h13v15h-13z" />
                <path class="parcel-mark" d="M-13 4h5m-2-3v7" />
                <circle class="parcel-eye" cx="9" cy="1" r="1.8" /><circle class="parcel-eye" cx="17" cy="1" r="1.8" />
                <path class="parcel-smile" d="M10 8q3 4 6 0" />
                <text class="parcel-id" x="0" y="20" text-anchor="middle">CZ 01</text>
              </g>
            </svg>
          </div>
          <div class="route-legend"><span><i class="legend-line"></i> ON THE MOVE</span><span><i class="legend-dots"></i> WAITING FOR CONFIRMATION</span></div>
          <div class="active-readout" aria-live="polite" aria-atomic="true">
            <div class="readout-title"><span class="readout-dot"></span><span>{{ activeChapter === 0 ? 'JOURNEY OVERVIEW' : activeChapter === 6 ? 'ALL FIVE STAGES' : `STEP 0${activeChapter} · ${activeStage.shortLabel.toUpperCase()}` }}</span></div>
            <div class="readout-numbers">
              <div><span>THIS STAGE</span><strong>{{ activeChapter > 0 && activeChapter <= 5 ? `+${formatDays(activeContribution)} d` : '—' }}</strong></div>
              <div><span>GAP ACCUMULATED</span><strong>{{ formatDays(cumulativeDelay) }} <small>/ {{ formatDays(totalDelay) }} d</small></strong></div>
            </div>
          </div>
          <p class="journey-footnote">Stage averages add to the cohort-average gap by construction; no individual lot is assumed to experience every average delay.</p>
        </aside>

        <div class="chapters">
          <section id="opening" :class="['chapter', 'opening-chapter', { 'is-active': activeChapter === 0 }]" data-chapter-index="0" aria-labelledby="opening-title">
            <div class="chapter-marker"><span>THE JOURNEY</span><span>00 / 05</span></div>
            <h2 id="opening-title">From completed production to pharmacy-ready.</h2>
            <p class="chapter-intro">The clock starts when manufacturing is complete and stops when the pharmacy marks product <strong>available for dispensing</strong>. The {{ formatDays(story.planningDays) }}-day planning reference is a simplified fictional benchmark, not a contract or a validated best-case transit time.</p>
            <div class="availability-definition"><span class="definition-icon" aria-hidden="true">↳</span><p><strong>Available for dispensing</strong><br />Received, reconciled, and marked ready in the pharmacy’s operating workflow.</p></div>
            <div class="cohort-strip"><strong>1,000</strong><span>fictional lots in one quarterly cohort</span><span class="strip-rule"></span><strong>{{ formatDays(totalDelay) }} d</strong><span>mean gap across five stages</span></div>
          </section>

          <section v-for="(stage, index) in stages" :id="stage.id" :key="stage.id" :class="['chapter', 'stage-chapter', { 'is-active': activeChapter === index + 1, 'is-bottleneck': stage.id === 'regional' }]" :data-chapter-index="index + 1" :aria-labelledby="`${stage.id}-title`">
            <div class="chapter-marker"><span>{{ stage.chapterLabel }}</span><span>0{{ index + 1 }} / 05</span></div>
            <div class="stage-heading"><div class="stage-number-wrap"><span class="stage-index">0{{ index + 1 }}</span><svg v-if="stage.id === 'regional'" class="stage-alert-icon" viewBox="0 0 24 24" role="img" aria-label="Largest delay warning"><path class="alert-triangle" d="M12 3 22 21H2L12 3Z"/><path class="alert-mark" d="M12 9v5m0 3h.01"/></svg></div><div><p class="eyebrow">{{ stage.kicker }}</p><h2 :id="`${stage.id}-title`">{{ stage.title }}</h2></div></div>
            <p class="stage-summary">{{ stage.summary }}</p>
            <div class="stage-evidence">
              <div class="evidence-number"><strong>+{{ formatDays(stageDelays[index]) }}</strong><span>days per lot<br />on average</span></div>
              <div class="evidence-copy"><span class="evidence-label">COHORT EXPOSURE</span><p><strong>{{ (stageDelays[index] * story.lotCount).toLocaleString() }} incremental lot-days</strong> across {{ story.lotCount.toLocaleString() }} lots</p></div>
            </div>
            <div class="stage-notes"><div><span class="note-label">WHY IT MATTERS</span><p>{{ stage.impact }}</p></div><div><span class="note-label">POTENTIAL FIX</span><p>{{ stage.intervention }}</p></div></div>

            <div v-if="stage.id === 'regional'" class="contribution-chart" aria-labelledby="chart-title">
              <div class="chart-heading"><div><p class="eyebrow">WHERE THE GAP BUILDS</p><h3 id="chart-title">Five delays. One clear first test.</h3></div><span>MEAN DAYS / LOT</span></div>
              <ol class="bar-list">
                <li v-for="(chartStage, chartIndex) in stages" :key="chartStage.id" :class="{ 'bar-largest': chartIndex === largestStageIndex }">
                  <span class="bar-name">{{ chartStage.shortLabel }}<b v-if="chartIndex === largestStageIndex">LARGEST</b></span>
                  <span class="bar-track"><span class="bar-fill" :style="{ width: `${(stageDelays[chartIndex] / chartMaximum) * 100}%` }"></span></span>
                  <strong class="bar-value">{{ formatDays(stageDelays[chartIndex]) }}</strong>
                </li>
              </ol>
              <p class="chart-foot">{{ chartFootnote }}</p>
            </div>
          </section>

          <section id="decision" :class="['chapter', 'decision-chapter', { 'is-active': activeChapter === 6 }]" data-chapter-index="6" aria-labelledby="decision-title">
            <div class="chapter-marker"><span>THE FIRST TEST</span><span>06 / 06</span></div>
            <p class="eyebrow">A 90-DAY PILOT, ONE HIGH-VOLUME DISTRIBUTOR</p>
            <h2 id="decision-title">Test the verification handoff first.</h2>
            <p class="decision-intro">Run an electronic verification workflow with a routed exception queue, supported by a controlled baseline. The regional distributor is the clearest first test because it contributes the largest single share of avoidable time, not because other stages are solved.</p>

            <div class="scenario-box">
              <div class="scenario-topline"><div><p class="eyebrow">SCENARIO EXPLORER</p><h3>What if verification gives back one day?</h3></div><button class="scenario-switch" type="button" role="switch" :aria-checked="pilotEnabled" :aria-label="`Pilot scenario ${pilotEnabled ? 'on' : 'off'}`" @click="pilotEnabled = !pilotEnabled"><span class="switch-track"><span></span></span><span>{{ pilotEnabled ? 'PILOT SCENARIO' : 'CURRENT STATE' }}</span></button></div>
              <p class="scenario-assumption">Illustrative modeled scenario: assumes an average {{ story.pilotAssumedReductionDays.toFixed(1) }} day removed from the distributor’s {{ stages[3].delayDays.toFixed(1) }}-day contribution. Not an observed effect or promise.</p>
              <div class="scenario-metrics" aria-live="polite" aria-atomic="true">
                <div><span>END-TO-END MEAN</span><strong>{{ formatDays(modeledTotal) }} <small>days</small></strong><em>{{ pilotEnabled ? `−${story.pilotAssumedReductionDays.toFixed(1)} day modeled` : 'current illustrative cohort' }}</em></div>
                <div><span>DISTRIBUTOR CONTRIBUTION</span><strong>{{ formatDays(stageDelays[3]) }} <small>days</small></strong><em>{{ pilotEnabled ? `−${story.pilotAssumedReductionDays.toFixed(1)} day assumed` : 'largest single hold' }}</em></div>
                <div><span>GAP VS. PLANNING</span><strong>{{ formatDays(totalDelay) }} <small>days</small></strong><em>planning reference: 3.0 days</em></div>
              </div>
              <div class="scenario-rail" aria-hidden="true"><span :style="{ width: `${(modeledTotal / currentTotal) * 100}%` }"></span></div>
              <div class="rail-labels"><span>0 days</span><span>planning ref. {{ formatDays(story.planningDays) }}</span><span>current {{ formatDays(currentTotal) }}</span></div>
            </div>

            <div class="pilot-plan">
              <h3>Make the result decision-grade.</h3>
              <dl>
                <div><dt>Measure</dt><dd>Mean verification time per lot; share needing manual records; end-to-end availability time; exception-resolution time.</dd></div>
                <div><dt>Owners</dt><dd>Supply-chain owner and distributor operations partner.</dd></div>
                <div><dt>Review</dt><dd>Set a baseline before launch; review measured results and implementation effort at day 90 before any expansion decision.</dd></div>
              </dl>
            </div>
            <a class="back-top" href="#top"><span aria-hidden="true">↑</span> Back to the finding</a>
          </section>
        </div>
      </div>
    </main>

    <footer class="report-footer">
      <div><span class="wordmark-mark" aria-hidden="true">C</span><span>CASTELZOR FLOW STUDY</span></div>
      <p>Fictional case study. Synthetic numbers are illustrative, not validated operational or industry research.</p>
      <a href="#methodology">Methodology ↓</a>
      <div id="methodology" class="footer-method">Lot-days are lots multiplied by mean incremental delay; they are not dollars saved, waste, or guaranteed sales. Delay contributions use mutually exclusive stage assignments and sum to the cohort-average 3.8-day gap. No patient outcomes or product-safety claims are made.</div>
    </footer>
  </div>
</template>
