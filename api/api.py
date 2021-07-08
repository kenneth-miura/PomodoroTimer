import time
from flask import Flask, request
from flaskext.mysql import MySQL
from datetime import datetime, date, time, timedelta
import simplejson as json

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


@app.route('/all-ratings', methods=['GET'])
def all_ratings():
    if request.method == 'GET':
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            cursor.execute('''SELECT * FROM ratings;''')
            ratings = cursor.fetchall()
            return {"all_ratings": ratings}, 200
        finally:
            cursor.close()
            conn.close()
    else:
        return 'Only accepts GET', 501


@app.route('/weeks-ratings', methods=['GET'])
def weeks_ratings():
    print("running weeks-ratings")
    if request.method == 'GET':
        today = date.today()
        week_start_date = datetime.combine(
            today - timedelta(days=today.weekday()), time(0, 0))
        week_end_date = datetime.combine(
            week_start_date + timedelta(days=7), time(0,0,0))
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            cursor.execute(
                '''SELECT DAYNAME(time_rated) AS day,
                AVG(engagement) AS avg_engagement, AVG(energy) AS avg_energy, AVG(in_flow) AS avg_in_flow
                FROM ratings WHERE time_rated >=%(week_start_date)s AND time_rated <%(week_end_date)s
                GROUP BY DAYNAME(time_rated);''',
                {"week_start_date": week_start_date, "week_end_date": week_end_date})
            weeks_ratings = cursor.fetchall()
            return json.dumps({"weeks_ratings": weeks_ratings}), 200
        finally:
            cursor.close()
            conn.close()
    else:
        return '/weeks-rating only accepts GET requests', 501

@app.route('/day-ratings', methods=['GET'])
def day_ratings():
    print('running day ratings')
    if request.method == 'GET':
        today = date.today()
        day_start = datetime.combine(today, time(0,0,0))
        day_end = datetime.combine(today + timedelta(days=1), time(0,0,0))
        print(day_start)
        print(day_end)
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            cursor.execute(
                '''
                SELECT (UNIX_TIMESTAMP(time_rated) * 1000) AS time_rated_ms, AVG(engagement) AS avg_engagement,
                AVG(energy) AS avg_energy, AVG(in_flow) AS avg_in_flow
                FROM ratings
                WHERE time_rated >=%(day_start)s AND time_rated <%(day_end)s
                GROUP BY time_rated;
                ''', {"day_start": day_start, "day_end": day_end}
            )
            day_ratings = cursor.fetchall()
            print("printing day_ratings")
            print(day_ratings)
            processed_day_ratings = []
            for rating in day_ratings:
                processed_day_ratings.append((str(rating[0]), rating[1], rating[2], rating[3]))
            return json.dumps({"day_ratings": processed_day_ratings}), 200
        finally:
            cursor.close()
            conn.close()
    else:
        return '/day-rating only accepts GET request', 501


@app.route('/activity-ratings', methods=['GET'])
def activity_ratings():
    print("accesing activity ratings")
    if request.method == 'GET':
        conn = mysql.connect()
        cursor = conn.cursor()
        try:
            cursor.execute(
                '''SELECT activity, AVG(engagement) AS avg_engagement, AVG(energy) AS avg_energy, AVG(in_flow) AS avg_in_flow
                FROM ratings GROUP BY activity;'''
            )
            activity_ratings = cursor.fetchall()
            return json.dumps({'activity_ratings':activity_ratings}), 200
        finally:
            cursor.close()
            conn.close()
    else:
        return '/activity-ratings only accepts GET requests', 501
