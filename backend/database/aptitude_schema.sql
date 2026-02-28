-- Aptitude OS Production Schema

-- Questions Table
CREATE TABLE IF NOT EXISTS apt_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    subtopic VARCHAR(100),
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL,
    question TEXT NOT NULL,
    options JSON NOT NULL,
    answer INT NOT NULL,
    explanation TEXT,
    company_tags JSON,
    govt_tags JSON,
    time_estimate INT, -- in seconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Concepts Table (Learn Mode)
CREATE TABLE IF NOT EXISTS apt_concepts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    topic VARCHAR(100) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    formulas JSON,
    shortcuts JSON,
    video_link VARCHAR(500),
    difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Test Attempts
CREATE TABLE IF NOT EXISTS apt_test_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    time_used INT NOT NULL, -- in seconds
    time_efficiency INT,
    mistakes_count INT DEFAULT 0,
    topic_breakdown JSON,
    blueprint JSON,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Active Test Sessions (for survival across refresh & timer sync)
CREATE TABLE IF NOT EXISTS apt_active_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    test_config JSON NOT NULL,
    questions JSON NOT NULL,
    answers JSON,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Mastery & Progress
CREATE TABLE IF NOT EXISTS apt_user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    readiness_score DECIMAL(5,2) DEFAULT 0,
    overall_rank INT,
    streak INT DEFAULT 0,
    last_practice_date DATE,
    earned_badges JSON,
    bookmarked_topics JSON,
    completed_topics JSON,
    weak_topics JSON,
    strong_topics JSON,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Resources Table
CREATE TABLE IF NOT EXISTS apt_resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    topic VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    type ENUM('video', 'pdf', 'book', 'worksheet', 'link') NOT NULL,
    link VARCHAR(500) NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
