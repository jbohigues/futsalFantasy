<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "equiposusuarios".
 *
 * @property int $id
 * @property int $idUsuario
 * @property int $idLiga
 * @property string $nombre
 * @property string $foto
 * @property int $puntos
 * @property int $dinero
 * @property int $numJugadores Igual no hace falta campo en la tabla, ya que se puede sacar con una consulta a la api (count de los jugadores que tengan idEquipoUser igual a este)
 *
 * @property Ligas $idLiga0
 * @property Usuarios $idUsuario0
 * @property Jugadoresrealesencadaliga[] $jugadoresrealesencadaligas
 * @property Traspasos[] $traspasos
 * @property Traspasos[] $traspasos0
 */
class Equiposusuarios extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'equiposusuarios';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idUsuario', 'idLiga', 'nombre'], 'required'],
            [['idUsuario', 'idLiga', 'puntos', 'dinero', 'numJugadores'], 'integer'],
            [['nombre', 'foto'], 'string', 'max' => 50],
            [['idUsuario'], 'exist', 'skipOnError' => true, 'targetClass' => Usuarios::className(), 'targetAttribute' => ['idUsuario' => 'id']],
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
            'idUsuario' => 'Id Usuario',
            'idLiga' => 'Id Liga',
            'nombre' => 'Nombre',
            'foto' => 'Foto',
            'puntos' => 'Puntos',
            'dinero' => 'Dinero',
            'numJugadores' => 'Plantilla',
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

    /**
     * Gets query for [[IdUsuario0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdUsuario0()
    {
        return $this->hasOne(Usuarios::className(), ['id' => 'idUsuario']);
    }

    /**
     * Gets query for [[Jugadoresrealesencadaligas]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugadoresrealesencadaligas()
    {
        return $this->hasMany(Jugadoresrealesencadaliga::className(), ['idEquipoUser' => 'id']);
    }

    /**
     * Gets query for [[Traspasos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTraspasos()
    {
        return $this->hasMany(Traspasos::className(), ['idEquipoUserEmisor' => 'id']);
    }

    /**
     * Gets query for [[Traspasos0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTraspasos0()
    {
        return $this->hasMany(Traspasos::className(), ['idEquipoUserReceptor' => 'id']);
    }
}
