# Frontend Redesign — Feedback Tracker

Status values: **Open**, **In progress**, **Addressed in V4**, **Verified**.

| ID | Feedback item | Status | Next step |
|---|---|---|---|
| F-01 | Preserve the dark palette and gold accent | Addressed in V4 | Standardize React tokens |
| F-02 | Correct Direct Play/Direct Stream/Transcode colors | Addressed in V4 | Verify all cards/charts |
| F-03 | Replace external artwork/avatar URLs | Open | Use Tautulli image proxy |
| F-04 | Add responsive mobile/tablet behavior | Addressed in V4 | Test at breakpoints |
| F-05 | Align detail layout with device/stream/network groups | Open | Revise advanced/popover state |
| F-06 | Define card popover and terminate interaction | Open | Add interaction mock |
| F-07 | Add loading, empty, error, and offline states | Addressed in V4 | Review state gallery and wire to API states |
| F-08 | Add section collapse controls | Open | Add to section headers |
| F-09 | Improve accessibility semantics and focus states | In progress | Audit interactive elements |
| F-10 | Use configured refresh interval and final terminology | Open | Connect to API/settings |
| F-11 | Replace placeholder routes and hard-coded data | Open | Map to typed API fixtures |
| F-12 | Keep legacy default interface untouched | Addressed in V4 | Preserve during implementation |
| F-13 | Maintain readable stream-decision labels over artwork | Addressed in V4 | Validate against varied artwork |
| F-14 | Make per-library top-media cards scale cleanly with few or many libraries | In progress | Design adaptive card collection layout; library overview table is not the intended solution |

V4 is intentionally a design-language pass. “Addressed” means the mock now
expresses the intended direction; it does not yet mean the production React
implementation is complete.
