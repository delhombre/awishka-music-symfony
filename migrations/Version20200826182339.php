<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200826182339 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE music_like (id INT AUTO_INCREMENT NOT NULL, music_id INT DEFAULT NULL, author_id INT DEFAULT NULL, INDEX IDX_F8524428399BBB13 (music_id), INDEX IDX_F8524428F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE music_like ADD CONSTRAINT FK_F8524428399BBB13 FOREIGN KEY (music_id) REFERENCES music (id)');
        $this->addSql('ALTER TABLE music_like ADD CONSTRAINT FK_F8524428F675F31B FOREIGN KEY (author_id) REFERENCES user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE music_like');
    }
}
