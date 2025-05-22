from flask import Flask, request, jsonify
import pandas as pd
from website_analyzer import WebsiteAnalyzer  # Use this if you have it in the notebook

app = Flask(__name__)

# Class for website analysis (if you have the class in the notebook, use it here)
class WebsiteAnalyzer:
    def __init__(self, urls):
        self.urls = urls

    def analyze_all(self):
        # Placeholder for actual analysis logic (replace this with your own logic)
        data = []
        for url in self.urls:
            data.append({
                'Website URL': url,
                'Website Type': 'Personal Portfolio/Project',  # Example type
                'SEO Score (%)': 80,  # Example value
                'UI Score (10)': 8,  # Example value
                'UX Score (10)': 7,  # Example value
                'Mobile Friendliness Score (10)': 10,  # Example value
                'Page Load Speed Score (10)': 9,  # Example value
                'Broken Links Score (10)': 5,  # Example value
                'Overall Score (100%)': 85  # Example value
            })
        df = pd.DataFrame(data)
        return df

@app.route('/analyze', methods=['POST'])
def analyze_website():
    data = request.get_json()  # Get JSON data from the frontend
    urls = data.get('urls', [])
    
    # Create an instance of WebsiteAnalyzer
    analyzer = WebsiteAnalyzer(urls)
    
    # Analyze the websites and get the result
    result_df = analyzer.analyze_all()

    # Convert the DataFrame to a dictionary (for JSON response)
    result_dict = result_df.to_dict(orient='records')
    
    return jsonify(result_dict)  # Return the analysis results as JSON

if __name__ == '__main__':
    app.run(debug=True)
