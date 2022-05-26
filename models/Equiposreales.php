<?php

namespace app\models;

use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "equiposreales".
 *
 * @property int $id
 * @property string $nombre
 * @property string $foto
 * @property int $puntos
 * @property int|null $valor
 * @property int $partidosJugados No necesario: extensión -> apartado de info de equipo
 * @property int $victorias No necesario: extensión -> apartado de info de equipo
 * @property int $derrotas No necesario: extensión -> apartado de info de equipo
 * @property int $empates No necesario: extensión -> apartado de info de equipo
 * @property int|null $jugadores Hace falta?
 * @property int|null $lesionados Hace falta?
 *
 * @property Calendario[] $calendarios
 * @property Calendario[] $calendarios0
 * @property Jugadoresreales[] $jugadoresreales
 * @property Logosequiposreales[] $logosequiposreales
 */
class Equiposreales extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'equiposreales';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nombre', 'foto'], 'required'],
            [['puntos', 'valor', 'partidosJugados', 'victorias', 'derrotas', 'empates', 'jugadores', 'lesionados'], 'integer'],
            [['jugadores'], 'default', 'value' => 15],
            [['nombre', 'foto'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nombre' => 'Nombre',
            'foto' => 'Foto',
            'puntos' => 'Puntos',
            'valor' => 'Valor',
            'partidosJugados' => 'Partidos jugados',
            'victorias' => 'Victorias',
            'derrotas' => 'Derrotas',
            'empates' => 'Empates',
            'jugadores' => 'Número de jugadores',
            'lesionados' => 'Lesionados',
        ];
    }

    /**
     * Gets query for [[Calendarios]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCalendarios()
    {
        return $this->hasMany(Calendario::className(), ['idLocal' => 'id']);
    }

    /**
     * Gets query for [[Calendarios0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCalendarios0()
    {
        return $this->hasMany(Calendario::className(), ['idVisitante' => 'id']);
    }

    /**
     * Gets query for [[Jugadoresreales]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getJugadoresreales()
    {
        return $this->hasMany(Jugadoresreales::className(), ['idEquipoReal' => 'id']);
    }

    /**
     * Gets query for [[Logosequiposreales]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLogosequiposreales()
    {
        return $this->hasMany(Logosequiposreales::className(), ['idEquipoReal' => 'id']);
    }

    public static function lookup(){
        return ArrayHelper::map(self::find()->asArray()->all(),'id','nombre');
    }
}
