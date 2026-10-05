# Castelzor Flow Study

A scroll-driven report about a fictional, ambient-storage prescription medicine moving from completed manufacturing to pharmacy availability. It follows a representative lot through five distribution stages while keeping the figures explicitly framed as cohort averages.

## Run locally

Requires a Node.js release supported by the installed Vite version (Node 20.19+ or 22.12+; Node 26 is also supported).

```sh
npm install
npm run dev
```

Vite prints the local URL, usually `http://localhost:5173/`.

## Verify and build

```sh
npm run build
npm run preview
```

The Vue 3 + TypeScript + Vite app uses local typed data and has no backend or shipment-tracking integration. The Vue - Official VS Code extension provides Vue language support.

## Data and limitations

All names and values are fictional and illustrative. The quarterly cohort contains 1,000 lots; its 6.8-day mean is compared with a simplified 3.0-day planning reference. Five mutually exclusive stage contributions sum to a 3.8-day mean gap. Lot-days describe flow exposure, not money, waste, patient outcomes, or guaranteed sales. The 90-day pilot scenario assumes, but does not claim, a one-day average reduction in regional distributor verification delay.

See [docs/context.md](docs/context.md), [docs/data-method.md](docs/data-method.md), and [docs/decisions.md](docs/decisions.md) for definitions and implementation notes. The project brief is [BRIEF.md](BRIEF.md).
# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
