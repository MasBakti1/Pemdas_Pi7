import sys
from flask import Flask, render_template, jsonify, request
from flask_basicauth import BasicAuth
import time
import threading
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database setup
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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sensor_data', methods=['GET'])
def get_sensor_data():
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

@app.route('/sensor_data', methods=['POST'])
def post_sensor_data():
    try:
        data = request.get_json()
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        gas_detected = data.get('gas_detected')
        flame_detected = data.get('flame_detected')

        # Insert data into the database
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)