<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "fotosjugadoresreales".
 *
 * @property int $id
 * @property int $idJugadorReal
 * @property string $nombre
 *
 * @property Jugadoresreales $idJugadorReal0
 */
class Fotosjugadoresreales extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'fotosjugadoresreales';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idJugadorReal', 'nombre'], 'required'],
            [['idJugadorReal'], 'integer'],
            [['nombre'], 'string', 'max' => 20],
            [['idJugadorReal'], 'exist', 'skipOnError' => true, 'targetClass' => Jugadoresreales::className(), 'targetAttribute' => ['idJugadorReal' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'idJugadorReal' => 'Id Jugador Real',
            'nombre' => 'Nombre',
        ];
    }

    /**
     * Gets query for [[IdJugadorReal0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdJugadorReal0()
    {
        return $this->hasOne(Jugadoresreales::className(), ['id' => 'idJugadorReal']);
    }
}
