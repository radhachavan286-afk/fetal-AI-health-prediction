import os
import pickle
import numpy as np
from flask import Flask, render_template, request

app = Flask(__name__)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "fetal_health1.pkl")
with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)


@app.route('/')
def home():
    return render_template('index.html', show_result=False)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        accelerations                                          = request.form.get('accelerations', '')
        prolongued_decelerations                               = request.form.get('prolongued_decelerations', '')
        abnormal_short_term_variability                        = request.form.get('abnormal_short_term_variability', '')
        percentage_of_time_with_abnormal_long_term_variability = request.form.get('percentage_of_time_with_abnormal_long_term_variability', '')
        mean_value_of_long_term_variability                    = request.form.get('mean_value_of_long_term_variability', '')
        histogram_mode                                         = request.form.get('histogram_mode', '')
        histogram_median                                       = request.form.get('histogram_median', '')
        histogram_variance                                     = request.form.get('histogram_variance', '')

        input_features = [
            float(accelerations),
            float(prolongued_decelerations),
            float(abnormal_short_term_variability),
            float(percentage_of_time_with_abnormal_long_term_variability),
            float(mean_value_of_long_term_variability),
            float(histogram_mode),
            float(histogram_median),
            float(histogram_variance),
        ]

        final_features = np.array([input_features])
        output = int(model.predict(final_features)[0])

        try:
            proba      = model.predict_proba(final_features)
            confidence = round(float(np.max(proba)) * 100, 2)
        except Exception:
            confidence = 100.0

        result_map = {
            1: ("Normal",       "normal",       "✅", "Fetal health appears Normal. Continue routine monitoring as advised by your doctor."),
            2: ("Suspect",      "suspect",      "⚠️", "Fetal health is Suspect. Further evaluation and close monitoring is recommended."),
            3: ("Pathological", "pathological", "🚨", "Fetal health is Pathological. Immediate medical attention is strongly advised."),
        }

        prediction, color, icon, description = result_map.get(
            output, ("Unknown", "normal", "❓", "Could not determine status.")
        )

        return render_template('index.html',
            show_result   = True,
            prediction    = prediction,
            confidence    = confidence,
            color         = color,
            icon          = icon,
            description   = description,
            accelerations                                          = accelerations,
            prolongued_decelerations                               = prolongued_decelerations,
            abnormal_short_term_variability                        = abnormal_short_term_variability,
            percentage_of_time_with_abnormal_long_term_variability = percentage_of_time_with_abnormal_long_term_variability,
            mean_value_of_long_term_variability                    = mean_value_of_long_term_variability,
            histogram_mode                                         = histogram_mode,
            histogram_median                                       = histogram_median,
            histogram_variance                                     = histogram_variance,
        )

    except Exception as e:
        return render_template('index.html', show_result=False, error=str(e))


if __name__ == "__main__":
    app.run(debug=True)
