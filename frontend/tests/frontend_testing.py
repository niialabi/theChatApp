import time

# Function to simulate login
def simulate_login(username, password):
    if username == "valid_username" and password == "valid_password":
        return "Login successful"
    else:
        return "Invalid username or password"

# Function to simulate registration
def simulate_registration(name, email, password):
    # Simulate successful registration
    return "Registration successful"

# Test login with valid credentials
def test_valid_login():
    response = simulate_login("valid_username", "valid_password")
    print("Login Response:", response)

# Test login with invalid credentials
def test_invalid_login():
    response = simulate_login("invalid_username", "invalid_password")
    print("Login Response:", response)

# Test registration with valid data
def test_valid_registration():
    response = simulate_registration("John Doe", "john@example.com", "password123")
    print("Registration Response:", response)

# Test registration with invalid data
def test_invalid_registration():
    response = simulate_registration("John Doe", "invalid_email", "password123")
    print("Registration Response:", response)

# Execute test cases
test_valid_login()
test_invalid_login()
test_valid_registration()
test_invalid_registration()


