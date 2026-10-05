# Data and method

## Fictional cohort

All figures are invented for this case study. The reference cohort is 1,000 lots in one fictional quarter. Mean time from completed manufacturing to pharmacy availability is 6.8 days; the simplified planning reference is 3.0 days. Availability means the pharmacy has received and reconciled the product and marked it ready for dispensing.

| Stage | Mean incremental days per lot | Incremental lot-days across 1,000 lots |
| --- | ---: | ---: |
| Manufacturing release | 0.7 | 700 |
| Manufacturer outbound | 0.4 | 400 |
| Wholesaler | 0.8 | 800 |
| Regional distributor | 1.4 | 1,400 |
| Pharmacy receiving | 0.5 | 500 |
| **Total** | **3.8** | **3,800** |

The contributions use one mutually exclusive stage assignment for each delay event and sum to the cohort-average gap by construction: `0.7 + 0.4 + 0.8 + 1.4 + 0.5 = 3.8` days. This does not mean each individual lot experiences every stage average or that individual delays can be added this way.

## Interpretation

Lot-days equal lot count multiplied by mean incremental delay. They describe flow exposure; they are not dollars saved, medication waste, or guaranteed sales. The distributor accounts for about `1.4 / 3.8 = 37%` of the avoidable gap, the largest single contribution; the other four stages still sum to 2.4 days.

## Modeled scenario

The pilot switch assumes a one-day reduction in the distributor's 1.4-day contribution. Other stage values remain unchanged. Under this assumption the distributor contribution is 0.4 days, the total gap is 2.8 days, and end-to-end mean time is `3.0 + 2.8 = 5.8` days. This is an illustrative scenario, not an observed effect, forecast, or promise.
