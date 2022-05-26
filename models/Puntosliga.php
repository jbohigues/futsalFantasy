<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "puntosliga".
 *
 * @property int $id
 * @property int $idLiga
 * @property int $titular
 * @property int $golDL
 * @property int $golMC
 * @property int $golDF
 * @property int $golPT
 * @property int $primeraAmarilla
 * @property int $segundaAmarilla
 * @property int $rojaDirecta
 * @property int $malPartido
 * @property int $noJuegaPartido
 * @property int $buenPartido
 * @property int $excelentePartido
 * @property int $perfectoPartido
 *
 * @property Ligas $idLiga0
 */
class Puntosliga extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'puntosliga';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idLiga'], 'required'],
            [['idLiga', 'titular', 'golDL', 'golMC', 'golDF', 'golPT', 'primeraAmarilla', 'segundaAmarilla', 'rojaDirecta', 'malPartido', 'noJuegaPartido', 'buenPartido', 'excelentePartido', 'perfectoPartido'], 'integer'],
            [['idLiga'], 'unique'],
            [['idLiga'], 'exist', 'skipOnError' => true, 'targetClass' => Ligas::className(), 'targetAttribute' => ['idLiga' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'idLiga' => 'Id Liga',
            'titular' => 'Titular',
            'golDL' => 'Gol Dl',
            'golMC' => 'Gol Mc',
            'golDF' => 'Gol Df',
            'golPT' => 'Gol Pt',
            'primeraAmarilla' => 'Primera Amarilla',
            'segundaAmarilla' => 'Segunda Amarilla',
            'rojaDirecta' => 'Roja Directa',
            'malPartido' => 'Mal Partido',
            'noJuegaPartido' => 'No Juega Partido',
            'buenPartido' => 'Buen Partido',
            'excelentePartido' => 'Excelente Partido',
            'perfectoPartido' => 'Perfecto Partido',
        ];
    }

    /**
     * Gets query for [[IdLiga0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdLiga0()
    {
        return $this->hasOne(Ligas::className(), ['id' => 'idLiga']);
    }
}
