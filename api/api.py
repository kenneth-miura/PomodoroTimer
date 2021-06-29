import time
from flask import Flask, request
from flaskext.mysql import MySQL
import json

app = Flask(__name__)
app.config.from_object('config.Config')

mysql = MySQL()
mysql.init_app(app)

@app.route('/time')
def get_current_time():
	return {'time': time.time()}

@app.route('/store_ratings', methods=['POST'])
def store_ratings():
	if request.method == 'POST':
			json_data = request.json
			engagement = json_data['engagement']
			energy = json_data['energy']
			in_flow = json_data['inFlow']
			try:
				conn = mysql.connect()
				cursor = conn.cursor()
				cursor.execute(f''' INSERT INTO ratings
				(engagement, energy, in_flow, time_rated)
				VALUES ({engagement}, {energy}, {in_flow}, NOW());
				''')
				conn.commit()
				return json_data
			except Exception as e:
				return json.dumps({'error': str(e)})
			finally:
				cursor.close()
				conn.close()
