# FetalAI — Fetal Health Predictor

A Flask-based web application that uses a **Random Forest Classifier** to predict fetal health as **Normal**, **Suspect**, or **Pathological** based on Cardiotocogram (CTG) features.

---

## 📁 Folder Structure

```
FetalAI/
│
├── dataset/
│   └── fetal_health_dataset.csv        # CTG dataset (from Kaggle)
│
├── model_building/
│   └── FetalAI_Model_Building.ipynb    # Jupyter Notebook: EDA + Model Training
│
├── flask_app/
│   ├── app.py                          # Flask Backend (main application)
│   ├── RF_model.pkl                    # Trained Random Forest Model
│   │
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css              # Main stylesheet
│   │   ├── js/
│   │   │   └── main.js                # Frontend JavaScript
│   │   └── assets/                    # Images and other assets
│   │
│   └── templates/
│       └── index.html                 # Main HTML template (Jinja2)
│
├── requirements.txt                    # Python dependencies
└── README.md                           # This file
```

---

## 🚀 Setup & Run

### 1. Clone / Download the project

```bash
git clone <your-repo-url>
cd FetalAI
```

### 2. Create a virtual environment (recommended)

```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Train the model (if RF_model.pkl not included)

Open `model_building/FetalAI_Model_Building.ipynb` in Jupyter and run all cells.
This will generate `flask_app/RF_model.pkl`.

### 5. Run the Flask app

```bash
cd flask_app
python app.py
```

Open your browser and visit: **http://127.0.0.1:5000**

---

## 🔬 Input Features (CTG Parameters)

| Feature | Description |
|--------|-------------|
| Accelerations | Number of accelerations per second |
| Prolongued Decelerations | Number of prolonged decelerations per second |
| Abnormal Short Term Variability | % of time with abnormal STV |
| % Time with Abnormal Long Term Variability | % of time with abnormal LTV |
| Mean Value of Long Term Variability | Mean LTV value |
| Histogram Mode | Mode of FHR histogram |
| Histogram Median | Median of FHR histogram |
| Histogram Variance | Variance of FHR histogram |

---

## 🎯 Output Classes

| Class | Description | Action |
|-------|-------------|--------|
| ✅ **Normal** | All indicators within safe range | Regular monitoring |
| ⚠️ **Suspect** | Some indicators slightly abnormal | Close monitoring advised |
| ❌ **Pathological** | Significant abnormalities detected | Immediate medical attention |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python, Flask |
| ML Model | Random Forest (scikit-learn) |
| Frontend | HTML5, CSS3, Vanilla JS |
| Data | Pandas, NumPy |
| Model Persistence | Joblib |

---

## 📊 Model Performance

- **Algorithm**: Random Forest Classifier (200 trees)
- **Train/Test Split**: 80/20 with stratification
- **Cross-Validation**: 5-Fold
- **Accuracy**: ~95%+

---

## ⚠️ Disclaimer

This tool is built for **educational and research purposes only**.  
It is **not** a substitute for professional medical diagnosis.  
Always consult a qualified healthcare provider for medical decisions.

---

## 👤 Author

**Radhika Nitin Chavan**  
📧 radhachavan286@gmail.com  
📍 Kameri, Ishwarpur, Maharashtra — 415403  
📞 +91 9130720260
