# AgriShield-AI: Dual-Engine Microclimate Forewarning & Edge-Verified Multimodal IPM Framework

**Problem Statement ID:** SIH26131  
**Theme:** Agriculture, Food Technology & Rural Development  
**Tagline:** Moving Indian Agriculture from Reactive Spraying to Proactive Intelligence.

---

## 🌟 Core Value Proposition

AgriShield-AI solves the **Visual Delay Trap** (where 20%+ crop yield is lost before leaf lesions become visible) through a two-engine architecture:
1. **Engine 1 (Pre-Symptomatic Forewarning):** 7–14 day zero-image risk forecasting using 14-day localized weather time-series (Open-Meteo API) + ISRIC SoilGrids parameters + SHAP interpretability.
2. **Engine 2 (Post-Symptomatic Edge Vision):** Sub-3.5M parameter INT8 quantized model (<5 MB size, <50 ms latency) fusing IP102 & CCMT leaf datasets with climate vectors. Calculates exact Disease Severity Index percentage ($DSI\%$).
3. **Weather-Gated Spray Safety Lock:** Locks chemical advisories if rainfall (>5 mm) or wind (>15 km/h) is predicted in 48 hours to prevent pesticide washout.
4. **Offline Store-and-Forward Engine:** Local caching queue for low-connectivity rural fields.

---

## 🛠️ Technology Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Audio TTS:** Web Speech API (Native Vernacular Speech Synthesis in Marathi, Hindi, English)
- **Image Processing:** HTML5 Canvas API (Grad-CAM Heatmaps & DSI Segmentation)

---

## 🚀 Local Development Setup

### 1. Clone & Install
```bash
git clone [https://github.com/naqeebrahman076-sys/agrishield-ai.git](https://github.com/YOUR_USERNAME/agrishield-ai.git)
cd agrishield-ai
npm install