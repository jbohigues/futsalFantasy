<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "traspasos".
 *
 * @property int $id
 * @property int $idJugador
 * @property int $idEquipoUserEmisor
 * @property int|null $idEquipoUserReceptor
 * @property int $precio
 * @property string $estado Estado del traspaso: pendiente, realizada o rechazada
 *
 * @property Equiposusuarios $idEquipoUserEmisor0
 * @property Equiposusuarios $idEquipoUserReceptor0
 * @property Jugadoresreales $idJugador0
 */
class Traspasos extends \yii\db\ActiveRecord
{
    public static $estadoOptions = ['P' => 'Pendiente', 'OK' => 'Aceptado', 'R' => 'Rechazado'];
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'traspasos';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idJugador', 'idEquipoUserEmisor', 'precio'], 'required'],
            [['idJugador', 'idEquipoUserEmisor', 'idEquipoUserReceptor', 'precio'], 'integer'],
            [['estado'], 'string'],
            [['idJugador'], 'exist', 'skipOnError' => true, 'targetClass' => Jugadoresreales::className(), 'targetAttribute' => ['idJugador' => 'id']],
            [['idEquipoUserEmisor'], 'exist', 'skipOnError' => true, 'targetClass' => Equiposusuarios::className(), 'targetAttribute' => ['idEquipoUserEmisor' => 'id']],
            [['idEquipoUserReceptor'], 'exist', 'skipOnError' => true, 'targetClass' => Equiposusuarios::className(), 'targetAttribute' => ['idEquipoUserReceptor' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'idJugador' => 'Id Jugador',
            'idEquipoUserEmisor' => 'Id EquipoUser Emisor',
            'idEquipoUserReceptor' => 'Id EquipoUser Receptor',
            'precio' => 'Precio',
            'estado' => 'Estado',
        ];
    }

    /**
     * Gets query for [[IdEquipoUserEmisor0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdEquipoUserEmisor0()
    {
        return $this->hasOne(Equiposusuarios::className(), ['id' => 'idEquipoUserEmisor']);
    }

    /**
     * Gets query for [[IdEquipoUserReceptor0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdEquipoUserReceptor0()
    {
        return $this->hasOne(Equiposusuarios::className(), ['id' => 'idEquipoUserReceptor']);
    }

    /**
     * Gets query for [[IdJugador0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdJugador0()
    {
        return $this->hasOne(Jugadoresreales::className(), ['id' => 'idJugador']);
    }

    //Obtiene el texto del campo Estado
    public function getEstadoText(){
        return self::$estadoOptions[$this->estado] ?? '';
    }
}
