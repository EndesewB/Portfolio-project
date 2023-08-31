import json
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

class Storage:
    def __init__(self, file_path='data.json'):
        self.file_path = file_path
        self.load_data()  # Load existing data from the JSON file

    def add_user(self, username, email, password):
        if username in self.users:
            return False
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.users[username] = {'email': email, 'password': hashed_password}
        self.save_data()  # Save updated data to the JSON file
        return True

    def save_data(self):
        with open(self.file_path, 'w') as file:
            json.dump(self.users, file, indent=4)

    def load_data(self):
        try:
            with open(self.file_path, 'r') as file:
                self.users = json.load(file)
        except FileNotFoundError:
            self.users = {}

    def get_user_by_username(self, username):
        return self.users.get(username)

# Define functions to interact with the Storage class
def save_user_data(username, email, password):
    storage = Storage()
    storage.add_user(username, email, password)
    print(f"User data saved: Username={username}, Email={email}, Password={password}")

def load_user_data():
    storage = Storage()
    storage.load_data()
    return storage.users
