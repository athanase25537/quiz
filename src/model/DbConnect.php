<?php

class DbConnect
{

    public ?PDO $database = null;

    public function getConnection(): ?PDO
    {
        try{
            if($this->database == null){
                $this->database = new PDO(
                    'mysql:host=localhost;dbname=quiz;charset=utf8',
                    'root',
                    '',
                    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
                );
            }
            return $this->database;
        }catch(Exception $e){
            $e->getMessage();
        }
    }
    
}