<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "infojugadoresenpartido".
 *
 * @property int $id
 * @property int $idPartido
 * @property int $idJugador
 * @property bool $titular
 * @property int $goles
 * @property int $amarillas
 * @property bool $rojaDirecta
 * @property string $juegoEnPartido Cómo lo ha hecho en el partido: MalPartido, NoJuega, BuenPartido, ExcelentePartido, PerfectoPartido 
 * @property int $puntos Según los puntos que valga cada apartado (tabla puntos), calcularemos el total de puntos que ha hecho en este partido y guardaremos aquí el resultado final. Además, se sumarán estos puntos al total de puntos del jugador
 *
 * @property Jugadoresreales $idJugador0
 * @property Calendario $idPartido0
 */
class Infojugadoresenpartido extends \yii\db\ActiveRecord
{
    public static $actuacionOptions = ['MP' => 'MalPartido', 'NJ' => 'NoJuega', 'BP' => 'BuenPartido', 'EP' => 'ExcelentePartido', 'PP' => 'PartidoPerfecto'];
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'infojugadoresenpartido';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idPartido', 'idJugador'], 'required'],
            [['idPartido', 'idJugador', 'goles', 'amarillas', 'puntos'], 'integer'],
            [['titular', 'rojaDirecta'], 'boolean'],
            [['juegoEnPartido'], 'string'],
            [['idPartido', 'idJugador'], 'unique', 'targetAttribute' => ['idPartido', 'idJugador']],
            [['idJugador'], 'exist', 'skipOnError' => true, 'targetClass' => Jugadoresreales::className(), 'targetAttribute' => ['idJugador' => 'id']],
            [['idPartido'], 'exist', 'skipOnError' => true, 'targetClass' => Calendario::className(), 'targetAttribute' => ['idPartido' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'idPartido' => 'Id Partido',
            'idJugador' => 'Id Jugador',
            'titular' => 'Titular',
            'goles' => 'Goles',
            'amarillas' => 'Amarillas',
            'rojaDirecta' => 'Roja Directa',
            'juegoEnPartido' => 'Actuacuón en partido ',
            'puntos' => 'Puntos',
        ];
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

    /**
     * Gets query for [[IdPartido0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdPartido0()
    {
        return $this->hasOne(Calendario::className(), ['id' => 'idPartido']);
    }

    //Obtiene el texto del campo Estado
    public function getActuacionText(){
        return self::$actuacionOptions[$this->juegoEnPartido] ?? '';
    }
}
