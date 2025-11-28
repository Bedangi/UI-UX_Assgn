import pandas as pd
from flask import Flask, render_template

app = Flask(__name__)

df = pd.read_csv("data/flower_dataset.csv")
df = df.fillna("")

@app.route("/")
def home():  
    return render_template("home.html")

@app.route("/garden")
def garden():
    flowers = df.to_dict(orient="records")
    return render_template("garden.html", flowers=flowers)

@app.route("/basket")
def basket():
    return render_template("basket.html")

if __name__ == "__main__":
    app.run(debug=True)