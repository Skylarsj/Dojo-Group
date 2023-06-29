CREATE TABLE sessions (
    session_id CHAR(64) NOT NULL,
    session_data TEXT,
    expiration_time INTEGER,
    PRIMARY KEY (session_id)
);