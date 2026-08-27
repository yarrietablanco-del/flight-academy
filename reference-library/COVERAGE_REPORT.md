# Verified Reference Coverage Report

Review date: 2026-08-27.

`VERIFIED` means that an official, cycle-specific source was acquired, inspected, and mapped to a concrete teaching sequence. It does not authorize republication of the source. `PARTIAL` means that a trustworthy source exists but a variant, UI state, or teaching reference still needs verification. `MISSING` means it is not safe to migrate the competency to Operational Competency Standard 1.1.

## KABQ training chart set -- FAA d-TPP 2608

Airport: Albuquerque International Sunport (`KABQ` / `ABQ`). Effective 2026-08-06 through 2026-09-03. The official FAA d-TPP 2608 metafile identifies all five cached PDFs as KABQ publications. Originals remain only in the ignored research cache.

| Competency | Status | Verified reference | Teaching use now established |
| --- | --- | --- | --- |
| Airport Diagram | VERIFIED | `00012AD.PDF` -- KABQ Airport Diagram | A guided reading can locate airport ID, runways 03/21, 08/26 and 12/30, taxiways, intersections, ramps, hotspots, hold-short points, frequencies, and a complete taxi route. |
| ATC Taxi | VERIFIED | `00012AD.PDF` -- KABQ Airport Diagram | Build a guided clearance and a different transfer route using named taxiways, runway-holding positions, hotspots, and the runway-crossing caution. |
| SID/STAR | VERIFIED | `00012ADYOS.PDF` -- ADYOS THREE (RNAV); `00012SNDIA.PDF` -- SNDIA FOUR (RNAV) | Teach chart identity, runway/transition selection, fixes, tracks, altitude/speed restrictions, notes, and continuity from departure to arrival/approach. ADYOS is a chart-reading example only where its aircraft applicability excludes the learner aircraft. |
| Approach Charts | VERIFIED | `00012IL8.PDF` -- ILS OR LOC RWY 08; `00012RY8.PDF` -- RNAV (GPS) Y RWY 08 | The paired same-runway procedures support complete-chart orientation: title/frequencies, plan view, profile, minima, missed approach, then a transfer comparison. |
| ILS/RNAV | VERIFIED | `00012IL8.PDF`; `00012RY8.PDF` | Compare the same runway's localizer/glideslope path against the RNAV glidepath/fix-based path without inventing an operational procedure. |
| EFB | PARTIAL | MSFS 2024 EFB API | Official or faithfully verifiable UI states are still required for route planning and result checking. |
| VOR/DME | PARTIAL | Garmin NXi Nav III | The exact MSFS 2024 C172 avionics variant still needs confirmation. |
| G1000 GPS | PARTIAL | Garmin NXi Nav III | Confirm the in-sim variant and obtain faithful FPL, CDI, and Direct-To states. |
| G1000 autopilot | PARTIAL | Garmin NXi Nav III | Confirm the in-sim variant and vertical-mode annunciations. |
| A320 cockpit | PARTIAL | Official A320neo V2 manual | Extract verified cockpit/overhead coverage for the locked aircraft variant. |
| A320 displays/FCU | PARTIAL | Official A320neo V2 manual | Verify PFD, ND, ECAM, and FCU states with source-specific references. |
| A320 MCDU/performance | PARTIAL | Official A320neo V2 manual and QRC | Verify pages, fields, and performance data flow without invented values. |
| A320 Cold & Dark | PARTIAL | Official A320neo V2 manual and QRC | Verify power, overhead, APU, and expected states. |
| A320 Push/Start/Taxi | PARTIAL | Official A320neo V2 manual and QRC | Verify pushback, engine-start, and taxi guidance. |
| A320 SID/Climb/Cruise | PARTIAL | Official A320neo V2 manual and QRC | Verify performance, modes, and navigation states. |
| A320 STAR/Approach | PARTIAL | Official A320neo V2 manual; KABQ set | KABQ chart coverage is ready; source-verified cockpit execution remains necessary. |
| A320 Landing/Gate/Shutdown | PARTIAL | Official A320neo V2 manual and QRC | Verify landing, gate, and shutdown references. |

## Derived-training-asset strategy

For every KABQ chart, preserve the official chart as the research reference and create only original instructional overlays later: (1) full-chart orientation, (2) one highlighted region, (3) readable zoom, (4) annotation describing what is visible and what it means, and (5) MSFS action/result. The overlay must cite the FAA chart ID, cycle, and effective dates; it must not replace the chart with a generic schematic or publish the cached PDF without a separately confirmed redistribution decision.

## Redistribution decision

The source PDFs are marked `RESEARCH_CACHE_ONLY` in the manifest and live under `reference-library/source-cache/`, which is gitignored. Their direct redistribution status has not been asserted. No FAA PDF, manual, screenshot, or other third-party source asset has been added to the public site.
