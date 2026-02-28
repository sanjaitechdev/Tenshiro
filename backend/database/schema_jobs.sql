-- Jobs and Internships Table
CREATE TABLE IF NOT EXISTS jobs_internships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    type ENUM('job', 'internship') NOT NULL,
    location VARCHAR(255),
    salary_range VARCHAR(100),
    portal_name VARCHAR(100),
    portal_link VARCHAR(500),
    posted_date DATE,
    deadline DATE,
    description TEXT,
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- User Job Applications Tracking Table
CREATE TABLE IF NOT EXISTS user_job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    stage ENUM('available', 'saved', 'applied', 'interviewing', 'offered', 'rejected') DEFAULT 'available',
    applied_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs_internships(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_job (user_id, job_id)
);
