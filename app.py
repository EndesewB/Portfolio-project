from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from storage import Storage
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder='easymine')
app.secret_key = 'your_secret_key_here'  # Replace with a secure secret key

bcrypt = Bcrypt()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')

    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match'}), 400

    storage = Storage()
    if not storage.add_user(username, email, password):
        return jsonify({'error': 'Username already exists'}), 400
    
    session['username'] = username
    
    return jsonify({'message': 'User registered successfully'}), 200

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    storage = Storage()
    matched_user = storage.get_user_by_username(username)

    if matched_user is None or not bcrypt.check_password_hash(matched_user['password'], password):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    session['username'] = username

    return jsonify({'message': 'Login successful', 'username': username}), 200

if __name__ == '__main__':
    app.run(debug=True)
