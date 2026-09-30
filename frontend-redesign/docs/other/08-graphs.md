# 08 — Graphs & Analytics

## Overview

The Graphs page provides visual analytics of Plex usage over time. Charts are grouped
into three tabs. All charts share global filter controls for time range, metric, and user.

---

## API Endpoints

| Chart | Endpoint |
|-------|---------|
| Plays by date | `GET /get_plays_by_date` |
| Plays by day of week | `GET /get_plays_by_dayofweek` |
| Plays by hour of day | `GET /get_plays_by_hourofday` |
| Plays per month | `GET /get_plays_per_month` |
| Top 10 platforms | `GET /get_plays_by_top_10_platforms` |
| Top 10 users | `GET /get_plays_by_top_10_users` |
| By stream type | `GET /get_plays_by_stream_type` |
| Concurrent streams | `GET /get_concurrent_streams_by_stream_type` |
| By source resolution | `GET /get_plays_by_source_resolution` |
| By stream resolution | `GET /get_plays_by_stream_resolution` |
| Stream type by top users | `GET /get_stream_type_by_top_10_users` |
| Stream type by top platforms | `GET /get_stream_type_by_top_10_platforms` |

---

## Global Controls

These apply to all charts and persist to localStorage.

**User selector (admin only)**
- Multi-select, same as History page
- Default: all users

**Y-axis metric toggle**
- Play Count (default)
- Play Duration

**Days input** (used by most charts except "Plays per month")
- Numeric, default 30, min 1

**Months input** (used by "Plays per month" chart only)
- Numeric, default 12, min 1

---

## Tab 1: Media Type

Charts showing play activity broken down by media type (TV, movies, music).

### Daily Play Count by Media Type
- **Type:** Line chart (multi-series: TV / Movies / Music)
- **X-axis:** Date
- **Y-axis:** Play count or duration
- **Range:** Last N days
- **Interaction:** Clicking a data point opens the history page filtered to that date

### Play Count by Day of Week
- **Type:** Bar chart
- **X-axis:** Mon–Sun
- **Y-axis:** Combined total plays/duration
- **Range:** Last N days

### Play Count by Hour of Day
- **Type:** Bar chart
- **X-axis:** 0–23 (hours)
- **Y-axis:** Combined total plays/duration
- **Range:** Last N days

### Play Count by Top 10 Platforms
- **Type:** Bar chart (horizontal recommended)
- **X-axis:** Platform names
- **Y-axis:** Play count/duration
- **Range:** Last N days

### Play Count by Top 10 Users (admin only)
- **Type:** Bar chart (horizontal recommended)
- **X-axis:** User friendly names
- **Y-axis:** Play count/duration
- **Range:** Last N days

---

## Tab 2: Stream Type

Charts showing play activity broken down by stream decision (direct play / direct stream / transcode).

### Plays by Stream Type Over Time
- **Type:** Line chart (multi-series)
- **Range:** Last N days

### Concurrent Streams by Stream Type
- **Type:** Line chart (multi-series)
- **Range:** Last N days

### Stream Type by Top 10 Users (admin only)
- **Type:** Stacked bar chart (user → DP / DS / TC breakdown)
- **Range:** Last N days

### Stream Type by Top 10 Platforms
- **Type:** Stacked bar chart (platform → DP / DS / TC breakdown)
- **Range:** Last N days

---

## Tab 3: Play Totals

### Plays per Month
- **Type:** Bar chart (multi-series: TV / Movies / Music)
- **X-axis:** Month
- **Y-axis:** Play count/duration
- **Range:** Last N months

### Plays by Source Resolution
- **Type:** Bar chart
- **X-axis:** Resolution (4K, 1080p, 720p, SD, etc.)
- **Y-axis:** Play count/duration
- **Range:** Last N days

### Plays by Stream Resolution
- **Type:** Bar chart
- **X-axis:** Resolution
- **Y-axis:** Play count/duration
- **Range:** Last N days

---

## Chart Library

The current implementation uses **Highcharts**. This is a commercial library — for the
redesign, consider migrating to **Chart.js** or **Apache ECharts**, both of which are
free and actively maintained. ECharts in particular handles the kind of time-series
and categorical charts Tautulli uses very well.

---

## UX Improvements

**Current issues:**
- All charts load simultaneously on page load regardless of which tab is active,
  causing a burst of API requests
- Charts are embedded in full-width rows with minimal breathing room
- No way to download/export a chart image

**Proposed:**
- Lazy-load charts: only fetch data for the active tab. Fetch other tabs on first activation
- Responsive chart sizing: 2-column grid for smaller charts (day-of-week, hour-of-day,
  top platforms, top users) and full-width for time-series charts
- Chart download button (PNG export) via the chart library's built-in export
- Clicking a bar/point on "plays by date" should filter the History page to that date —
  this already exists but should be more prominent (tooltip hint)
- **Add a "vs. previous period" comparison option** — e.g. show last 30 days vs. the
  30 days before that as a secondary line on the daily chart. Very useful for spotting
  trends.
