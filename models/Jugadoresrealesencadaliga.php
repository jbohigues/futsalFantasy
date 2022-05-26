<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "jugadoresrealesencadaliga".
 *
 * @property int $idJugadorReal
 * @property int $idLiga
 * @property int|null $idEquipoUser
 * @property bool $titular
 * @property bool $mercado
 * @property int|null $valorTransferencia Aquí estará el precio que ponen los usuarios a sus jugadores para venderlos
 *
 * @property Equiposusuarios $idEquipoUser0
 * @property Jugadoresreales $idJugadorReal0
 * @property Ligas $idLiga0
 */
class Jugadoresrealesencadaliga extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'jugadoresrealesencadaliga';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idJugadorReal', 'idLiga'], 'required'],
            [['idJugadorReal', 'idLiga', 'idEquipoUser', 'valorTransferencia'], 'integer'],
            [['titular', 'mercado'], 'boolean'],
            [['idJugadorReal', 'idLiga'], 'unique', 'targetAttribute' => ['idJugadorReal', 'idLiga']],
            [['idJugadorReal'], 'exist', 'skipOnError' => true, 'targetClass' => Jugadoresreales::className(), 'targetAttribute' => ['idJugadorReal' => 'id']],
            [['idEquipoUser'], 'exist', 'skipOnError' => true, 'targetClass' => Equiposusuarios::className(), 'targetAttribute' => ['idEquipoUser' => 'id']],
            [['idLiga'], 'exist', 'skipOnError' => true, 'targetClass' => Ligas::className(), 'targetAttribute' => ['idLiga' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'idJugadorReal' => 'Id Jugador Real',
            'idLiga' => 'Id Liga',
            'idEquipoUser' => 'Id Equipo User',
            'titular' => 'Titular',
            'mercado' => 'Mercado',
            'valorTransferencia' => 'Valor transferencia',
        ];
    }

    /**
     * Gets query for [[IdEquipoUser0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdEquipoUser0()
    {
        return $this->hasOne(Equiposusuarios::className(), ['id' => 'idEquipoUser']);
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
