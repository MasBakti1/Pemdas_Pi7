import sys
from flask import Flask, render_template, jsonify, request
from flask_basicauth import BasicAuth
import time
import threading
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def init_db():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="pemdas"
    )
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sensor_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            temperature FLOAT,
            humidity FLOAT,
            gas_detected BOOLEAN,
            flame_detected BOOLEAN,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/sensor_data', methods=['GET'])
def get_sensor_data():
<<<<<<< Updated upstream
    temperature = 80
    humidity =  70
    gas_detected = True
    flame_detected = False

    return jsonify({
        'temperature': temperature,
        'humidity': humidity,
        'gas_detected': bool(gas_detected == 0),
        'flame_detected': bool(flame_detected == 0)
    })

=======
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="pemdas"
        )
        cursor = conn.cursor(dictionary=True)

        cursor.execute('SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1')
        result = cursor.fetchone()

        conn.close()

        if not result:
            return jsonify({'error': 'No data found'}), 404

        return jsonify({
            'temperature': result['temperature'],
            'humidity': result['humidity'],
            'gas_detected': bool(result['gas_detected']),
            'flame_detected': bool(result['flame_detected'])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
>>>>>>> Stashed changes
@app.route('/sensor_data', methods=['POST'])
def post_sensor_data():
    try:
        data = request.get_json()
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        gas_detected = data.get('gas_detected')
        flame_detected = data.get('flame_detected')

        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="pemdas"
        )
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO sensor_data (temperature, humidity, gas_detected, flame_detected)
            VALUES (%s, %s, %s, %s)
        ''', (temperature, humidity, gas_detected, flame_detected))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Data inserted successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

<<<<<<< Updated upstream
=======

@app.route('/history_data', methods=['GET'])    
def get_all_sensor_data():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="pemdas"
        )
        cursor = conn.cursor(dictionary=True)

        cursor.execute('SELECT * FROM sensor_data ORDER BY id DESC')
        results = cursor.fetchall()

        conn.close()

        if not results:
            return jsonify({'error': 'No data found'}), 404

        return jsonify([
            {
                'id': row['id'],
                'temperature': row['temperature'],
                'humidity': row['humidity'],
                'gas_detected': bool(row['gas_detected']),
                'flame_detected': bool(row['flame_detected']),
                'timestamp': row['timestamp']
            } for row in results
        ])
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get-min-max', methods=['GET'])
def minmax():
    try:
        conn = mysql.connector.connect(
                host="localhost",
                user="root",
                password="",
                database="pemdas"
            )
        
        cursor = conn.cursor(dictionary=True)
        query = "SELECT MAX(temperature) AS max_value, MIN(temperature) AS min_value, MAX(humidity) AS max_hum, MIN(humidity) AS min_hum FROM sensor_data WHERE DATE(timestamp) = CURDATE()"
        cursor.execute(query)
        result = cursor.fetchone() 
        
        conn.close
        
        if result:
            return jsonify({'max': result['max_value'], 
                            'min': result['min_value'],
                            'max_hum' : result['max_hum'],
                            'min_hum' : result['min_hum']})
        else:
            return jsonify({'error': 'No data found'}), 404
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

>>>>>>> Stashed changes
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
