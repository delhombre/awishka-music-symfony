<?php

namespace App\Repository;

use App\Entity\MusicDownload;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method MusicDownload|null find($id, $lockMode = null, $lockVersion = null)
 * @method MusicDownload|null findOneBy(array $criteria, array $orderBy = null)
 * @method MusicDownload[]    findAll()
 * @method MusicDownload[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MusicDownloadRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MusicDownload::class);
    }

    // /**
    //  * @return MusicDownload[] Returns an array of MusicDownload objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MusicDownload
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
