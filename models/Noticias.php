<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "noticias".
 *
 * @property int $id
 * @property int $idLiga
 * @property string $tema Pueden ser sobre: 'Información de la liga' o 'Traspasos'
 * @property string $texto
 * @property string $fecha
 *
 * @property Ligas $idLiga0
 */
class Noticias extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'noticias';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idLiga', 'texto'], 'required'],
            [['idLiga'], 'integer'],
            [['tema'], 'string'],
            [['fecha'], 'safe'],
            [['texto'], 'string', 'max' => 50],
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
            'tema' => 'Tema',
            'texto' => 'Texto',
            'fecha' => 'Fecha',
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
