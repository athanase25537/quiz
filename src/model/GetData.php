<?php
require 'DbConnect.php';

class Content{
    public String $question;
    public String $choices;
    public String $answer;
    public int $lvl;
}


class GetData {
    
    public DbConnect $connection;

    public String $tableName;

    public function __construct(String $tableName)
    {
        $this->tableName = $tableName;
    }
    
    public function getContents(int $lvl){
        $selectQuery = "SELECT * FROM $this->tableName where lvl = :lvl";
        $contentsStatement = $this->connection->getConnection()->prepare($selectQuery);
        $contentsStatement->execute([
            'lvl' => $lvl
        ]);
        
        $contents = [];
        while($row = $contentsStatement->fetch()){
            $content = new Content();
            $content->question =  $row['question'];
            $content->choices = $row['choices'];
            $content->answer = $row['answer'];
            $content->id = $row['id'];
            $contents[] = $content;
        }
        return $contents;
    }
    
    /*public function getContent(int $id, $idUser){
        $selectQuery = "SELECT * FROM $this->tableName WHERE id = :id AND id_user = :id_user";
        $contentsStatement = $this->connection->getConnection()->prepare($selectQuery);
        $contentsStatement->execute([
            'id' => $id,
            'id_user' => $idUser
        ]);
        $row = $contentsStatement->fetch(\PDO::FETCH_ASSOC);
        $content = new Content();
        $content->title =  $row['title'];
        $content->description = $row['description'];
        $content->year = $row['year'];
        $content->id = $row['id'];
        return $content;
    }*/
}


