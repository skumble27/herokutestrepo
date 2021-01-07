import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from sqlalchemy import create_engine

from flask import Response,json

from flask import Flask, jsonify

from flask_cors import CORS, cross_origin

from flask import Flask, render_template

from entrancekey import postgresqlkey


#################################################
# Database Setup
#################################################

# Creating a search engine
engine = create_engine(f'postgresql+psycopg2://postgres:{postgresqlkey}@localhost:5432/worldwidedata')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table

results = engine.execute("SELECT  * FROM worldhealth").fetchall()

new = []

for i in results:
    a = {"country":i[0],"abbreviation":i[1],"_date":i[2],"staple_crop_kg_ha":i[3],"cash_crop_kg_ha":i[4],"agri_employment":i[5],"gdp":i[6],"child_mortality_rates":i[7],"mental_health":i[8],"obesity_rates":i[9],"hivdeaths":i[10],"hiv_cases":i[11],"population":i[12],"life_expectency":i[13],"co2_emm_tonnes":i[14]}
    new.append(a)
#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/worlddata", methods=["GET"])
def welcome():
    """List all available api routes."""
    
    return (json.dumps(new))


if __name__ == '__main__':
    app.run(debug=True)
