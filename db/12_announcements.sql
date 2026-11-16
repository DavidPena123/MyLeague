USE tracy_babe_ruth;

---  store announcements 



-- Create the announcements table & link it (the announcements)

CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    title VARCHAR(150) NOT NULL,
   
    message TEXT NOT NULL,                                  
   
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  
    author_id BIGINT UNSIGNED NULL,                         

    
    CONSTRAINT fk_announcements_author FOREIGN KEY (author_id) REFERENCES `user`(id) ON DELETE SET NULL
);
