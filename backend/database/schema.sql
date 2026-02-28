-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    year_of_study INT,
    college_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Domains Table
CREATE TABLE IF NOT EXISTS domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(255)
);

-- Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    salary_fresher VARCHAR(50),
    salary_mid VARCHAR(50),
    salary_senior VARCHAR(50),
    demand_indicator ENUM('High', 'Medium', 'Low'),
    FOREIGN KEY (domain_id) REFERENCES domains(id) ON DELETE CASCADE
);

-- Roadmap Phases Table
CREATE TABLE IF NOT EXISTS roadmap_phases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    phase_order INT,
    title VARCHAR(255),
    description TEXT,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Roadmap Tasks Table
CREATE TABLE IF NOT EXISTS roadmap_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phase_id INT,
    title VARCHAR(255),
    description TEXT,
    resource_link VARCHAR(500),
    is_project BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (phase_id) REFERENCES roadmap_phases(id) ON DELETE CASCADE
);

-- User Progress Table
CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_id INT,
    task_id INT,
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES roadmap_tasks(id) ON DELETE CASCADE
);

-- AI Chat History
CREATE TABLE IF NOT EXISTS ai_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT,
    sender ENUM('user', 'ai'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
