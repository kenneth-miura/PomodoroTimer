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
        activity = json_data['activity']
        engagement = json_data['engagement']
        energy = json_data['energy']
        in_flow = json_data['inFlow']
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            # Need to escape string to prevent sql injection
            cursor.execute(f'''INSERT INTO ratings
				(engagement, energy, in_flow, time_rated, activity)
				VALUES ({engagement}, {energy}, {in_flow}, NOW(), %(activity)s);
				''',
                           {'activity': activity})
            conn.commit()
            return json_data, 201
        finally:
            cursor.close()
            conn.close()
    else:
        return 'Only accepts POST', 501


@app.route('/all_ratings', methods=['GET'])
def all_ratings():
    if request.method == 'GET':
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            cursor.execute('''SELECT * FROM ratings;''')
            ratings = cursor.fetchall()
            print(ratings)
            return {"all_ratings": ratings}, 200
        finally:
            cursor.close()
            conn.close()
    else:
        return 'Only accepts GET', 501
