CREATE DATABASE IF NOT EXISTS securitydb;
USE securitydb;

CREATE TABLE IF NOT EXISTS cameras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS incidents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cameraId INT,
    type VARCHAR(255),
    tsStart DATETIME,
    tsEnd DATETIME,
    thumbnailUrl VARCHAR(255),
    resolved BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (cameraId) REFERENCES cameras(id)
);

INSERT INTO cameras (name, location) VALUES
('Shop Floor A', 'Ground Floor'),
('Vault', 'Basement'),
('Entrance', 'Main Gate');

INSERT INTO incidents (cameraId, type, tsStart, tsEnd, thumbnailUrl, resolved) VALUES
(1, 'Unauthorised Access', '2025-07-24 01:15:00', '2025-07-24 01:17:00', '/public/thumb1.jpg', FALSE),
(2, 'Gun Threat', '2025-07-24 02:30:00', '2025-07-24 02:35:00', '/public/thumb2.jpg', FALSE),
(3, 'Face Recognised', '2025-07-24 03:00:00', '2025-07-24 03:05:00', FALSE),
(1, 'Gun Threat', '2025-07-24 04:10:00', '2025-07-24 04:12:00', '/public/thumb3.jpg', FALSE),
(2, 'Unauthorised Access', '2025-07-24 05:20:00', '2025-07-24 05:22:00', '/public/thumb4.jpg', TRUE),
(3, 'Face Recognised', '2025-07-24 06:30:00', '2025-07-24 06:35:00', '/public/thumb5.jpg', FALSE),
(1, 'Gun Threat', '2025-07-24 07:40:00', '2025-07-24 07:45:00', '/public/thumb6.jpg', FALSE),
(2, 'Unauthorised Access', '2025-07-24 08:50:00', '2025-07-24 08:55:00', '/public/thumb7.jpg', FALSE),
(3, 'Face Recognised', '2025-07-24 09:00:00', '2025-07-24 09:05:00', '/public/thumb8.jpg', FALSE),
(1, 'Gun Threat', '2025-07-24 10:10:00', '2025-07-24 10:15:00', '/public/thumb9.jpg', FALSE),
(2, 'Unauthorised Access', '2025-07-24 11:20:00', '2025-07-24 11:25:00', '/public/thumb10.jpg', FALSE),
(3, 'Face Recognised', '2025-07-24 12:30:00', '2025-07-24 12:35:00', '/public/thumb11.jpg', TRUE);

