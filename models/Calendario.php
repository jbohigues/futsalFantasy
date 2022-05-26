<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "calendario".
 *
 * @property int $id
 * @property int $jornada
 * @property int $idLocal
 * @property int $idVisitante
 * @property string $fecha
 * @property bool $jugado
 * @property int|null $golesLocal
 * @property int|null $golesVisitante
 *
 * @property Jugadoresreales[] $idJugadors
 * @property Equiposreales $idLocal0
 * @property Equiposreales $idVisitante0
 * @property Infojugadoresenpartido[] $infojugadoresenpartidos
 */
class Calendario extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'calendario';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['jornada', 'idLocal', 'idVisitante'], 'required'],
            [['jornada', 'idLocal', 'idVisitante', 'golesLocal', 'golesVisitante'], 'integer'],
            [['fecha'], 'date'],
            [['fecha'], 'default', 'value' => date('Y-m-d h:m:s')],
            [['jugado'], 'boolean'],
            [['jugado'], 'default', 'value' => false],
            [['idLocal'], 'exist', 'skipOnError' => true, 'targetClass' => Equiposreales::className(), 'targetAttribute' => ['idLocal' => 'id']],
            [['idVisitante'], 'exist', 'skipOnError' => true, 'targetClass' => Equiposreales::className(), 'targetAttribute' => ['idVisitante' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'jornada' => 'Jornada',
            'idLocal' => 'Id Local',
            'idVisitante' => 'Id Visitante',
            'fecha' => 'Fecha',
            'jugado' => 'Jugado',
            'golesLocal' => 'Goles Local',
            'golesVisitante' => 'Goles Visitante',
        ];
    }

    /**
     * Gets query for [[IdJugadors]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdJugadors()
    {
        return $this->hasMany(Jugadoresreales::className(), ['id' => 'idJugador'])->viaTable('infojugadoresenpartido', ['idPartido' => 'id']);
    }

    /**
     * Gets query for [[IdLocal0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdLocal0()
    {
        return $this->hasOne(Equiposreales::className(), ['id' => 'idLocal']);
    }

    /**
     * Gets query for [[IdVisitante0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdVisitante0()
    {
        return $this->hasOne(Equiposreales::className(), ['id' => 'idVisitante']);
    }

    /**
     * Gets query for [[Infojugadoresenpartidos]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getInfojugadoresenpartidos()
    {
        return $this->hasMany(Infojugadoresenpartido::className(), ['idPartido' => 'id']);
    }
}
